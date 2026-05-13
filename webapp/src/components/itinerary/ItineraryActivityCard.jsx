import {
  Bus,
  Hotel,
  Utensils,
  MapPin,
  ShoppingBag,
  Ticket,
  CircleDot,
  MoreVertical,
  AlertTriangle,
} from "lucide-react";
import { useState } from "react";

import { getWeekday, isOverdueActivity } from "../../utils/itineraryUtils";

function getCategoryIcon(category) {
  const icons = {
    Transport: Bus,
    Hotel: Hotel,
    Food: Utensils,
    Sightseeing: MapPin,
    Shopping: ShoppingBag,
    Activity: Ticket,
    Other: CircleDot,
  };

  return icons[category] || CircleDot;
}

function getPriorityClass(priority) {
  if (priority === "High") {
    return "bg-red-50 text-red-600";
  }

  if (priority === "Medium") {
    return "bg-orange-50 text-orange-600";
  }

  return "bg-green-50 text-green-600";
}

function getStatusClass(status) {
  if (status === "Done") {
    return "bg-green-50 text-green-600";
  }

  if (status === "In Progress") {
    return "bg-purple-50 text-purple-600";
  }

  return "bg-blue-50 text-blue-600";
}

function ItineraryActivityCard({ activity, onEdit, onDelete }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isOverdue = isOverdueActivity(activity);
  const CategoryIcon = getCategoryIcon(activity.category);

  function handleEditClick() {
    onEdit?.(activity);
    setIsMenuOpen(false);
  }

  function handleDeleteClick() {
    onDelete?.(activity.id);
    setIsMenuOpen(false);
  }

  return (
    <article
      className={`grid grid-cols-[80px_1fr_auto_auto_32px] items-center gap-5 rounded-2xl border px-5 py-4 shadow-sm ${
        isOverdue ? "border-red-200 bg-red-50" : "border-slate-200 bg-white"
      }`}
    >
      <div className="border-r border-slate-200 pr-4">
        <p className="text-sm font-bold text-slate-900">{activity.time}</p>
        <p className="mt-1 text-xs font-semibold text-slate-500">
          {getWeekday(activity.date)}
        </p>
      </div>

      <div>
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50">
            <CategoryIcon className="h-4 w-4 text-blue-600" />
          </span>

          <h3 className="text-sm font-bold text-slate-900">{activity.title}</h3>
        </div>

        <div className="mt-2 flex items-center gap-2 text-xs font-medium text-slate-500">
          <MapPin className="h-4 w-4" />
          <span>{activity.location}</span>
        </div>
      </div>

      <div className="w-28">
        {isOverdue && (
          <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-600">
            <AlertTriangle className="h-3 w-3" />
            Overdue
          </span>
        )}
      </div>

      <div className="flex items-center gap-3">
        <span
          className={`rounded-full px-3 py-1 text-xs font-bold ${getPriorityClass(
            activity.priority,
          )}`}
        >
          {activity.priority}
        </span>

        <span
          className={`rounded-full px-4 py-1 text-xs font-bold ${getStatusClass(
            activity.status,
          )}`}
        >
          {activity.status}
        </span>
      </div>

      <div className="relative flex justify-end">
        <button
          type="button"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900"
          aria-label="Open activity actions"
        >
          <MoreVertical className="h-5 w-5" />
        </button>

        {isMenuOpen && (
          <div className="absolute top-9 right-0 z-10 w-28 rounded-xl border border-slate-200 bg-white py-2 shadow-lg">
            <button
              type="button"
              onClick={handleEditClick}
              className="block w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-100"
            >
              Edit
            </button>

            <button
              type="button"
              onClick={handleDeleteClick}
              className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </article>
  );
}

export default ItineraryActivityCard;
