import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import SegmentedControl from "./SegmentedControl";
import { TRIP_STATUS } from "@/constants/trips";

const FILTER_OPTIONS = [
  { value: TRIP_STATUS.ACTIVE, label: "Active" },
  { value: TRIP_STATUS.PAST, label: "Past" },
];

function TripsToolbar({
  statusFilter,
  onStatusChange,
  createTripPath = "/trips/new",
  className = "",
}) {
  return (
    <div
      className={`flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between ${className}`}
    >
      <Link
        to={createTripPath}
        className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
      >
        <Plus size={18} strokeWidth={2.5} />
        Create New Trip
      </Link>

      <SegmentedControl
        options={FILTER_OPTIONS}
        value={statusFilter}
        onChange={onStatusChange}
      />
    </div>
  );
}

export default TripsToolbar;
