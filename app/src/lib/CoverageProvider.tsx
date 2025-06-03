import React, {
    createContext,
    useState,
    useEffect,
    useRef,
    useContext,
    type ReactNode,
    useCallback,
} from "react";
import { GeoJSONHandler, type CoverageArea } from "./GeoJSONHandler";
import { PackagesHandler, type Package } from "./PackagesHandler";
import { toast } from "sonner";

// Public interface for components consuming coverage data & functionality
interface CoverageContextType {
    mapRef: React.RefObject<HTMLDivElement | null>;
    resultMsg: string;
    resultClass: string;
    provider: string | null;
    packages: Package[] | null;
    address: string;
    setAddress: (val: string) => void;
    handleAutocompleteSelect: () => void;
    checkCoverage: () => void;
    setVisiblePOITypes: (types: POI[]) => void; // New function to set visible POI types
    visiblePOITypes: string[];
    // 🆕 Add map type switching
    mapType: MapType;
    setMapType: (type: MapType) => void;
}

export type MapType = "roadmap" | "satellite" | "hybrid" | "terrain";
export type POI = "poi.school" | "poi.place_of_worship" | "poi.attraction" | "poi.business" | "poi.medical" | "poi.government" | "poi.post_office" | "poi.shopping_mall";


const CoverageContext = createContext<CoverageContextType | undefined>(undefined);

