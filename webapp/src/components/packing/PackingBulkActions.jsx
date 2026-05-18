import { Trash2, X } from "lucide-react";

const PackingBulkActions = ({
  selectedCount,
  onDeleteSelected,
  onClearSelection,
}) => {
  if (selectedCount === 0) return null;

  return (
    <div className="mb-2 flex items-center gap-4 rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5">
      <div className="flex items-center gap-2">
        <div className="flex h-5 w-5 items-center justify-center rounded bg-blue-600 text-[11px] font-bold text-white">
          ✓
        </div>
        <span className="text-sm font-semibold text-slate-700">
          {selectedCount} selected
        </span>
      </div>

      <button
        onClick={onDeleteSelected}
        className="flex items-center gap-1.5 text-sm font-semibold text-red-500 transition-colors hover:text-red-700"
      >
        <Trash2 size={14} />
        Delete Selected
      </button>

      <button
        onClick={onClearSelection}
        className="flex items-center gap-1 text-sm font-medium text-blue-600 transition-colors hover:text-blue-800"
      >
        Clear Selection
      </button>
    </div>
  );
};

export default PackingBulkActions;
