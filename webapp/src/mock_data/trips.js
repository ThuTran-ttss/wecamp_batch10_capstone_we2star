import { tripDetails } from "./tripDetails";
import { getTripsForList } from "@/utils/tripsUtils";

/** Summary list derived from tripDetails (single source of truth). */
export const trips = getTripsForList(tripDetails);
