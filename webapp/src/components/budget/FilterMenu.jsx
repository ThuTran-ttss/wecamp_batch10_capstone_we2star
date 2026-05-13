export default function FilterMenu ({
    isOpen,
    activeMenu,
    setActiveMenu,
    filters,
    setFilters
}) {
    if(!isOpen) return null;

    return (
         <div className="absolute right-0 top-10 bg-white border shadow-lg rounded-lg w-56 z-50">
            <div
                className="p-2 hover:bg-gray-100 cursor-pointer flex justify-between"
                onClick={() => setActiveMenu("category")}
            >
                Category <span>▶</span>
            </div>

            <div
                className="p-2 hover:bg-gray-100 cursor-pointer flex justify-between"
                onClick={() => setActiveMenu("paymentStatus")}
            >
                Payment Status <span>▶</span>
            </div>

            {activeMenu === "category" && (
                <div className="absolute left-full top-0 ml-1 bg-white border shadow-lg rounded w-48">
                    <div
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {setFilters((prev) => ({
                            ...prev,
                            category: ""
                        }));
                        setActiveMenu(null);}}
                    >
                        All
                    </div>

                    <div
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {setFilters((prev) => ({
                            ...prev,
                            category: "Transport"
                        }));
                        setActiveMenu(null);}}
                    >
                        Transport
                    </div>

                    <div
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {setFilters((prev) => ({
                            ...prev,
                            category: "Accommodation"
                        }));
                        setActiveMenu(null);}}
                    >
                        Accommodation
                    </div>

                    <div
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {setFilters((prev) => ({
                            ...prev,
                            category: "Food"
                        }));
                        setActiveMenu(null);}}
                    >
                        Food
                    </div>

                    <div
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {setFilters((prev) => ({
                            ...prev,
                            category: "Shopping"
                        }));
                        setActiveMenu(null);}}
                    >
                        Shopping
                    </div>

                    <div
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {setFilters((prev) => ({
                            ...prev,
                            category: "Activity"
                        }));
                        setActiveMenu(null);}}
                    >
                        Activity
                    </div>

                    <div
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {setFilters((prev) => ({
                            ...prev,
                            category: "Other"
                        }));
                        setActiveMenu(null);}}
                    >
                        Other
                    </div>
                </div>
            )}

            {activeMenu === "paymentStatus" && (
                <div className="absolute left-full top-0 ml-1 bg-white border shadow-lg rounded w-48">
                    <div
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {setFilters((prev) => ({
                            ...prev,
                            paymentStatus: ""
                        }));
                        setActiveMenu(null);}}
                    >
                        All
                    </div>

                    <div
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {setFilters((prev) => ({
                            ...prev,
                            paymentStatus: "Paid"
                        }));
                        setActiveMenu(null);}}
                    >
                        Paid
                    </div>

                    <div
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {setFilters((prev) => ({
                            ...prev,
                            paymentStatus: "Unpaid"
                        }));
                        setActiveMenu(null);}}
                    >
                        Unpaid
                    </div>
                </div>
            )}
         </div>
    )
}