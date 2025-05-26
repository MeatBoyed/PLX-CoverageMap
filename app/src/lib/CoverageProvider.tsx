// import React, {
//     createContext,
//     useState,
//     useEffect,
//     useRef,
//     useContext,
//     type ReactNode,
// } from "react";
// import { GeoJSONHandler, type CoverageArea } from "./GeoJSONHandler";
// import { PackagesHandler, type Package } from "./PackagesHandler";

// interface CoverageContextType {
//     mapRef: React.RefObject<HTMLDivElement | null>;
//     resultMsg: string;
//     resultClass: string;
//     provider: string | null;
//     packages: Package[] | null;
// }

// const CoverageContext = createContext<CoverageContextType | undefined>(undefined);

// export const CoverageProvider = ({ children }: { children: ReactNode }) => {
//     const mapRef = useRef<HTMLDivElement>(null);
//     const [, setMap] = useState<google.maps.Map>();
//     const [marker, setMarker] = useState<google.maps.Marker>();
//     const [resultMsg, setResultMsg] = useState("");
//     const [resultClass, setResultClass] = useState("alert alert-info");
//     const [provider, setProvider] = useState<string | null>(null);
//     const [coverageAreas, setCoverageAreas] = useState<CoverageArea[]>([]);
//     const [packages, setPackages] = useState<Package[] | null>(null);

//     const geoHandler = useRef(new GeoJSONHandler()).current;
//     const packageHandler = useRef(new PackagesHandler()).current;

//     // 🔁 Load GeoJSON Areas on Mount
//     useEffect(() => {
//         const loadData = async () => {
//             const areas = await geoHandler.loadAll();
//             setCoverageAreas(areas);
//         };
//         loadData();
//     }, []);

//     // 🌍 Initialize Google Map
//     useEffect(() => {
//         if (!window.google || !mapRef.current || coverageAreas.length === 0) return;

//         const mapInstance = new google.maps.Map(mapRef.current, {
//             center: { lat: -26.045, lng: 28.065 },
//             zoom: 13,
//         });

//         coverageAreas.forEach((area) => {
//             new google.maps.Polygon({
//                 paths: area.polygon.map(([lat, lng]) => ({ lat, lng })),
//                 strokeColor: "#1E90FF",
//                 strokeOpacity: 0.8,
//                 strokeWeight: 2,
//                 fillColor: "#1E90FF",
//                 fillOpacity: 0.1,
//                 map: mapInstance,
//             });
//         });

//         const input = document.getElementById("address") as HTMLInputElement;
//         const autocomplete = new google.maps.places.Autocomplete(input);
//         autocomplete.bindTo("bounds", mapInstance);

//         autocomplete.addListener("place_changed", () => {
//             const place = autocomplete.getPlace();
//             if (!place.geometry || !place.geometry.location) return;

//             const location = place.geometry.location;
//             mapInstance.setCenter(location);
//             mapInstance.setZoom(15);

//             if (marker) marker.setMap(null);
//             const newMarker = new google.maps.Marker({
//                 map: mapInstance,
//                 position: location,
//             });
//             setMarker(newMarker);
//             checkCoverage(location.lat(), location.lng());
//         });

//         setMap(mapInstance);
//     }, [coverageAreas]);

//     // 🧭 Coverage Check Logic
//     const checkCoverage = (lat: number, lng: number) => {
//         const point = new google.maps.LatLng(lat, lng);
//         let foundProvider: string | null = null;

//         coverageAreas.forEach((area) => {
//             const polygon = new google.maps.Polygon({
//                 paths: area.polygon.map(([lat, lng]) => ({ lat, lng })),
//             });
//             if (google.maps.geometry.poly.containsLocation(point, polygon)) {
//                 foundProvider = area.provider;
//             }
//         });

//         if (foundProvider) {
//             setResultClass("alert alert-success");
//             setResultMsg(`Good news! PluxNet Fibre is available in your area via ${foundProvider}.`);
//             setProvider(foundProvider);

//             const matchedPackages = packageHandler.getPackagesByProvider(foundProvider);
//             setPackages(matchedPackages.length > 0 ? matchedPackages : null);
//         } else {
//             setResultClass("alert alert-danger");
//             setResultMsg("Sorry, we currently do not have coverage at your location.");
//             setProvider(null);
//             setPackages(null);
//         }
//     };

