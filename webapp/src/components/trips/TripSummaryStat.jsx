import { ArrowUpRight, Calendar, MapPin } from "lucide-react";

const VARIANTS = {
  countries: {
    Icon: MapPin,
    container: "border-blue-100 bg-blue-50",
    iconWrap: "bg-blue-500 text-white",
    value: "text-blue-700",
    label: "text-blue-900/70",
  },
  upcoming: {
    Icon: Calendar,
    container: "border-green-100 bg-green-50",
    iconWrap: "bg-green-500 text-white",
    value: "text-green-700",
    label: "text-green-900/70",
  },
  memories: {
    Icon: ArrowUpRight,
    container: "border-gray-200 bg-white",
    iconWrap: "bg-gray-100 text-gray-600",
    value: "text-gray-900",
    label: "text-gray-500",
  },
};

function TripSummaryStat({ variant, label, value, className = "" }) {
  const config = VARIANTS[variant] ?? VARIANTS.memories;
  const { Icon, container, iconWrap, value: valueClass, label: labelClass } =
    config;

  return (
    <div
      className={`flex items-center gap-4 rounded-2xl border p-5 ${container} ${className}`}
    >
      <div className={`rounded-full p-3 ${iconWrap}`}>
        <Icon size={22} strokeWidth={2.5} />
      </div>

      <div className="flex flex-col">
        <span className={`text-xs font-semibold uppercase tracking-wide ${labelClass}`}>
          {label}
        </span>
        <span className={`text-3xl font-extrabold ${valueClass}`}>{value}</span>
      </div>
    </div>
  );
}

export default TripSummaryStat;
