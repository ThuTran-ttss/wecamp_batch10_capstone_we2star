import PackingItemRow from "./PackingItemRow";

const PackingTable = ({
  items,
  selectedIds,
  onToggleSelect,
  onToggleSelectAll,
  onTogglePacked,
  onEdit,
  onDelete,
}) => {
  const allSelected = items.length > 0 && items.every((item) => selectedIds.has(item.id));

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <table className="w-full table-fixed">
        <colgroup>
          <col className="w-[5%]" />
          <col className="w-[30%]" />
          <col className="w-[18%]" />
          <col className="w-[12%]" />
          <col className="w-[10%]" />
          <col className="w-[12%]" />
          <col className="w-[8%]" />
        </colgroup>

        <thead>
          <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
            <th className="py-3 pl-4 pr-2">
              <label className="flex cursor-pointer items-center justify-center">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={onToggleSelectAll}
                  className="h-4 w-4 cursor-pointer rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
              </label>
            </th>
            <th className="py-3 px-3 text-left">Item Name</th>
            <th className="py-3 px-3 text-left">Category</th>
            <th className="py-3 px-3 text-center">Required</th>
            <th className="py-3 px-3 text-center">Qty</th>
            <th className="py-3 px-3 text-center">Packed</th>
            <th className="py-3 px-3 text-center"></th>
          </tr>
        </thead>

        <tbody>
          {items.length === 0 ? (
            <tr>
              <td
                colSpan={7}
                className="py-12 text-center text-sm text-slate-400"
              >
                No items found. Try adjusting your filters or add a new item.
              </td>
            </tr>
          ) : (
            items.map((item) => (
              <PackingItemRow
                key={item.id}
                item={item}
                isSelected={selectedIds.has(item.id)}
                onToggleSelect={onToggleSelect}
                onTogglePacked={onTogglePacked}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PackingTable;
