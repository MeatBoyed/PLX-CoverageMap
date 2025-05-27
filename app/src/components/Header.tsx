import { Wifi, Phone } from "lucide-react";

export default function Header() {

    return (
        <header className="bg-blue-950 shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center space-x-2">
                        {/* <Wifi className="h-8 w-8 text-blue-600" />
                        <span className="text-xl font-bold text-gray-900">FastNet ISP</span> */}
                        <img src="/logo.png" alt="FastNet ISP Logo" className="h-16 w-60" />

                        {/* <h1 className=" text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Check Your Coverage</h1> */}
                    </div>
                    {/* <div className="hidden sm:flex items-center space-x-6">
                        <Phone className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">1-800-FASTNET</span>
                    </div> */}
                </div>
            </div>
        </header>
    )

}