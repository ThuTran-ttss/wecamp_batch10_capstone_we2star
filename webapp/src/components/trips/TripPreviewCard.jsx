import {
  Backpack,
  Calendar,
  ChevronRight,
  Eye,
  MapPin,
  Pencil,
  Wallet,
} from "lucide-react";
import { formatTripDateRange } from "@/utils/tripsUtils";
import { formatCurrency } from "@/utils/formatUtils";
import FormSectionCard from "./FormSectionCard";

const FALLBACK_COVER =
  "https://images.unsplash.com/photo-1598902108854-10e335adac99?w=800&q=80";

const FEATURE_LINKS = [
  {
    icon: Calendar,
    title: "Itinerary",
    description: "Plan activities and manage your schedule.",
  },
  {
    icon: Wallet,
    title: "Budget",
    description: "Track expenses and manage your budget.",
  },
  {
    icon: Backpack,
    title: "Packing List",
    description: "Prepare items for your trip.",
  },
];

function PreviewRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3 text-sm">
      <Icon size={16} className="mt-0.5 shrink-0 text-gray-400" />
      <div className="flex flex-col">
        <span className="text-xs font-medium text-gray-500">{label}</span>
        <span className="font-semibold text-gray-900">{value || "—"}</span>
      </div>
    </div>
  );
}

function TripPreviewCard({
  tripName,
  destination,
  startDate,
  endDate,
  budget,
  currency = "USD",
  coverImage,
  className = "",
}) {
  const dateRange =
    startDate && endDate
      ? formatTripDateRange(startDate, endDate)
      : "Start Date - End Date";

  const budgetLabel =
    budget !== "" && budget !== undefined && budget !== null
      ? `${currency} ${formatCurrency(Number(budget))}`
      : "—";

  return (
    <FormSectionCard
      title="Trip Preview"
      icon={Eye}
      subtitle="Here's how your trip will look."
      className={className}
    >
      <div className="flex flex-col gap-5">
        <div className="relative overflow-hidden rounded-xl">
          <img
            src={coverImage || FALLBACK_COVER}
            alt="Trip preview"
            className="aspect-[4/3] w-full object-cover"
          />
          <span className="absolute right-2 top-2 rounded-lg bg-white/90 p-2 text-gray-600 shadow-sm">
            <Pencil size={14} />
          </span>
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-lg font-bold text-gray-900">
            {tripName || "Trip Name"}
          </p>
          <PreviewRow icon={MapPin} label="Destination" value={destination} />
          <PreviewRow icon={Calendar} label="Dates" value={dateRange} />
          <PreviewRow icon={Wallet} label="Budget" value={budgetLabel} />
        </div>

        <ul className="flex flex-col divide-y divide-gray-100 rounded-xl border border-gray-100">
          {FEATURE_LINKS.map(({ icon: Icon, title, description }) => (
            <li key={title}>
              <button
                type="button"
                disabled
                title="Available after creating your trip"
                className="flex w-full cursor-not-allowed items-center gap-3 px-4 py-3 text-left opacity-60"
              >
                <Icon size={18} className="shrink-0 text-blue-600" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-gray-900">{title}</p>
                  <p className="text-xs text-gray-500">{description}</p>
                </div>
                <ChevronRight size={16} className="shrink-0 text-gray-400" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </FormSectionCard>
  );
}

export default TripPreviewCard;
