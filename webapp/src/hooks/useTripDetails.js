import { useCallback, useState } from "react";
import { DEFAULT_TRIP_ID, STORAGE_KEYS } from "@/constants/trips";
import { getInitialTripDetails } from "@/mock_data";
import {
  persistTripMap,
  readTripMapFromStorage,
} from "@/utils/tripStorage";

export function useTripDetails() {
  const [tripMap, setTripMapState] = useState(readTripMapFromStorage);

  const setTripMap = useCallback((nextMap) => {
    persistTripMap(nextMap);
    setTripMapState(nextMap);
  }, []);

  const reloadFromStorage = useCallback(() => {
    setTripMapState(readTripMapFromStorage());
  }, []);

  const getTrip = useCallback(
    (tripId) => tripMap[tripId] ?? null,
    [tripMap],
  );

  const upsertTrip = useCallback(
    (trip) => {
      const now = new Date().toISOString();
      const existing = tripMap[trip.tripId];

      const nextTrip = {
        ...trip,
        meta: {
          ...existing?.meta,
          ...trip.meta,
          lastUpdated: now,
          createdAt: existing?.meta?.createdAt ?? trip.meta?.createdAt ?? now,
        },
      };

      const nextMap = {
        ...tripMap,
        [trip.tripId]: nextTrip,
      };

      setTripMap(nextMap);
      return nextTrip;
    },
    [tripMap, setTripMap],
  );

  const resetToMock = useCallback(() => {
    const initial = getInitialTripDetails();
    persistTripMap(initial);
    localStorage.setItem(STORAGE_KEYS.CURRENT_TRIP_ID, DEFAULT_TRIP_ID);
    setTripMapState(initial);
    return initial;
  }, []);

  const setCurrentTripId = useCallback((tripId) => {
    localStorage.setItem(STORAGE_KEYS.CURRENT_TRIP_ID, tripId);
  }, []);

  const getCurrentTripId = useCallback(() => {
    return localStorage.getItem(STORAGE_KEYS.CURRENT_TRIP_ID) || DEFAULT_TRIP_ID;
  }, []);

  return {
    tripMap,
    setTripMap,
    reloadFromStorage,
    getTrip,
    upsertTrip,
    resetToMock,
    setCurrentTripId,
    getCurrentTripId,
  };
}

export default useTripDetails;
