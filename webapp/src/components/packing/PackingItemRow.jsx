import { MoreHorizontal, Check } from "lucide-react";
import { useState } from "react";
import { categoryStyles } from "@/constants/packing";

const PackingItemRow = ({
  item,
  isSelected,
  onToggleSelect,
  onTogglePacked,
  onEdit,
  onDelete,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const categoryStyle = categoryStyles[item.category] || {
    bg: "bg-slate-100",
    text: "text-slate-600",
  };

  const isRequired = item.requiredStatus === "Required";
  const isPacked = item.packedStatus === "Packed";

  return (
    <tr className="border-b border-slate-100 transition-colors hover:bg-slate-50/50">
      {/* Select Checkbox */}
      <td className="py-4 pl-4 pr-2">
        <label className="flex cursor-pointer items-center justify-center">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onToggleSelect(item.id)}
            className="h-4 w-4 cursor-pointer rounded border-slate-300 text-blue-600 focus:ring-blue-500"
          />
        </label>
      </td>

      {/* Item Name */}
      <td className="py-4 px-3">
        <div className="flex items-center gap-2">
          <span className="text-[13px] font-semibold text-slate-800">
            {item.name}
          </span>
          {isRequired ? (
            <span className="inline-block h-2 w-2 rounded-full bg-red-400" title="Required" />
          ) : (
            <span className="text-[11px] font-medium text-slate-400 italic">
              Optional
            </span>
          )}
        </div>
      </td>

      {/* Category */}
      <td className="py-4 px-3">
        <span
          className={`inline-block rounded-full px-3 py-1 text-[11px] font-semibold ${categoryStyle.bg} ${categoryStyle.text}`}
        >
          {item.category}
        </span>
      </td>

      {/* Required */}
      <td className="py-4 px-3 text-center">
        <span
          className={`text-[13px] font-semibold ${isRequired ? "text-red-500" : "text-slate-400"}`}
        >
          {isRequired ? "Yes" : "No"}
        </span>
      </td>

      {/* Quantity */}
      <td className="py-4 px-3 text-center">
        <span className="text-[13px] font-medium text-slate-700">
          {String(item.quantity).padStart(2, "0")}
        </span>
      </td>

      {/* Packed Checkbox */}
      <td className="py-4 px-3 text-center">
        <label className="inline-flex cursor-pointer items-center justify-center">
          <div
            onClick={() => onTogglePacked(item.id)}
            className={`flex h-5 w-5 cursor-pointer items-center justify-center rounded transition-all ${isPacked
              ? "bg-emerald-500 shadow-sm shadow-emerald-200"
              : "border-2 border-slate-300 bg-white hover:border-slate-400"
              }`}
          >
            {isPacked && <Check size={14} className="text-white" strokeWidth={3} />}
          </div>
        </label>
      </td>

      {/* Actions */}
      <td className="relative py-4 px-3 text-center">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="rounded-md p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
        >
          <MoreHorizontal size={18} />
        </button>

        {menuOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-[55]"
              onClick={() => setMenuOpen(false)}
            />

            {/* Dropdown Menu */}
            <div className="absolute right-full top-1/2 z-[60] mr-2 w-28 -translate-y-1/2 overflow-hidden rounded-lg border border-slate-200 bg-white py-1 shadow-xl">
              <button
                onClick={() => {
                  onEdit(item);
                  setMenuOpen(false);
                }}
                className="flex w-full items-center px-3 py-2 text-[12px] font-semibold text-slate-700 transition-colors hover:bg-slate-50"
              >
                Edit
              </button>
              <div className="mx-1 border-t border-slate-100" />
              <button
                onClick={() => {
                  onDelete(item.id);
                  setMenuOpen(false);
                }}
                className="flex w-full items-center px-3 py-2 text-[12px] font-semibold text-red-500 transition-colors hover:bg-red-50"
              >
                Delete
              </button>
            </div>
          </>
        )}
      </td>
    </tr>
  );
};

export default PackingItemRow;
