import { Cloud, CloudRain, Sun } from "lucide-react";
import { WEATHER_ICONS } from "@/constants/trips";

const WEATHER_CONFIG = {
  [WEATHER_ICONS.SUNNY]: {
    Icon: Sun,
    className: "bg-amber-100 text-amber-600",
  },
  [WEATHER_ICONS.RAINY]: {
    Icon: CloudRain,
    className: "bg-sky-100 text-sky-600",
  },
  [WEATHER_ICONS.CLOUDY]: {
    Icon: Cloud,
    className: "bg-gray-100 text-gray-600",
  },
};

function TripWeatherBadge({ weatherIcon = WEATHER_ICONS.SUNNY, className = "" }) {
  const config = WEATHER_CONFIG[weatherIcon] ?? WEATHER_CONFIG[WEATHER_ICONS.SUNNY];
  const { Icon, className: iconClass } = config;

  return (
    <span
      className={`flex h-8 w-8 items-center justify-center rounded-full ${iconClass} ${className}`}
    >
      <Icon size={16} strokeWidth={2.5} />
    </span>
  );
}

export default TripWeatherBadge;
