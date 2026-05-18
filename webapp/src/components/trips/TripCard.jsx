import { ArrowRight, Calendar } from "lucide-react";
import BaseProgressBar from "@/components/dashboard/BaseProgressBar";
import { formatTripDateRange } from "@/utils/tripsUtils";
import TripWeatherBadge from "./TripWeatherBadge";

const FALLBACK_COVER =
  "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80";

function TripCard({
  trip,
  completionPercent,
  onManage,
  className = "",
}) {
  const {
    tripName,
    country,
    coverImage,
    weatherIcon,
    startDate,
    endDate,
  } = trip;

  const percent =
    typeof completionPercent === "number"
      ? completionPercent
      : trip.itineraryCompletionPercent ?? 0;

  const dateLabel = formatTripDateRange(startDate, endDate);

  return (
    <article
      className={`flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:shadow-md ${className}`}
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <img
          src={coverImage || FALLBACK_COVER}
          alt={tripName}
          className="h-full w-full object-cover"
        />

        <span className="absolute left-3 top-3 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
          {country}
        </span>

        <TripWeatherBadge
          weatherIcon={weatherIcon}
          className="absolute right-3 top-3"
        />
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <div>
          <h3 className="text-lg font-bold text-gray-900">{tripName}</h3>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-gray-500">
            <Calendar size={14} className="shrink-0" />
            {dateLabel}
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-gray-600">
              Itinerary Completion
            </span>
            <span className="font-bold text-blue-600">{percent}%</span>
          </div>
          <BaseProgressBar
            percentage={percent}
            colorClass="bg-blue-600"
            heightClass="h-2"
          />
        </div>

        <button
          type="button"
          onClick={onManage}
          className="mt-auto flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 py-2.5 text-sm font-semibold text-gray-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
        >
          Manage
          <ArrowRight size={16} />
        </button>
      </div>
    </article>
  );
}

export default TripCard;
