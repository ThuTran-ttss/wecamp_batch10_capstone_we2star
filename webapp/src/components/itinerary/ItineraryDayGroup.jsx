import ItineraryActivityCard from "./ItineraryActivityCard";
import { formatFullDate, formatShortDate } from "../../utils/itineraryUtils";
import { Link } from "react-router-dom";

function ItineraryDayGroup({
  dayNumber,
  date,
  activities,
  onEdit,
  onDelete,
  tripId,
}) {
  return (
    <section className="grid grid-cols-[40px_1fr] gap-4">
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
        {dayNumber}
      </div>

      <div>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Day {dayNumber} · {formatFullDate(date)}
            </h2>

            <p className="text-xs font-bold text-slate-500">
              {activities.length} ACTIVITIES
            </p>
          </div>
          <Link
            to={"/itinerary/add-activity"}
            state={{ date: date, tripId: tripId }}
          >
            <button
              type="button"
              className="cursor-pointer rounded-xl border border-blue-100 bg-white px-4 py-2 text-sm font-semibold text-blue-600"
            >
              + Add activity to {formatShortDate(date)}
            </button>
          </Link>
        </div>

        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} id={activity.id}>
              <ItineraryActivityCard
                key={activity.id}
                activity={activity}
                onDelete={onDelete}
                onEdit={onEdit}
              />{" "}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ItineraryDayGroup;
