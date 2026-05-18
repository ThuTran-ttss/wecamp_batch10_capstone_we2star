import { format, parseISO, isValid } from "date-fns";
import { TRIP_STATUS } from "@/constants/trips";
import { calculateItineraryStats } from "@/utils/dashboardUtils";

/**
 * Formats ISO dates as "June 10-16, 2026" for trip cards.
 */
export function formatTripDateRange(startDate, endDate) {
  const start = parseISO(startDate);
  const end = parseISO(endDate);

  if (!isValid(start) || !isValid(end)) {
    return `${startDate} - ${endDate}`;
  }

  const sameMonth =
    start.getMonth() === end.getMonth() &&
    start.getFullYear() === end.getFullYear();

  if (sameMonth) {
    return `${format(start, "MMMM d")}-${format(end, "d, yyyy")}`;
  }

  return `${format(start, "MMMM d")} - ${format(end, "MMMM d, yyyy")}`;
}

export function getItineraryCompletion(trip) {
  return calculateItineraryStats(trip?.itinerary ?? []);
}

/**
 * Returns Past when endDate is before today; otherwise keeps stored status.
 */
export function deriveTripStatus(trip) {
  if (!trip?.endDate) {
    return trip?.status ?? TRIP_STATUS.ACTIVE;
  }

  const end = parseISO(trip.endDate);
  if (!isValid(end)) {
    return trip.status ?? TRIP_STATUS.ACTIVE;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (end < today) {
    return TRIP_STATUS.PAST;
  }

  return trip.status ?? TRIP_STATUS.ACTIVE;
}

export function getTripsForList(tripMap, statusFilter = null) {
  const trips = Object.values(tripMap ?? {}).map((trip) => {
    const status = deriveTripStatus(trip);
    const completion = getItineraryCompletion(trip);

    return {
      ...trip,
      status,
      itineraryCompletionPercent: completion.percent,
    };
  });

  const filtered = statusFilter
    ? trips.filter((trip) => trip.status === statusFilter)
    : trips;

  return filtered.sort((a, b) => {
    if (a.status !== b.status) {
      return a.status === TRIP_STATUS.ACTIVE ? -1 : 1;
    }

    return a.startDate.localeCompare(b.startDate);
  });
}

function isUpcomingActivity(activity) {
  if (activity.status === "Done") {
    return false;
  }

  const activityDate = parseISO(activity.date);
  if (!isValid(activityDate)) {
    return false;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return activityDate >= today;
}

/**
 * Global stats for My Trips footer cards (all derived from tripDetails map).
 *
 * - countriesVisited: unique `country` values across all trips
 * - upcomingActivities: non-Done itinerary items on Active trips with date >= today
 * - totalMemories: Done activities + packed packing items (packed === "Yes")
 */
export function getGlobalTripStats(tripMap) {
  const trips = Object.values(tripMap ?? {});

  const countries = new Set(
    trips.map((trip) => trip.country).filter(Boolean),
  );

  let upcomingActivities = 0;
  let totalMemories = 0;

  for (const trip of trips) {
    const status = deriveTripStatus(trip);

    for (const activity of trip.itinerary ?? []) {
      if (activity.status === "Done") {
        totalMemories += 1;
      } else if (status === TRIP_STATUS.ACTIVE && isUpcomingActivity(activity)) {
        upcomingActivities += 1;
      }
    }

    for (const item of trip.packingList ?? []) {
      if (item.packed === "Yes") {
        totalMemories += 1;
      }
    }
  }

  return {
    countriesVisited: countries.size,
    upcomingActivities,
    totalMemories,
  };
}

export function createEmptyTrip({
  tripId,
  tripName,
  destination,
  country,
  startDate,
  endDate,
  budget,
  currency,
  coverImage = "",
  description = "",
  tripType = "Personal",
}) {
  const now = new Date().toISOString();

  return {
    tripId,
    tripName,
    tripType,
    destination,
    country: country || destination,
    startDate,
    endDate,
    status: TRIP_STATUS.ACTIVE,
    currency,
    budget: Number(budget) || 0,
    coverImage,
    weatherIcon: "sunny",
    description: description || "",
    itinerary: [],
    packingList: [],
    budgetItems: [],
    meta: {
      createdAt: now,
      lastUpdated: now,
    },
  };
}
