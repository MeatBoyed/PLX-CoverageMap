
export default function Hero() {

    return (
        // <section className="relative overflow-hidden text-white py-12 sm:py-16 min-h-[50vh]">
        //     {/* Background Image */}
        //     <img
        //         src="/banner.png" // Replace with your actual path
        //         alt="Coverage background"
        //         className="absolute inset-0 w-full h-full object-cover z-0"
        //     />

        //     {/* Optional dark overlay for contrast */}
        //     {/* <div className="absolute inset-0 bg-gradient-to-br from-blue-600/80 to-blue-800/80 z-10" /> */}
        //     <div className="absolute inset-0 bg-gray-900/0  z-10" />

        //     {/* Foreground Content */}
        //     <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        //         <div className="text-center">
        //             <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
        //                 Check Your Coverage
        //             </h1>
        //             <p className="text-lg sm:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
        //                 Enter your address to see available internet packages in your area
        //             </p>
        //         </div>
        //     </div>
        // </section>

        <section className="bg-gradient-to-br from-primary to-secondary text-white py-12 sm:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    {/* <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Check Your Coverage</h1> */}
                    <p className="text-lg sm:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                        Enter your address to see available internet packages in your area
                    </p>
                </div>
            </div>
        </section>
    )
}