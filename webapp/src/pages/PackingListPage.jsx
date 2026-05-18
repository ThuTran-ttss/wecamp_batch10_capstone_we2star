import { useState, useMemo } from "react";
import { Pencil } from "lucide-react";
import { toast } from "react-toastify";

import PackingProgress from "@components/packing/PackingProgress";
import PackingFilters from "@components/packing/PackingFilters";
import PackingBulkActions from "@components/packing/PackingBulkActions";
import PackingTable from "@components/packing/PackingTable";
import PackingPagination from "@components/packing/PackingPagination";
import PackingItemModal from "@components/packing/PackingItemModal";
import PackingTip from "@components/packing/PackingTip";

import { packingList } from "@mock_data/packingList";

const ROWS_PER_PAGE = 10;

export default function PackingListPage() {
  // ─── State ───────────────────────────────────────────────
  const [items, setItems] = useState(packingList);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    requiredStatus: "",
  });

  // ─── Computed Values ─────────────────────────────────────
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchSearch =
        !filters.search ||
        item.name.toLowerCase().includes(filters.search.toLowerCase());
      const matchCategory =
        !filters.category || item.category === filters.category;
      const matchRequired =
        !filters.requiredStatus ||
        item.requiredStatus === filters.requiredStatus;
      return matchSearch && matchCategory && matchRequired;
    });
  }, [items, filters]);

  const totalCount = items.length;
  const packedCount = items.filter((i) => i.packedStatus === "Packed").length;
  const requiredUnpackedCount = items.filter(
    (i) => i.requiredStatus === "Required" && i.packedStatus !== "Packed",
  ).length;

  // ─── Pagination ──────────────────────────────────────────
  const totalPages = Math.ceil(filteredItems.length / ROWS_PER_PAGE);
  const startIndex = (currentPage - 1) * ROWS_PER_PAGE;
  const endIndex = startIndex + ROWS_PER_PAGE;
  const paginatedItems = filteredItems.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  const handleSetFilters = (updater) => {
    setFilters(updater);
    setCurrentPage(1);
  };

  // ─── Handlers ────────────────────────────────────────────
  const handleTogglePacked = (id) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
            ...item,
            packedStatus:
              item.packedStatus === "Packed" ? "Not Packed" : "Packed",
          }
          : item,
      ),
    );
  };

  const handleToggleSelect = (id) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleToggleSelectAll = () => {
    const currentIds = paginatedItems.map((item) => item.id);
    const allSelected = currentIds.every((id) => selectedIds.has(id));

    if (allSelected) {
      setSelectedIds((prev) => {
        const next = new Set(prev);
        currentIds.forEach((id) => next.delete(id));
        return next;
      });
    } else {
      setSelectedIds((prev) => {
        const next = new Set(prev);
        currentIds.forEach((id) => next.add(id));
        return next;
      });
    }
  };

  const handleDeleteItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
    toast.success("Item deleted successfully");
  };

  const handleDeleteSelected = () => {
    setItems((prev) => prev.filter((item) => !selectedIds.has(item.id)));
    toast.success(`${selectedIds.size} item(s) deleted`);
    setSelectedIds(new Set());
  };

  const handleClearSelection = () => {
    setSelectedIds(new Set());
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleSaveItem = (savedItem) => {
    setItems((prev) => {
      const exists = prev.some((item) => item.id === savedItem.id);
      if (exists) {
        return prev.map((item) =>
          item.id === savedItem.id ? savedItem : item,
        );
      }
      return [...prev, savedItem];
    });
    toast.success(
      selectedItem ? "Item updated successfully" : "Item added successfully",
    );
  };

  const handleOpenAddModal = () => {
    setSelectedItem(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  // ─── Render ──────────────────────────────────────────────
  return (
    <div className="min-h-screen p-8">
      {/* Header */}
      <header className="mb-8">

        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-bold text-slate-900">
            Ha Noi Discovery
          </h1>
          <Pencil
            size={18}
            className="cursor-pointer text-slate-300 transition-colors hover:text-slate-500"
          />
        </div>
        <p className="mt-1 text-sm font-medium text-slate-500">
          Jun 10 – Jun 15, 2026 • 5 Days trip
        </p>
      </header>

      {/* Progress */}
      <PackingProgress
        totalCount={totalCount}
        packedCount={packedCount}
        requiredUnpackedCount={requiredUnpackedCount}
      />

      {/* Filters */}
      <PackingFilters
        filters={filters}
        setFilters={handleSetFilters}
        onAddItem={handleOpenAddModal}
      />

      {/* Bulk Actions */}
      <PackingBulkActions
        selectedCount={selectedIds.size}
        onDeleteSelected={handleDeleteSelected}
        onClearSelection={handleClearSelection}
      />

      {/* Table */}
      <PackingTable
        items={paginatedItems}
        selectedIds={selectedIds}
        onToggleSelect={handleToggleSelect}
        onToggleSelectAll={handleToggleSelectAll}
        onTogglePacked={handleTogglePacked}
        onEdit={handleEdit}
        onDelete={handleDeleteItem}
      />

      {/* Pagination */}
      <PackingPagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={filteredItems.length}
        startIndex={startIndex}
        endIndex={endIndex}
        onPageChange={setCurrentPage}
      />

      {/* Tip */}
      <PackingTip />

      {/* Modal */}
      {isModalOpen && (
        <PackingItemModal
          item={selectedItem}
          items={items}
          onSave={handleSaveItem}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
