import React from 'react';
import { Wallet, CreditCard, Coins, Target } from "lucide-react";

const SummaryCard = ({ title, value, icon: Icon, colorClass, bgColorClass,isInput }) => (
    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between h-32 transition-all hover:shadow-md">
        <div className="flex flex-col gap-1">
            <span className="text-slate-400 text-[11px] font-bold tracking-wider">{title}</span>
            <div className="flex items-baseline gap-1">
                {isInput ? (
                    <input 
                        type="text"
                        value={value.toLocaleString("vi-VN")}
                        onChange={onChange}
                        className="font-bold text-slate-800 w-full focus:outline-none bg-transparent"
                    />
                ) : (
                    <span className="font-bold text-slate-800 leading-none">
                        {value.toLocaleString("vi-VN")}
                    </span>
                )}
                <span className="text-xs text-slate-400 font-bold">VND</span>
            </div>
        </div>
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${bgColorClass}`}>
            <Icon size={20} className={colorClass} />
        </div>
    </div>
);

const BudgetSummary = ({ expenses, totalActual, initialBudget, setInitialBudget }) => {
    const totalEstimated = expenses.reduce((sum, item) => sum + (Number(item.estimatedCost) || 0), 0)
    const remainingBudget = initialBudget - totalActual;

    const handleInputChange = (e) => {
        const rawValue = e.target.value.replace(/\D/g, "");
        setInitialBudget(rawValue === "" ? 0 : Number(rawValue));
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full mb-8">
                <SummaryCard 
                    title="Total Estimated" 
                    value={totalEstimated} 
                    icon={Wallet} 
                    colorClass="text-blue-600" 
                    bgColorClass="bg-blue-50" 
                />
                <SummaryCard 
                    title="Total Actual" 
                    value={totalActual} 
                    icon={CreditCard} 
                    colorClass="text-emerald-600" 
                    bgColorClass="bg-emerald-50" 
                />
                <SummaryCard 
                    title="Remaining Budget" 
                    value={remainingBudget} 
                    icon={Coins} 
                    colorClass={remainingBudget < 0 ? "text-red-500" : "text-purple-600"}
                    bgColorClass="bg-purple-50" 
                />
                
                 <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between h-32 transition-all hover:shadow-md">
                    <div className="flex flex-col gap-1">
                        <span className="text-slate-400 text-[11px] font-bold tracking-wider">Initial Budget</span>
                        <div className="flex items-baseline gap-1">
                            <input 
                                type="text"
                                value={(initialBudget ?? 0).toLocaleString("vi-VN")}
                                onChange={handleInputChange}
                                placeholder="0"
                                className="font-bold w-full focus:outline-none bg-transparent"
                            />
                            <span className="text-[15px] text-gray-400 font-medium">VND</span>
                        </div>
                    </div>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-orange-50">
                        <Target size={20} className="text-orange-600" />
                    </div>
                </div>
        </div>
    );
};

export default BudgetSummary;