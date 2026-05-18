import { DEFAULT_TRIP_ID, STORAGE_KEYS } from "@/constants/trips";
import { getInitialTripDetails, tripDetails } from "@/mock_data";

export function readTripMapFromStorage() {
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

export function getCurrentTripIdFromStorage() {
  return localStorage.getItem(STORAGE_KEYS.CURRENT_TRIP_ID) || DEFAULT_TRIP_ID;
}

export function getTripFromMap(tripMap, tripId) {
  return tripMap[tripId] ?? tripDetails[tripId] ?? null;
}

export function persistTripMap(tripMap) {
  localStorage.setItem(STORAGE_KEYS.TRIP_DETAILS, JSON.stringify(tripMap));
}

export function updateTripInMap(tripMap, tripId, updates) {
  const existing = tripMap[tripId] ?? tripDetails[tripId];

  if (!existing) {
    return tripMap;
  }

  return {
    ...tripMap,
    [tripId]: {
      ...existing,
      ...updates,
      tripId,
      meta: {
        ...existing.meta,
        lastUpdated: new Date().toISOString(),
      },
    },
  };
}
