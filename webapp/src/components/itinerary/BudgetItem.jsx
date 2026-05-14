import React from "react";

import { Wallet, Pencil, Trash2 } from "lucide-react";
import { formatVND } from "@/utils/itineraryUtils";

const BudgetItem = ({ budget, onEdit, onDelete }) => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-3 transition hover:border-gray-300 hover:shadow-sm">
      <div className="flex items-start justify-between gap-4">
        {/* LEFT */}
        <div className="flex min-w-0 flex-1 gap-3">
          {/* ICON */}
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-100">
            <Wallet size={18} className="text-green-600" />
          </div>

          {/* CONTENT */}
          <div className="min-w-0 flex-1">
            {/* HEADER */}
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h4 className="truncate text-sm font-semibold text-gray-800">
                  {budget.name}
                </h4>

                <p className="mt-0.5 text-xs text-gray-500">
                  {budget.category}
                </p>
              </div>
            </div>

            {/* COSTS */}
            {/* COSTS + STATUS */}
            <div className="mt-3 flex items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <div className="rounded-2xl bg-green-100 px-2 py-1 text-[11px] font-medium text-green-700">
                  Estimated: {formatVND(budget.estimatedCost)}
                </div>

                <div className="rounded-2xl bg-yellow-100 px-2 py-1 text-[11px] font-medium text-gray-700">
                  Actual: {formatVND(budget.actualCost) || 0}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-1">
          <span className="shrink-0 rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-medium text-blue-600">
            {budget.paymentStatus}
          </span>
          <button
            type="button"
            onClick={() => onEdit(budget.name)}
            className="cursor-pointer rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
          >
            <Pencil size={16} />
          </button>

          <button
            type="button"
            onClick={() => onDelete(budget.name)}
            className="cursor-pointer rounded-lg p-2 text-red-400 transition hover:bg-red-50 hover:text-red-600"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BudgetItem;
