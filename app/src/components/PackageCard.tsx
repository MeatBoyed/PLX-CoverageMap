import { Zap } from "lucide-react";
import type { Package } from "../lib/PackagesHandler";
import { Button } from "./ui/button";

export default function PackageCard({ pkg }: { pkg: Package }) {

    return (
        <div
            key={pkg.name}
            className={`relative bg-white/95 backdrop-blur-sm rounded-xl shadow-xl border-2 ${pkg.isPopular ? "border-green-500 ring-2 ring-green-200" : "border-gray-200"
                } p-6 hover:shadow-2xl transition-all duration-300 hover:bg-white`}
        >
            {pkg.isPopular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                        Most Popular
                    </span>
                </div>
            )}

            <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                <div
                    // className={`inline-flex items-center space-x-1 ${getColorClasses(pkg., "text")} mb-3`}
                    className={`inline-flex items-center space-x-1 mb-3`}
                >
                    <Zap className="h-5 w-5" />
                    <span className="font-semibold">{pkg.speed}</span>
                </div>
                <div className="text-3xl font-bold text-gray-900">
                    {pkg.price}
                    <span className="text-sm font-normal text-gray-500">/month</span>
                </div>
            </div>

            <ul className="space-y-3 mb-6">
                {pkg.features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-2">
                        <div
                            // className={`w-5 h-5 rounded-full ${getColorClasses(pkg.color, "bg")} flex items-center justify-center flex-shrink-0 mt-0.5`}
                            className={`w-5 h-5 rounded-full flex bg-black items-center justify-center flex-shrink-0 mt-0.5`}
                        >
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                        <span className="text-sm text-gray-600">{feature}</span>
                    </li>
                ))}
            </ul>

            <Button
                // className={`w-full ${getColorClasses(pkg.color, "bg")} hover:opacity-90 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 shadow-lg`}
                // className={`w-full hover:opacity-90 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 shadow-lg`}
                variant={"default"}
            >
                Select Plan
            </Button>
        </div>
    )
}