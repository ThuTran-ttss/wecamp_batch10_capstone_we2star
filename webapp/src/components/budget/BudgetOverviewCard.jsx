import React from "react";
import { TrendingUp, AlertCircle } from "lucide-react";

const BudgetOverviewCard = ({expenses, initialBudget, totalActual }) => {

    const percentage = initialBudget > 0 ? Math.round((totalActual / initialBudget) * 100) : 0;

    const isOverBudget = percentage >= 100;

  return (
    <div className="bg-[#2D5BFF] text-white rounded-2xl p-3 shadow-sm flex flex-col justify-between h-full">
      <div>
        <h4 className="text-[15px] font-bold opacity-80 tracking-tight">
          Real-time Budget Overview
        </h4>
        <p className="text-[11px] text-blue-200 mt-1 opacity-90">
          Budget usage in real-time
        </p>
      </div>

      <div className="mt-6">
        <div className="flex justify-between items-end mb-2">
          <div>
            <p className="text-[11px] uppercase text-blue-200 mb-0.5">Used</p>
            <p className="text-[20px] font-bold leading-none">
              {totalActual.toLocaleString()} <span className="text-[8px] font-normal opacity-70 ml-0.5">VND</span>
            </p>
          </div>
          
          <div className="text-right">
            <p className="text-[10px] uppercase tracking-wider text-blue-200 mb-1">Vs Budget</p>
            <p className={`text-[14px] font-bold leading-none ${isOverBudget ? 'text-red-300' : 'text-white'}`}>
              {percentage}% {isOverBudget && '↑'}
            </p>
          </div>
        </div>

        <div className="w-full bg-blue-800/40 h-[6px] rounded-full overflow-hidden">
          <div 
            className={`${isOverBudget ? 'bg-[#FF5A5A]' : 'bg-green-400'} h-full rounded-full transition-all duration-500`} 
            style={{ width: `${Math.min(percentage, 100)}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default BudgetOverviewCard;