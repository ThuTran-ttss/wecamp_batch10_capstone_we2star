import { tripDetails as initialTripDetails } from "./tripDetails";

export { trips } from "./trips";
export { tripDetails } from "./tripDetails";
export { packingList } from "./packingList";

export function getInitialTripDetails() {
  return JSON.parse(JSON.stringify(initialTripDetails));
}
