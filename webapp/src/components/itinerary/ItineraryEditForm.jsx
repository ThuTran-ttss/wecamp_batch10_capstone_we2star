import { useEffect, useState } from "react";
import { validateItineraryForm } from "../../utils/itineraryUtils";

function ItineraryEditForm({ editingItem, onSave, onCancel }) {
  const [formData, setFormData] = useState(editingItem);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormData(editingItem);
    setErrors({});
  }, [editingItem]);

  if (!formData) return null;

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const validationErrors = validateItineraryForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onSave(formData);
  }

  return (
    <div
      onClick={onCancel}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4"
    >
      <form
        onSubmit={handleSubmit}
        onClick={(event) => event.stopPropagation()}
        className="w-full max-w-2xl rounded-3xl bg-white p-6 shadow-xl"
      >
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Edit Activity</h2>
            <p className="text-sm text-slate-500">
              Update itinerary activity information
            </p>
          </div>

          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg px-3 py-1 text-slate-500 hover:bg-slate-100"
          >
            ✕
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <label className="space-y-1">
            <span className="text-sm font-semibold text-slate-700">Title</span>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm"
            />
            {errors.title && (
              <p className="text-xs text-red-600">{errors.title}</p>
            )}
          </label>

          <label className="space-y-1">
            <span className="text-sm font-semibold text-slate-700">
              Location
            </span>
            <input
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm"
            />
            {errors.location && (
              <p className="text-xs text-red-600">{errors.location}</p>
            )}
          </label>

          <label className="space-y-1">
            <span className="text-sm font-semibold text-slate-700">Date</span>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm"
            />
            {errors.date && (
              <p className="text-xs text-red-600">{errors.date}</p>
            )}
          </label>

          <label className="space-y-1">
            <span className="text-sm font-semibold text-slate-700">Time</span>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm"
            />
            {errors.time && (
              <p className="text-xs text-red-600">{errors.time}</p>
            )}
          </label>

          <label className="space-y-1">
            <span className="text-sm font-semibold text-slate-700">
              Category
            </span>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm"
            >
              <option value="Transport">Transport</option>
              <option value="Hotel">Hotel</option>
              <option value="Food">Food</option>
              <option value="Sightseeing">Sightseeing</option>
              <option value="Shopping">Shopping</option>
              <option value="Activity">Activity</option>
              <option value="Other">Other</option>
            </select>
          </label>

          <label className="space-y-1">
            <span className="text-sm font-semibold text-slate-700">
              Priority
            </span>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </label>

          <label className="space-y-1 md:col-span-2">
            <span className="text-sm font-semibold text-slate-700">Status</span>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm"
            >
              <option value="Planned">Planned</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
          </label>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-xl border border-slate-200 px-5 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="cursor-pointer rounded-xl bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}

export default ItineraryEditForm;
