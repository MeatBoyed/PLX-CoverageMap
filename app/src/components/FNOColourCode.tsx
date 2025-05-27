
export default function FNOColourCode() {

    return (
        <section className="pb-4">
            <div className="flex">
                <div className="bg-white flex flex-col rounded-lg shadow-sm border border-gray-200 p-3">
                    {/* <h4 className="text-sm font-medium text-gray-700 mb-2 text-center sm:text-left">FNO Coverage</h4> */}
                    <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
                        <div className="flex items-center space-x-1.5">
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            <span className="text-xs text-gray-600">OpenServe</span>
                        </div>
                        <div className="flex items-center space-x-1.5">
                            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                            <span className="text-xs text-gray-600">Vumatel</span>
                        </div>
                        {/* <div className="flex items-center space-x-1.5">
                            <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                            <span className="text-xs text-gray-600">Frogfoot</span>
                        </div> */}
                        {/* <div className="flex items-center space-x-1.5">
                            <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                            <span className="text-xs text-gray-600">MetroFibre</span>
                        </div>
                        <div className="flex items-center space-x-1.5">
                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                            <span className="text-xs text-gray-600">DFA</span>
                        </div>
                        <div className="flex items-center space-x-1.5">
                            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                            <span className="text-xs text-gray-600">Octotel</span>
                        </div>
                        <div className="flex items-center space-x-1.5">
                            <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
                            <span className="text-xs text-gray-600">Link Africa</span>
                        </div>
                        <div className="flex items-center space-x-1.5">
                            <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
                            <span className="text-xs text-gray-600">Evotel</span>
                        </div> */}
                    </div>
                </div>
            </div>
        </section>
    )
}