import React from "react";

import { Package, Pencil, Trash2 } from "lucide-react";

const PackingItem = ({ item, onEdit, onDelete }) => {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-3 transition hover:border-gray-300">
      <div className="flex items-start justify-between gap-3">
        {/* LEFT */}
        <div className="flex min-w-0 flex-1 gap-3">
          {/* ICON */}
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
            <Package size={18} className="text-purple-600" />
          </div>

          {/* CONTENT */}
          <div className="min-w-0 flex-1">
            {/* NAME */}
            <div className="flex items-center gap-2">
              <h4 className="truncate text-sm font-semibold text-gray-800">
                {item.itemName}
              </h4>

              <span className="rounded-full bg-green-100 px-2 py-0.5 text-[11px] font-medium text-green-700">
                x{item.quantity}
              </span>
            </div>

            {/* CATEGORY */}
            <p className="mt-0.5 text-xs text-gray-500">{item.category}</p>

            {/* STATUS */}
            <div className="mt-2 flex flex-wrap gap-2">
              <span className="rounded-full bg-blue-50 px-2 py-1 text-[11px] font-medium text-blue-600">
                {item.packed === "Yes" ? "Packed" : "Not Packed"}
              </span>

              <span className="rounded-full bg-gray-100 px-2 py-1 text-[11px] font-medium text-gray-600">
                {item.required === "Yes" ? "Required" : "Optional"}
              </span>
            </div>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex cursor-pointer items-center gap-2">
          <button
            type="button"
            onClick={() => onEdit(item.itemName)}
            className="cursor-pointer rounded-md p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
          >
            <Pencil size={16} />
          </button>

          <button
            type="button"
            onClick={() => onDelete(item.itemName)}
            className="cursor-pointer rounded-md p-1.5 text-red-400 transition hover:bg-red-50 hover:text-red-600"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PackingItem;
