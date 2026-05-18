import { useCallback, useEffect } from "react";
import { useLocation } from "react-router-dom";
import useTripDetails from "@/hooks/useTripDetails";
import { getTripFromMap } from "@/utils/tripStorage";

/**
 * Returns the active trip from localStorage-backed tripMap.
 * Re-syncs when the route changes (e.g. after Manage on My Trips).
 */
export default function useCurrentTrip() {
  const location = useLocation();
  const { tripMap, getCurrentTripId, setTripMap, setTripMap: persist } =
    useTripDetails();

  const tripId = getCurrentTripId();
  const trip = getTripFromMap(tripMap, tripId);

  useEffect(() => {
    persist(tripMap);
  }, [location.pathname]);

  const updateTrip = useCallback(
    (updates) => {
      if (!tripId || !trip) {
        return null;
      }

      const nextTrip = {
        ...trip,
        ...updates,
        tripId,
        meta: {
          ...trip.meta,
          lastUpdated: new Date().toISOString(),
        },
      };

      const nextMap = {
        ...tripMap,
        [tripId]: nextTrip,
      };

      setTripMap(nextMap);
      return nextTrip;
    },
    [trip, tripId, tripMap, setTripMap],
  );

  return {
    tripId,
    trip,
    updateTrip,
  };
}
