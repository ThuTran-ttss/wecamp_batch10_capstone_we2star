import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { packingCategories } from "@/constants/packing";

const PackingItemModal = ({ item, items, onSave, onClose }) => {
  const isEditMode = !!item;

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    quantity: 1,
    packedStatus: "Not Packed",
    requiredStatus: "Required",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (item) {
      setFormData({
        name: item.name,
        category: item.category,
        quantity: item.quantity,
        packedStatus: item.packedStatus,
        requiredStatus: item.requiredStatus,
      });
    } else {
      setFormData({
        name: "",
        category: "",
        quantity: 1,
        packedStatus: "Not Packed",
        requiredStatus: "Required",
      });
    }
    setErrors({});
  }, [item]);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Title is required";
    }
    if (!formData.category) {
      newErrors.category = "Category is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;

    const finalData = {
      ...formData,
      quantity: Number(formData.quantity) || 1,
    };

    if (isEditMode) {
      onSave({ ...item, ...finalData });
    } else {
      const maxId =
        items.length > 0 ? Math.max(...items.map((i) => i.id)) : 0;
      onSave({ id: maxId + 1, ...finalData });
    }

    onClose();
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40">
      <div className="relative w-[480px] rounded-2xl bg-white p-6 shadow-2xl">
        {/* Header */}
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-800">
              {isEditMode ? "Edit Item" : "Add New Item"}
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              Fill in the details to {isEditMode ? "update" : "add"} this to
              your itinerary.
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-md p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
          >
            <X size={20} />
          </button>
        </div>

        {/* Item Name */}
        <div className="mb-4">
          <label className="mb-1.5 block text-sm font-semibold text-slate-700">
            Item name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g., Dinner at Old Quarter"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className={`w-full rounded-lg border px-4 py-2.5 text-sm outline-none transition-colors ${errors.name
              ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
              : "border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
              }`}
          />
          {errors.name && (
            <p className="mt-1 text-xs font-medium text-red-500">
              ⚠ {errors.name}
            </p>
          )}
        </div>

        {/* Category */}
        <div className="mb-4">
          <label className="mb-1.5 block text-sm font-semibold text-slate-700">
            Category
          </label>
          <select
            value={formData.category}
            onChange={(e) => handleChange("category", e.target.value)}
            className={`w-full appearance-none rounded-lg border px-4 py-2.5 text-sm outline-none transition-colors ${errors.category
              ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
              : "border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
              }`}
          >
            <option value="">Select Category</option>
            {packingCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="mt-1 text-xs font-medium text-red-500">
              ⚠ {errors.category}
            </p>
          )}
        </div>

        {/* Quantity */}
        <div className="mb-5">
          <label className="mb-1.5 block text-sm font-semibold text-slate-700">
            Quantity
          </label>
          <input
            type="number"
            min="1"
            value={formData.quantity}
            onChange={(e) => handleChange("quantity", e.target.value)}
            className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm outline-none transition-colors focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* Status Row */}
        <div className="mb-6 flex gap-8">
          {/* Packed Status */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Packed status
            </label>
            <div className="flex gap-4">
              {["Packed", "Not Packed"].map((status) => (
                <label
                  key={status}
                  className="flex cursor-pointer items-center gap-2"
                >
                  <input
                    type="radio"
                    name="packedStatus"
                    value={status}
                    checked={formData.packedStatus === status}
                    onChange={(e) =>
                      handleChange("packedStatus", e.target.value)
                    }
                    className="h-4 w-4 cursor-pointer border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-slate-600">{status}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Required Status */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Required status
            </label>
            <div className="flex gap-4">
              {["Required", "Optional"].map((status) => (
                <label
                  key={status}
                  className="flex cursor-pointer items-center gap-2"
                >
                  <input
                    type="radio"
                    name="requiredStatus"
                    value={status}
                    checked={formData.requiredStatus === status}
                    onChange={(e) =>
                      handleChange("requiredStatus", e.target.value)
                    }
                    className="h-4 w-4 cursor-pointer border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-slate-600">{status}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-lg border border-slate-200 px-6 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition-all hover:bg-blue-700 active:scale-95"
          >
            Save Item
          </button>
        </div>
      </div>
    </div>
  );
};

export default PackingItemModal;
