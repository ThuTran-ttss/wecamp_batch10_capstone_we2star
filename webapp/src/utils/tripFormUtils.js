/**
 * Parses "Hanoi, Vietnam" → "Vietnam". Falls back to full string if no comma.
 */
export function parseCountryFromDestination(destination = "") {
  const parts = destination
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);

  if (parts.length >= 2) {
    return parts[parts.length - 1];
  }

  return parts[0] || destination.trim();
}
