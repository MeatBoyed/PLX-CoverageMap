// src/services/PackagesHandler.ts
import OpenservePackages from "../data/packages/openserve.json";
import VumaPackages from "../data/packages/vuma.json";

export interface Package {
    name: string;
    speed: string;
    price: string;
    description: string;
    features: string[];
    type: "home" | "business";
    isPopular?: boolean;
}

export class PackagesHandler {
    private packageMap: Record<string, Package[]> = {};

    constructor() {
        this.loadPackages();
    }

    private loadPackages() {
        this.packageMap["OpenServe"] = this.parsePackages(OpenservePackages);
        this.packageMap["Vuma"] = this.parsePackages(VumaPackages);
        // Add more providers here as needed
    }

    private parsePackages(rawData: any): Package[] {
        return Array.isArray(rawData)
            ? rawData.map((pkg) => ({
                name: pkg.name,
                speed: pkg.speed,
                price: pkg.price,
                description: pkg.description,
                features: pkg.features,
                type: pkg.type,
                isPopular: pkg.isPopular || false,
            }))
            : [];
    }

    public getAllPackages(): Record<string, Package[]> {
        return this.packageMap;
    }

    public getPackagesByProvider(provider: string): Package[] {
        return this.packageMap[provider] || [];
    }
}