export const CoverageProvider = ({ children }: { children: ReactNode }) => {
    // UI + Google Maps setup
    const mapRef = useRef<HTMLDivElement>(null);
    const [map, setMap] = useState<google.maps.Map>();
    const [marker, setMarker] = useState<google.maps.Marker>();

    // State for UI feedback and context values
    const [resultMsg,] = useState("Enter your address to check coverage.");
    const [resultClass,] = useState("alert alert-info");
    const [provider, setProvider] = useState<string | null>(null);
    const [coverageAreas, setCoverageAreas] = useState<CoverageArea[]>([]);
    const [packages, setPackages] = useState<Package[] | null>(null);
    const [address, setAddress] = useState("");
    const [selectedCoords, setSelectedCoords] = useState<{ lat: number; lng: number } | null>(null);
    const [polygons, setPolygons] = useState<google.maps.Polygon[]>([]);
    const [mapType, setMapTypeState] = useState<MapType>("hybrid");
    const [visiblePOITypes, setVisiblePOITypesState] = useState<POI[]>([
        "poi.school",
        "poi.place_of_worship",
        "poi.attraction",
        "poi.business",
        "poi.medical",
        "poi.government",
        "poi.post_office",
        "poi.shopping_mall",
    ]);

    // Utilities to manage data (GeoJSON & packages)
    const geoHandler = useRef(new GeoJSONHandler()).current;
    const packageHandler = useRef(new PackagesHandler()).current;


    const updateMapPOIStyles = (types: string[]) => {
        if (!map) return;

        const allPOITypes = [
            "poi",
            "poi.school",
            "poi.place_of_worship",
            "poi.attraction",
            "poi.business",
            "poi.medical",
            "poi.government",
            "poi.post_office",
            "poi.shopping_mall",
        ];

        const styles: google.maps.MapTypeStyle[] = allPOITypes.map((type) => ({
            featureType: type,
            elementType: "labels",
            stylers: [{ visibility: types.includes(type) ? "on" : "off" }],
        }));

        map.setOptions({ styles });
    };

    const setVisiblePOITypes = (types: POI[]) => {
        setVisiblePOITypesState(types);
        updateMapPOIStyles(types);
    };

    const setMapType = (type: MapType) => {
        setMapTypeState(type);
        if (map) {
            map.setMapTypeId(type);
        }
    };

    // Re-apply POI visibility whenever the map or selected POIs change
    useEffect(() => {
        updateMapPOIStyles(visiblePOITypes);
    }, [map, visiblePOITypes]);

    // Listen for mapType Chagnes and apply them
    useEffect(() => {
        if (map) {
            map.setMapTypeId(mapType);
        }
    }, [map, mapType]);


    // 🚀 Load coverage areas from local files once on mount
    useEffect(() => {
        const loadData = async () => {
            const areas = await geoHandler.loadAll();
            setCoverageAreas(areas);
        };
        loadData();
    }, []);

    // 🎨 Draw colored coverage polygons on the map for each FNO
    useEffect(() => {
        if (!map || coverageAreas.length === 0) return;

        // Remove previous polygons before redrawing
        polygons.forEach(polygon => polygon.setMap(null));

        // Assign each provider a consistent fill color
        const providerColors: Record<string, string> = {
            "OpenServe": "#84cc16",
            "Vuma": "#3b82f6",
            "Frogfoot": "#32CD32",
            "MetroFibre": "#FFA500",
            "PlanetGIS": "#8A2BE2",
            "Octotel": "#FF4500",
            "Zoom Fibre": "#20B2AA",
            "Link Africa": "#B22222",
            "Unknown": "#AAAAAA",
        };

        const newPolygons: google.maps.Polygon[] = coverageAreas.map((area) => {
            const fillColor = providerColors[area.provider] || providerColors["Unknown"];

            const polygon = new google.maps.Polygon({
                paths: area.polygon.map(([lat, lng]) => ({ lat, lng })),
                strokeColor: fillColor,
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor,
                fillOpacity: 0.2,
                clickable: false,
            });

            polygon.setMap(map);
            return polygon;
        });

        setPolygons(newPolygons);
    }, [map, coverageAreas]);

    // 🗺️ Initialize the Google Map and address autocomplete functionality
    useEffect(() => {
        if (!window.google || !mapRef.current) return;

        const mapInstance = new google.maps.Map(mapRef.current, {
            center: { lat: -26.045, lng: 28.065 },
            zoom: 13,
        });
        setMap(mapInstance);

        const input = document.getElementById("address") as HTMLInputElement;
        const autocomplete = new google.maps.places.Autocomplete(input);
        autocomplete.bindTo("bounds", mapInstance);

        // Capture selected address coordinates
        autocomplete.addListener("place_changed", () => {
            const place = autocomplete.getPlace();
            if (!place.geometry || !place.geometry.location) return;

            const location = place.geometry.location;
            setSelectedCoords({ lat: location.lat(), lng: location.lng() });
            setAddress(place.formatted_address?.toString() || "")
        });
    }, []);

    // ✅ Core logic that checks if selected coordinates fall within any polygon
    const checkCoverage = useCallback(() => {
        if (!selectedCoords) return;

        const point = new google.maps.LatLng(selectedCoords.lat, selectedCoords.lng);
        let foundProvider: string | null = null;

        // Check if the point is inside any coverage polygon
        coverageAreas.forEach((area) => {
            const polygon = new google.maps.Polygon({
                paths: area.polygon.map(([lat, lng]) => ({ lat, lng })),
            });
            if (google.maps.geometry.poly.containsLocation(point, polygon)) {
                foundProvider = area.provider;
            }
        });

        // Update map and drop pin
        if (map && selectedCoords) {
            map.setCenter(selectedCoords);
            map.setZoom(15);

            if (marker) marker.setMap(null);
            const newMarker = new google.maps.Marker({
                map,
                position: selectedCoords,
            });
            setMarker(newMarker);
        }

        // Display result toast and set provider/packages
        if (foundProvider) {
            toast.success(`Good news! PluxNet Fibre is available in your area via ${foundProvider}.`, {
                duration: 6000,
            });
            setProvider(foundProvider);

            const matchedPackages = packageHandler.getPackagesByProvider(foundProvider);
            setPackages(matchedPackages.length > 0 ? matchedPackages : null);
        } else {
            toast.error("Sorry, we currently do not have coverage at your location.", {
                duration: 6000,
            });
            setProvider(null);
            setPackages(null);
        }
    }, [coverageAreas, marker, map, packageHandler, selectedCoords]);

    return (
        <CoverageContext.Provider
            value={{
                mapRef,
                resultMsg,
                resultClass,
                provider,
                packages,
                address,
                setAddress,
                handleAutocompleteSelect: () => { }, // Deprecated; autocomplete now internal
                checkCoverage,
                setVisiblePOITypes, // Expose function to set visible POI types
                visiblePOITypes, // Expose current visible POI types
                mapType,
                setMapType, // Expose function to set map type
            }}
        >
            {children}
        </CoverageContext.Provider>
    );
};

// 🪝 Custom hook to simplify usage
export const useCoverage = () => {
    const context = useContext(CoverageContext);
    if (!context) throw new Error("useCoverage must be used within a CoverageProvider");
    return context;
};
