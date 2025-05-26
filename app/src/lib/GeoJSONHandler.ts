// src/services/GeoJSONHandler.ts
import Openserve1 from "../data/openserve/MFN_Live_Nexus_Coverage_5_21_2025 8_41_23 AM.json"
import Openserve2 from "../data/openserve/MFN_Live_Nova_Coverage_5_21_2025 8_40_59 AM.json"
import Openserve3 from "../data/openserve/MFN_WIP_Nexus_Coverage_5_21_2025 8_41_26 AM.json"
import Openserve4 from "../data/openserve/MFN_WIP_Nova_Coverage_5_21_2025 8_41_01 AM.json"
import vuma from "../data/Vuma_master_core.json"

export type CoverageArea = {
    name: string;
    provider: string;
    polygon: [number, number][];
};

export class GeoJSONHandler {
    async loadAll(): Promise<CoverageArea[]> {
        const allAreas: CoverageArea[] = [];

        allAreas.push(...this.parseGeoJSON(Openserve1, "OpenServe"));
        allAreas.push(...this.parseGeoJSON(Openserve2, "OpenServe"));
        allAreas.push(...this.parseGeoJSON(Openserve3, "OpenServe"));
        allAreas.push(...this.parseGeoJSON(Openserve4, "OpenServe"));
        allAreas.push(...this.parseGeoJSON(vuma, "Vuma"));

        return allAreas;
    }

    private parseGeoJSON(geojson: any, provider: string): CoverageArea[] {
        const features = geojson.features || [];

        return features
            .filter((f: any) => f.geometry.type === "Polygon")
            .map((f: any) => ({
                name: f.properties?.name || "Unnamed Area",
                provider,
                polygon: f.geometry.coordinates[0].map(
                    ([lng, lat]: [number, number]) => [lat, lng]
                ), // Flip lng/lat to lat/lng
            }));
    }
}
