import { Zap, Shield, Clock } from "lucide-react";

export default function Features() {

    return (
        <section className="py-12 sm:py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Why Choose PluxNet Fibre?</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        We provide reliable, high-speed internet with exceptional customer service
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="text-center">
                        <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Zap className="h-8 w-8 text-blue-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Lightning Fast</h3>
                        <p className="text-gray-600">Speeds up to 1 Gig to power all your devices</p>
                    </div>

                    <div className="text-center">
                        <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Shield className="h-8 w-8 text-green-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Reliable Network</h3>
                        <p className="text-gray-600">99.9% uptime with our robust infrastructure</p>
                    </div>

                    <div className="text-center">
                        <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Clock className="h-8 w-8 text-purple-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">24/7 Support</h3>
                        <p className="text-gray-600">Round-the-clock customer support when you need it</p>
                    </div>
                </div>
            </div>
        </section>
    )
}