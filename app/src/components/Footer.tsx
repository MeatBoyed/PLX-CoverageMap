import { Wifi, Phone, Mail } from "lucide-react";

export default function Footer() {

    return (
        <footer className="bg-gray-900 text-white py-8 sm:py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div>
                        <div className="flex items-center space-x-2 mb-4">
                            <Wifi className="h-6 w-6 text-blue-400" />
                            <span className="text-lg font-bold">PluxNet Fibre</span>
                        </div>
                        <p className="text-gray-400 text-sm">
                            Connecting communities with reliable, high-speed internet since 2010.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Services</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li>Residential Internet</li>
                            <li>Business Solutions</li>
                            <li>Technical Support</li>
                            <li>Installation</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Support</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li>Help Center</li>
                            <li>Contact Us</li>
                            <li>Service Status</li>
                            <li>Billing</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Contact</h4>
                        <div className="space-y-2 text-sm text-gray-400">
                            <div className="flex items-center space-x-2">
                                <Phone className="h-4 w-4" />
                                <span>1-800-PluxNet Fibre</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Mail className="h-4 w-4" />
                                <span>newsales@PluxNet Fibre.com</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
                    <p>&copy; 2024 PluxNet Fibre. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}