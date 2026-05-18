import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RefreshCw } from "lucide-react";
import { toast } from "react-toastify";
import { TRIP_STATUS } from "@/constants/trips";
import useTripDetails from "@/hooks/useTripDetails";
import {
  getGlobalTripStats,
  getItineraryCompletion,
  getTripsForList,
} from "@/utils/tripsUtils";
import {
  AppFooter,
  TripCard,
  TripSummaryStat,
  TripsEmptyState,
  TripsPageHeader,
  TripsToolbar,
} from "@/components/trips";

function MyTripsPage() {
  const navigate = useNavigate();
  const { tripMap, setCurrentTripId, resetToMock } = useTripDetails();
  const [statusFilter, setStatusFilter] = useState(TRIP_STATUS.ACTIVE);

  const filteredTrips = getTripsForList(tripMap, statusFilter);
  const activeTrips = getTripsForList(tripMap, TRIP_STATUS.ACTIVE);
  const stats = getGlobalTripStats(tripMap);

  const handleManage = (tripId) => {
    setCurrentTripId(tripId);
    navigate("/dashboard");
  };

  const handleResetAllData = () => {
    const confirmed = window.confirm(
      "Reset all trips to initial mock data? This cannot be undone.",
    );

    if (!confirmed) {
      return;
    }

    resetToMock();
    toast.success("All trip data has been reset to defaults.");
  };

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
      <TripsPageHeader activeTripCount={activeTrips.length} />

      <TripsToolbar
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
      />

      {filteredTrips.length === 0 ? (
        <TripsEmptyState statusFilter={statusFilter} />
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredTrips.map((trip) => (
            <TripCard
              key={trip.tripId}
              trip={trip}
              completionPercent={getItineraryCompletion(trip).percent}
              onManage={() => handleManage(trip.tripId)}
            />
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <TripSummaryStat
          variant="countries"
          label="Countries Visited"
          value={stats.countriesVisited}
        />
        <TripSummaryStat
          variant="upcoming"
          label="Upcoming Activities"
          value={stats.upcomingActivities}
        />
        <TripSummaryStat
          variant="memories"
          label="Total Memories"
          value={stats.totalMemories}
        />
      </div>

      <div className="flex flex-col gap-6">
        <button
          type="button"
          onClick={handleResetAllData}
          className="inline-flex w-fit items-center gap-2 rounded-lg px-1 py-1 text-sm font-semibold text-red-600 transition hover:bg-red-50 hover:text-red-700"
        >
          <RefreshCw size={16} />
          Reset All Data
        </button>

        <AppFooter />
      </div>
    </div>
  );
}

export default MyTripsPage;
