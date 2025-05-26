import React, {
    createContext,
    useState,
    useEffect,
    useRef,
    useContext,
    type ReactNode,
} from "react";
import { GeoJSONHandler, type CoverageArea } from "./GeoJSONHandler";

type Package = {
    name: string;
    price: string;
    features: string[];
};

type Packages = Record<string, Package[]>;

interface CoverageContextType {
    mapRef: React.RefObject<HTMLDivElement | null>;
    resultMsg: string;
    resultClass: string;
    provider: string | null;
    packages: Package[] | null;
}

const allPackages: Packages = {
    Frogfoot: [
        { name: "20Mbps", price: "R499", features: ["Uncapped", "Free Install"] },
        { name: "50Mbps", price: "R699", features: ["Uncapped", "Free Router"] },
    ],
    Metrofibre: [
        { name: "25Mbps", price: "R529", features: ["Uncapped", "Low Latency"] },
        { name: "75Mbps", price: "R799", features: ["Uncapped", "Free Router"] },
    ],
    Telkom: [
        { name: "20Mbps", price: "R479", features: ["Uncapped", "Simple Router"] },
        { name: "40Mbps", price: "R679", features: ["Uncapped", "No Throttle"] },
    ],
};

const CoverageContext = createContext<CoverageContextType | undefined>(undefined);

export const CoverageProvider = ({ children }: { children: ReactNode }) => {
    const mapRef = useRef<HTMLDivElement>(null);
    const [map, setMap] = useState<google.maps.Map>();
    const [marker, setMarker] = useState<google.maps.Marker>();
    const [resultMsg, setResultMsg] = useState("Enter your address to check coverage.");
    const [resultClass, setResultClass] = useState("alert alert-info");
    const [provider, setProvider] = useState<string | null>(null);
    const [coverageAreas, setCoverageAreas] = useState<CoverageArea[]>([]);

    // 🔁 Load GeoJSON Areas on Mount
    useEffect(() => {
        const loadData = async () => {
            const handler = new GeoJSONHandler();
            const areas = await handler.loadAll();
            setCoverageAreas(areas);
        };
        loadData();
    }, []);

    // 🌍 Initialize Google Map
    useEffect(() => {
        if (!window.google || !mapRef.current || coverageAreas.length === 0) return;

        const mapInstance = new google.maps.Map(mapRef.current, {
            center: { lat: -26.045, lng: 28.065 },
            zoom: 13,
        });

        coverageAreas.forEach((area) => {
            new google.maps.Polygon({
                paths: area.polygon.map(([lat, lng]) => ({ lat, lng })),
                strokeColor: "#1E90FF",
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: "#1E90FF",
                fillOpacity: 0.1,
                map: mapInstance,
            });
        });

        const input = document.getElementById("address") as HTMLInputElement;
        const autocomplete = new google.maps.places.Autocomplete(input);
        autocomplete.bindTo("bounds", mapInstance);

        autocomplete.addListener("place_changed", () => {
            const place = autocomplete.getPlace();
            if (!place.geometry || !place.geometry.location) return;

            const location = place.geometry.location;
            mapInstance.setCenter(location);
            mapInstance.setZoom(15);

            if (marker) marker.setMap(null);
            const newMarker = new google.maps.Marker({
                map: mapInstance,
                position: location,
            });
            setMarker(newMarker);
            checkCoverage(location.lat(), location.lng());
        });

        setMap(mapInstance);
    }, [coverageAreas]);

    // 🧭 Coverage Check Logic
    const checkCoverage = (lat: number, lng: number) => {
        const point = new google.maps.LatLng(lat, lng);
        let foundProvider: string | null = null;

        coverageAreas.forEach((area) => {
            const polygon = new google.maps.Polygon({
                paths: area.polygon.map(([lat, lng]) => ({ lat, lng })),
            });
            if (google.maps.geometry.poly.containsLocation(point, polygon)) {
                foundProvider = area.provider;
            }
        });

        if (foundProvider) {
            setResultClass("alert alert-success");
            setResultMsg(`Good news! PluxNet Fibre is available in your area via ${foundProvider}.`);
            setProvider(foundProvider);
        } else {
            setResultClass("alert alert-danger");
            setResultMsg("Sorry, we currently do not have coverage at your location.");
            setProvider(null);
        }
    };

    return (
        <CoverageContext.Provider
            value={{
                mapRef,
                resultMsg,
                resultClass,
                provider,
                packages: provider ? allPackages[provider] : null,
            }}
        >
            {children}
        </CoverageContext.Provider>
    );
};

export const useCoverage = () => {
    const context = useContext(CoverageContext);
    if (!context) throw new Error("useCoverage must be used within a CoverageProvider");
    return context;
};
