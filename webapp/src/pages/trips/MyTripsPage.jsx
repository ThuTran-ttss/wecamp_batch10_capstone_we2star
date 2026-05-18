import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  TripsPageHeader,
  TripsToolbar,
} from "@/components/trips";

function MyTripsPage() {
  const navigate = useNavigate();
  const { tripMap, setCurrentTripId } = useTripDetails();
  const [statusFilter, setStatusFilter] = useState(TRIP_STATUS.ACTIVE);

  const filteredTrips = getTripsForList(tripMap, statusFilter);
  const activeTrips = getTripsForList(tripMap, TRIP_STATUS.ACTIVE);
  const stats = getGlobalTripStats(tripMap);

  const handleManage = (tripId) => {
    setCurrentTripId(tripId);
    navigate("/dashboard");
  };

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 p-4 md:p-6 lg:p-8">
      <TripsPageHeader activeTripCount={activeTrips.length} />

      <TripsToolbar
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
      />

      {filteredTrips.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-gray-200 py-16 text-center text-gray-500">
          No {statusFilter.toLowerCase()} trips yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredTrips.map((trip) => (
            <TripCard
              key={trip.tripId}
              trip={trip}
              completionPercent={
                getItineraryCompletion(trip).percent
              }
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

      <AppFooter />
    </div>
  );
}

export default MyTripsPage;
