import { Package, Zap } from "lucide-react"
import { useCoverage } from "../lib/CoverageProvider"
import PackageCard from "./PackageCard"

export default function MapChecker() {
    const { provider, packages, mapRef } = useCoverage()

    const getColorClasses = (color: string, variant: "bg" | "border" | "text") => {
        const colorMap = {
            blue: { bg: "bg-blue-500", border: "border-blue-500", text: "text-blue-600" },
            green: { bg: "bg-green-500", border: "border-green-500", text: "text-green-600" },
            purple: { bg: "bg-purple-500", border: "border-purple-500", text: "text-purple-600" },
            orange: { bg: "bg-orange-500", border: "border-orange-500", text: "text-orange-600" },
        }
        return colorMap[color as keyof typeof colorMap][variant]
    }

    return (
        <section className="py-4 sm:py-6 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Coverage Results - Overlaid on Map */}
                {provider && packages && (
                    <div className="pb-6">
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full mb-4 shadow-lg">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <span className="font-medium">Coverage Available</span>
                            </div>
                            <div className="bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg max-w-2xl mx-auto">
                                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                                    Great News! We Service Your Area
                                </h2>
                                <p className="text-gray-600">Choose from our high-speed internet packages below</p>
                            </div>
                        </div>

                        {/* Package Grid - Overlaid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {packages.map((pkg) => (
                                <PackageCard key={pkg.name} pkg={pkg} />
                            ))}
                        </div>
                    </div>
                )}

                {/* Map Container */}
                <div className="relative min-h-[600px] sm:min-h-[600px] lg:min-h-[600px]">
                    {/* Map Placeholder */}
                    <div className="w-full h-96 sm:h-[600px] lg:h-[600px] bg-gradient-to-br from-green-100 via-blue-50 to-green-50 rounded-lg shadow-lg border border-gray-200 relative overflow-hidden">
                        <div ref={mapRef} id="map" style={{ height: "600px", marginBottom: "5px" }}></div>
                    </div>
                </div>
            </div>
        </section>
    )
}