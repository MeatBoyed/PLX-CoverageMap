// import fullGeoJson from '../data/Vuma_master_core.json';

// export type CoverageResult = {
//     covered: boolean;
//     matches: {
//         name: string;
//         address: string;
//         area: string;
//         cluster: string;
//         packages: string[];
//     }[];
// };

// export class CoverageService {
//     private features: GeoJSON.Feature[];

//     constructor() {
//         this.features = fullGeoJson.features as GeoJSON.Feature[];
//     }

//     async checkCoverage(lat: number, lng: number): Promise<CoverageResult> {
//         const point = { type: 'Point', coordinates: [lng, lat] };
//         const matches: CoverageResult['matches'] = [];

//         for (const feature of this.features) {
//             if (
//                 feature.geometry &&
//                 feature.geometry.type === 'Polygon' &&
//                 this.isPointInPolygon(point, feature.geometry.coordinates[0])
//             ) {
//                 const props = feature.properties || {};
//                 matches.push({
//                     name: props.name || 'Unknown',
//                     address: props.address || '',
//                     area: props.area || '',
//                     cluster: props.cluster || '',
//                     packages: this.getPackagesForArea(props.area),
//                 });
//             }
//         }

//         return {
//             covered: matches.length > 0,
//             matches,
//         };
//     }

//     private getPackagesForArea(area: string): string[] {
//         const ProviderPackages: Record<string, string[]> = {
//             Sunninghill: ['50Mbps - R599', '100Mbps - R799'],
//             Broadacres: ['25Mbps - R399', '50Mbps - R599'],
//         };
//         return ProviderPackages[area] || [];
//     }

//     private isPointInPolygon(point: any, polygon: number[][]): boolean {
//         const [x, y] = point.coordinates;
//         let inside = false;

//         for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
//             const xi = polygon[i][0], yi = polygon[i][1];
//             const xj = polygon[j][0], yj = polygon[j][1];

//             const intersect =
//                 yi > y !== yj > y &&
//                 x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;

//             if (intersect) inside = !inside;
//         }

//         return inside;
//     }
// }
