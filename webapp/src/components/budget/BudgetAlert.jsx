import React from "react";
import { AlertTriangle, AlertOctagon, ArrowRight } from "lucide-react";

const BudgetAlert = ({ totalActual, initialBudget, onReview }) => {
    const usagePercentage = initialBudget > 0 ? (totalActual / initialBudget) * 100 : 0;

    if (usagePercentage < 80) return null;

    const isCritical = usagePercentage >= 100;

    const theme = isCritical ? {
        title: "Critical Alert",
        desc: `Total actual cost has reached 100% of the budget (${initialBudget.toLocaleString("vi-VN")} VND).`,
        icon: <AlertOctagon size={22} />,
        container: "bg-red-50 border-red-100 hover:border-red-200",
        iconBox: "bg-red-500 shadow-red-200",
        titleText: "text-red-600",
        descText: "text-red-500/80",
        button: "text-red-600 border-red-100 group-hover:bg-red-600"
    } : {
        title: "Budget Warning",
        desc: `You've used ${Math.round(usagePercentage)}% of your budget. Please review your expenses.`,
        icon: <AlertTriangle size={22} />,
        container: "bg-amber-50 border-amber-100 hover:border-amber-200",
        iconBox: "bg-amber-500 shadow-amber-200",
        titleText: "text-amber-600",
        descText: "text-amber-600/80",
        button: "text-amber-600 border-amber-100 group-hover:bg-amber-600"
    };

    return (
        <div className={`${theme.container} p-5 rounded-2xl border flex justify-between items-center group cursor-pointer transition-all mb-6`}>
            <div className="flex items-center gap-4">
                <div className={`${theme.iconBox} text-white p-2.5 rounded-full shadow-lg flex items-center justify-center`}>
                    {theme.icon}
                </div>
                <div>
                    <h4 className={`${theme.titleText} font-bold text-sm uppercase`}>{theme.title}</h4>
                    <p className={`${theme.descText} text-sm font-medium`}>{theme.desc}</p>
                </div>
            </div>
        </div>
    )
}

export default BudgetAlert;