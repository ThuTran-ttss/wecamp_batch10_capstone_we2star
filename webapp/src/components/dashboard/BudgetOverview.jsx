import React from "react";
import { tripDetails } from "@/mock_data";
import { Wallet, AlertTriangle, ChevronRight } from "lucide-react";
import { formatCurrency } from "@/utils/formatUtils";
import { Link } from "react-router-dom";

function BudgetOverview({
  totalBudget = 0,
  remainingBudget = 0,
  unpaidItemsCount = 0,
  unpaidAmount = 0,
  categoryStats = [],
}) {
  const getPercentColor = (percent) => {
    if (percent >= 150) return "text-red-500";
    if (percent >= 100) return "text-orange-500";
    return "text-gray-900";
  };

  const remainingPercent =
    totalBudget > 0 ? Math.round((remainingBudget / totalBudget) * 100) : 0;

  const isBudgetEmpty = categoryStats.length === 0;

  return (
    <div className="flex flex-col gap-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-900">Budget Overview</h2>
        <Link
          to="/budget"
          className="flex cursor-pointer items-center gap-1 text-sm font-semibold text-blue-500 hover:text-blue-700"
        >
          View Details <ChevronRight size={16} />
        </Link>
      </div>

      {isBudgetEmpty ? (
        //  For empty data
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <div className="mb-3 rounded-full bg-slate-50 p-4 text-slate-300">
            <Wallet size={40} strokeWidth={1.5} />
          </div>
          <p className="text-sm font-bold text-gray-700">No budget items yet</p>
          <p className="mt-1 text-xs font-medium text-gray-400">
            Expenses added to your trip will appear here.
          </p>
        </div>
      ) : (
        <div className="flex flex-col">
          {/* Header of table */}
          <div className="mb-3 grid grid-cols-4 gap-4 text-xs font-semibold text-gray-500">
            <div className="col-span-2">Category</div>
            <div className="col-center text-center">
              Total <br />
              Actual Cost
            </div>
            <div className="col-center text-center">
              % of Spent <br />
              Budget
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col gap-5">
            {categoryStats.map((item, index) => {
              const IconComponent = item.icon;

              return (
                <div
                  key={index}
                  className="grid grid-cols-4 items-center gap-4 text-sm"
                >
                  <div className="col-span-2 flex items-center gap-3">
                    <div className="rounded-md bg-slate-50 p-2 text-slate-500">
                      <IconComponent size={18} strokeWidth={2} />
                    </div>
                    <span className="font-bold text-gray-800">{item.name}</span>
                  </div>

                  <div className="text-gary-900 text-center">
                    ${formatCurrency(item.cost)}
                  </div>

                  <div
                    className={`text-right font-bold ${getPercentColor(item.percent)}`}
                  >
                    {item.percent}%
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <hr className="border-dashed border-gray-200" />

      {/* Remaining budget */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between rounded-xl bg-green-50 p-4">
          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-green-100 p-2.5 text-green-600">
              <Wallet size={20} fill="currentColor" className="opacity-80" />
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="font-bold text-gray-900">Remaining Budget</span>
              <span className="text-xs font-medium text-gray-500">
                {remainingPercent}% of total budget
              </span>
            </div>
          </div>
          <span className="text-xl font-bold text-green-600">
            ${formatCurrency(remainingBudget)}
          </span>
        </div>

        {/* Unpaid items */}
        {unpaidItemsCount > 0 && (
          <Link
            to="/budget"
            className="flex cursor-pointer items-center justify-between gap-4 rounded-xl bg-purple-50 p-4 transition-colors hover:bg-purple-100"
          >
            <div className="flex items-center gap-3">
              <div className="shrink-0 text-purple-600">
                <AlertTriangle size={20} strokeWidth={2.5} />
              </div>
              <span className="text-sm font-bold text-purple-700">
                You have {unpaidItemsCount} unpaid items
              </span>
            </div>

            <div className="flex shrink-0 items-center gap-1 text-sm font-semibold text-gray-700">
              <span className="whitespace-nowrap">
                ${formatCurrency(unpaidAmount)} pending
              </span>
              <ChevronRight
                size={18}
                strokeWidth={2.5}
                className="text-purple-700"
              />
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}

export default BudgetOverview;
