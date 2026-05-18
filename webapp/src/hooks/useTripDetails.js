import { useCallback, useState } from "react";
import { DEFAULT_TRIP_ID, STORAGE_KEYS } from "@/constants/trips";
import { getInitialTripDetails } from "@/mock_data";

function readTripMapFromStorage() {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.TRIP_DETAILS);

    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.error("Failed to read tripDetails from localStorage:", error);
  }

  return getInitialTripDetails();
}

export function useTripDetails() {
  const [tripMap, setTripMap] = useState(readTripMapFromStorage);

  const persistTripMap = useCallback((nextMap) => {
    localStorage.setItem(STORAGE_KEYS.TRIP_DETAILS, JSON.stringify(nextMap));
    setTripMap(nextMap);
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

      persistTripMap({
        ...tripMap,
        [trip.tripId]: nextTrip,
      });

      return nextTrip;
    },
    [tripMap, persistTripMap],
  );

  const resetToMock = useCallback(() => {
    const initial = getInitialTripDetails();
    persistTripMap(initial);
    return initial;
  }, [persistTripMap]);

  const setCurrentTripId = useCallback((tripId) => {
    localStorage.setItem(STORAGE_KEYS.CURRENT_TRIP_ID, tripId);
  }, []);

  const getCurrentTripId = useCallback(() => {
    return localStorage.getItem(STORAGE_KEYS.CURRENT_TRIP_ID) || DEFAULT_TRIP_ID;
  }, []);

  return {
    tripMap,
    setTripMap: persistTripMap,
    getTrip,
    upsertTrip,
    resetToMock,
    setCurrentTripId,
    getCurrentTripId,
  };
}

export default useTripDetails;
