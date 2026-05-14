import { formatShortDate } from "../../utils/itineraryUtils";

function ItineraryFilters({
  filters,
  setFilters,
  availableDates,
  onClearFilters,
  onAddActivity,
}) {
  function handleChange(event) {
    const { name, value } = event.target;

    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  return (
    <section className="mt-8 flex flex-wrap items-center gap-3">
      <select
        name="date"
        value={filters.date}
        onChange={handleChange}
        className="cursor-pointer rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700"
      >
        <option value="All">All Dates</option>

        {availableDates.map((date) => (
          <option key={date} value={date}>
            {formatShortDate(date)}
          </option>
        ))}
      </select>

      <select
        name="category"
        value={filters.category}
        onChange={handleChange}
        className="cursor-pointer rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700"
      >
        <option value="All">All Categories</option>
        <option value="Transport">Transport</option>
        <option value="Hotel">Hotel</option>
        <option value="Food">Food</option>
        <option value="Sightseeing">Sightseeing</option>
        <option value="Shopping">Shopping</option>
        <option value="Activity">Activity</option>
        <option value="Other">Other</option>
      </select>

      <select
        name="status"
        value={filters.status}
        onChange={handleChange}
        className="cursor-pointer rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700"
      >
        <option value="All">All Statuses</option>
        <option value="Planned">Planned</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
      </select>

      <select
        name="priority"
        value={filters.priority}
        onChange={handleChange}
        className="cursor-pointer rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700"
      >
        <option value="All">All Priorities</option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

      <button
        type="button"
        onClick={onClearFilters}
        className="cursor-pointer rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100"
      >
        Clear Filters
      </button>
    </section>
  );
}

export default ItineraryFilters;
