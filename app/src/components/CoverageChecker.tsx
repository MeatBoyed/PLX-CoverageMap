import { MapPin, Search } from "lucide-react"
import { useCoverage } from "../lib/CoverageProvider"
import type React from "react"
import { toast } from "sonner"

export default function CoverageChecker() {
    const { checkCoverage } = useCoverage()

    const handleCheckCoverage = (e: React.FormEvent) => {
        e.preventDefault();
        toast.loading("Checking coverage...", {
            duration: 6000,
        })
        checkCoverage();
    }

    return (
        <section className="py-8 sm:py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 -mt-8 relative z-10">
                    <form onSubmit={handleCheckCoverage} className="space-y-4 sm:space-y-6">
                        <div>
                            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                                Enter Your Address
                            </label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <input
                                    type="text"
                                    id="address"
                                    // value={address}
                                    // onChange={(e) => setAddress(e.target.value)}
                                    placeholder="123 Main Street, City, State, ZIP"
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            // disabled={isLoading}
                            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center space-x-2"
                        >
                            {false ? (
                                <>
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                    <span>Checking Coverage...</span>
                                </>
                            ) : (
                                <>
                                    <Search className="h-5 w-5" />
                                    <span>Check Coverage</span>
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    )
}