//     return (
//         <CoverageContext.Provider
//             value={{
//                 mapRef,
//                 resultMsg,
//                 resultClass,
//                 provider,
//                 packages,
//             }}
//         >
//             {children}
//         </CoverageContext.Provider>
//     );
// };

// export const useCoverage = () => {
//     const context = useContext(CoverageContext);
//     if (!context) throw new Error("useCoverage must be used within a CoverageProvider");
//     return context;
// };


import React, {
    createContext,
    useState,
    useEffect,
    useRef,
    useContext,
    type ReactNode,
} from "react";
import { GeoJSONHandler, type CoverageArea } from "./GeoJSONHandler";
import { PackagesHandler, type Package } from "./PackagesHandler";
import { toast } from "sonner";

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
}

const CoverageContext = createContext<CoverageContextType | undefined>(undefined);

export const CoverageProvider = ({ children }: { children: ReactNode }) => {
    const mapRef = useRef<HTMLDivElement>(null);
    const [map, setMap] = useState<google.maps.Map>();
    const [marker, setMarker] = useState<google.maps.Marker>();
    const [resultMsg, setResultMsg] = useState("Enter your address to check coverage.");
    const [resultClass, setResultClass] = useState("alert alert-info");
    const [provider, setProvider] = useState<string | null>(null);
    const [coverageAreas, setCoverageAreas] = useState<CoverageArea[]>([]);
    const [packages, setPackages] = useState<Package[] | null>(null);
    const [address, setAddress] = useState("");
    const [selectedCoords, setSelectedCoords] = useState<{ lat: number; lng: number } | null>(null);

    const geoHandler = useRef(new GeoJSONHandler()).current;
    const packageHandler = useRef(new PackagesHandler()).current;

    // 🔁 Load GeoJSON Areas on Mount
    // useEffect(() => {
    //     const loadData = async () => {
    //         const areas = await geoHandler.loadAll();
    //         setCoverageAreas(areas);
    //     };
    //     loadData();
    // }, []);
    useEffect(() => {
        const loadData = async () => {
            const areas = await geoHandler.loadAll();
            setCoverageAreas(areas);
        };
        loadData();
    }, []);

    // 🌍 Initialize Map + Autocomplete once
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

        autocomplete.addListener("place_changed", () => {
            const place = autocomplete.getPlace();
            if (!place.geometry || !place.geometry.location) return;

            const location = place.geometry.location;
            setSelectedCoords({ lat: location.lat(), lng: location.lng() });
            setAddress(place.formatted_address?.toString() || "")
        });
    }, []);

    // 🧭 Called only when user submits the form
    const checkCoverage = () => {
        if (!selectedCoords) return;

        const point = new google.maps.LatLng(selectedCoords.lat, selectedCoords.lng);
        let foundProvider: string | null = null;

        coverageAreas.forEach((area) => {
            const polygon = new google.maps.Polygon({
                paths: area.polygon.map(([lat, lng]) => ({ lat, lng })),
            });
            if (google.maps.geometry.poly.containsLocation(point, polygon)) {
                foundProvider = area.provider;
            }
        });

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

        if (foundProvider) {
            // setResultClass("alert alert-success");
            // setResultMsg(`Good news! PluxNet Fibre is available in your area via ${foundProvider}.`);
            toast.success(`Good news! PluxNet Fibre is available in your area via ${foundProvider}.`, {
                duration: 6000,
            })
            setProvider(foundProvider);

            const matchedPackages = packageHandler.getPackagesByProvider(foundProvider);
            setPackages(matchedPackages.length > 0 ? matchedPackages : null);
        } else {
            // setResultClass("alert alert-danger");
            // setResultMsg("Sorry, we currently do not have coverage at your location.");
            toast.error("Sorry, we currently do not have coverage at your location.", {
                duration: 6000,
            });
            setProvider(null);
            setPackages(null);
        }
    };

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
                handleAutocompleteSelect: () => { }, // not needed anymore, autocomplete handles it
                checkCoverage,
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
