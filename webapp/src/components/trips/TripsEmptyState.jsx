import { Link } from "react-router-dom";
import { Map, Plus } from "lucide-react";
import { TRIP_STATUS } from "@/constants/trips";

function TripsEmptyState({
  statusFilter = TRIP_STATUS.ACTIVE,
  createTripPath = "/trips/new",
}) {
  const isActive = statusFilter === TRIP_STATUS.ACTIVE;

  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-gray-200 bg-gray-50/50 px-6 py-16 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-blue-600">
        <Map size={28} strokeWidth={2} />
      </div>

      <div className="flex max-w-sm flex-col gap-2">
        <h3 className="text-lg font-bold text-gray-900">
          No {statusFilter.toLowerCase()} trips yet
        </h3>
        <p className="text-sm text-gray-500">
          {isActive
            ? "Start planning your next adventure by creating a new trip."
            : "Completed trips will appear here once your journey ends."}
        </p>
      </div>

      {isActive && (
        <Link
          to={createTripPath}
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          <Plus size={18} />
          Create New Trip
        </Link>
      )}
    </div>
  );
}

export default TripsEmptyState;
