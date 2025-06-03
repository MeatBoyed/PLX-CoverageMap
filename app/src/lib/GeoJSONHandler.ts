// src/services/GeoJSONHandler.ts
// import Openserve1 from "../data/openserve/MFN_Live_Nexus_Coverage_5_21_2025 8_41_23 AM.json"
// import Openserve2 from "../data/openserve/MFN_Live_Nova_Coverage_5_21_2025 8_40_59 AM.json"
// import Openserve3 from "../data/openserve/MFN_WIP_Nexus_Coverage_5_21_2025 8_41_26 AM.json"
// import Openserve4 from "../data/openserve/MFN_WIP_Nova_Coverage_5_21_2025 8_41_01 AM.json"
// import PlanetGIS1 from "../data/planetgis/PlanetGIS features1.json"
// import PlanetGIS2 from "../data/planetgis/PlanetGIS features2.json"
// import vuma from "../data/Vuma_master_core.json"

// export type CoverageArea = {
//     name: string;
//     provider: string;
//     polygon: [number, number][];
// };

// export class GeoJSONHandler {
//     async loadAll(): Promise<CoverageArea[]> {
//         const allAreas: CoverageArea[] = [];

//         allAreas.push(...this.parseGeoJSON(Openserve1, "OpenServe"));
//         allAreas.push(...this.parseGeoJSON(Openserve2, "OpenServe"));
//         allAreas.push(...this.parseGeoJSON(Openserve3, "OpenServe"));
//         allAreas.push(...this.parseGeoJSON(Openserve4, "OpenServe"));
//         allAreas.push(...this.parseGeoJSON(PlanetGIS1, "PlanetGIS"));
//         allAreas.push(...this.parseGeoJSON(PlanetGIS2, "PlanetGIS"));
//         allAreas.push(...this.parseGeoJSON(vuma, "Vuma"));

//         return allAreas;
//     }

//     private parseGeoJSON(geojson: any, provider: string): CoverageArea[] {
//         const features = geojson.features || [];

//         return features
//             .filter((f: any) => f.geometry.type === "Polygon")
//             .map((f: any) => ({
//                 name: f.properties?.name || "Unnamed Area",
//                 provider,
//                 polygon: f.geometry.coordinates[0].map(
//                     ([lng, lat]: [number, number]) => [lat, lng]
//                 ), // Flip lng/lat to lat/lng
//             }));
//     }
// }

// src/services/GeoJSONHandler.ts

export type CoverageArea = {
    name: string;
    provider: string;
    polygon: [number, number][];
};

type GeoJSONFeature = {
    type: "Feature";
    properties: { [key: string]: any };
    geometry: {
        type: "Polygon" | "MultiPolygon";
        coordinates: number[][][] | number[][][][];
    };
};

type GeoJSON = {
    type: "FeatureCollection";
    features: GeoJSONFeature[];
};

export class GeoJSONHandler {
    private files = [
        { path: "geojson/openserve/MFN_Live_Nexus_Coverage_5_21_2025 8_41_23 AM.json", provider: "OpenServe" },
        { path: "geojson/openserve/MFN_Live_Nova_Coverage_5_21_2025 8_40_59 AM.json", provider: "OpenServe" },
        { path: "geojson/openserve/MFN_WIP_Nexus_Coverage_5_21_2025 8_41_26 AM.json", provider: "OpenServe" },
        { path: "geojson/openserve/MFN_WIP_Nova_Coverage_5_21_2025 8_41_01 AM.json", provider: "OpenServe" },
        { path: "geojson/planetgis/PlanetGIS features1.json", provider: "PlanetGIS" },
        { path: "geojson/planetgis/PlanetGIS features2.json", provider: "PlanetGIS" },
        { path: "geojson/Vuma_master_core.json", provider: "Vuma" }
    ];

    async loadAll(): Promise<CoverageArea[]> {
        const allAreas: CoverageArea[] = [];

        for (const { path, provider } of this.files) {
            const geojson = await this.fetchGeoJSON(path);
            allAreas.push(...this.parseGeoJSON(geojson, provider));
        }

        return allAreas;
    }

    private async fetchGeoJSON(path: string): Promise<GeoJSON> {
        const res = await fetch(`/${path}`);
        if (!res.ok) {
            throw new Error(`Failed to load GeoJSON from ${path}`);
        }
        return res.json();
    }

    private parseGeoJSON(geojson: GeoJSON, provider: string): CoverageArea[] {
        const features = geojson.features || [];

        return features
            .filter((f) => f.geometry.type === "Polygon")
            .map((f) => ({
                name: f.properties?.name || "Unnamed Area",
                provider,
                polygon: (f.geometry.coordinates[0] as [number, number][]).map(
                    ([lng, lat]) => [lat, lng] // Flip to [lat, lng]
                )
            }));
    }
}
