import React from "react";

const categoryMap = {
    "Transport": {icon: "🚌", color: "bg-blue-500"},
    "Accommodation": {icon: "🏠", color: "bg-indigo-500"},
    "Activity": {icon: "🎡", color: "bg-green-500"},
    "Food": {icon: "🍔", color: "bg-orange-400"},
    "Shopping": {icon: "🛍️", color: "bg-pink-400"},
};


const CostByCategory = ({ expenses = [], totalActual}) => {

    const categoryData = Object.keys(categoryMap).map((cate) => {
        const amount = expenses
            .filter(item => item.category === cate)
            .reduce((sum, item) => sum + (Number(item.actualCost) || 0), 0);

    const percentage = totalActual > 0 ? Math.round((amount / totalActual) * 100) : 0;

    return {
        name: cate,
        amount: amount,
        percentage: percentage,
        icon: categoryMap[cate].icon,
        color: categoryMap[cate].color
    };}).filter(cat => cat.amount > 0);

    return (
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex justify-between items-center mb-6">
                <h4 className="text-sm font-bold text-gray-900 uppercase tracking-tight">
                    Cost per Category
                </h4>
                <button className="text-gray-400 text-lg hover:text-blue-600 transition-colors">+</button>
            </div>
            <div className="space-y-5">
                {categoryData.length > 0 ? (
                categoryData.map((item, index) => (
                    <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between gap-2">
                        
                        <div className="flex items-center gap-2 min-w-0">
                            <span className="w-3 h-3 flex items-center justify-center text-xl flex-shrink-0">
                            {item.icon}
                            </span>
                            
                            <div className="flex-1 min-w-0">
                                <span className="text-[9px] font-semibold text-gray-700 whitespace-nowrap">
                                {item.name}
                                </span>
                            </div>
                        </div>

                        <div className="text-right flex-shrink-0">
                            <span className="text-[10px] font-bold text-gray-900 inline-block">
                            {item.amount.toLocaleString("vi-VN")}
                            </span>
                            <span className="text-[8px] text-gray-400 ml-1 font-medium italic">VND</span>
                        </div>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                        className={`${item.color} h-full rounded-full transition-all duration-700 ease-out`}
                        style={{ width: `${item.percentage}%` }}
                        />
                    </div>
                    
                    <div className="text-right">
                        <span className="text-[10px] font-bold text-gray-400 uppercase">
                        {item.percentage}% of total
                        </span>
                    </div>
                    </div>
                ))
                ) : (
                <p className="text-xs text-gray-400 italic text-center py-4">No expenses recorded yet.</p>
                )}
            </div>
        </div>
    )
};
export default CostByCategory;