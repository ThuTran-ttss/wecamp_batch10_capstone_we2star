import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  CalendarDays,
  ChevronRight,
  MapPin,
  Plane,
  Hotel,
  Utensils,
  ShoppingBag,
  Ticket,
  MapPinned,
  Package,
  Sun,
} from "lucide-react";

const CATEGORY_ICON = {
  Transport: Plane,
  Hotel: Hotel,
  Food: Utensils,
  Shopping: ShoppingBag,
  Activity: Ticket,
  Sightseeing: MapPinned,
};

const STATUS_CONFIG = {
  Done: {
    className: "bg-green-50 text-green-600 border border-green-200",
  },
  "In Progress": {
    className: "bg-blue-50 text-blue-500 border border-blue-200",
  },
  Planned: {
    className: "bg-gray-100 text-gray-500 border border-gray-200",
  },
};

// Helper: check is Today
function isToday(dateStr) {
  // const today = new Date();
  const today = new Date("2026-06-10");
  today.setHours(0, 0, 0, 0);
  const date = new Date(dateStr);
  date.setHours(0, 0, 0, 0);
  return date.getTime() === today.getTime();
}

// Helper: format date label
function formatDayLabel(dateStr, tripStartDate) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const date = new Date(dateStr);
  date.setHours(0, 0, 0, 0);
  const diffDays = Math.round((date - today) / (1000 * 60 * 60 * 24));

  const tripStart = new Date(tripStartDate);
  const dayNumber =
    Math.round((date - tripStart) / (1000 * 60 * 60 * 24)) + 1;

  let prefix;
  if (diffDays === 0) {
    prefix = `TODAY • ${date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    })}`;
  } else if (diffDays === 1) {
    prefix = `Tomorrow • ${date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    })}`;
  } else {
    prefix = date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  return { label: `${prefix} (Day ${dayNumber})`, dayNumber };
}

// ActivityRow
function ActivityRow({ activity, isHighlighted }) {
  const IconComponent = CATEGORY_ICON[activity.category] || Package;
  const statusConf = STATUS_CONFIG[activity.status] || STATUS_CONFIG["Planned"];

  return (
    <div
      className={`flex items-center gap-3 py-3 px-1 transition-colors ${
        isHighlighted ? "" : ""
      }`}
    >
      {/* Time */}
      <span
        className={`w-11 shrink-0 text-right text-xs font-bold tabular-nums ${
          isHighlighted ? "text-blue-300" : "text-gray-400"
        }`}
      >
        {activity.time}
      </span>

      {/* Timeline dot + line */}
      <div className="flex flex-col shrink-0 items-center self-stretch">
        <div
          className={`mt-2 h-2.5 w-2.5 rounded-full ring-2 ${
            isHighlighted
              ? "bg-blue-300 ring-blue-500"
              : "bg-gray-300 ring-gray-100"
          }`}
        />
        <div
          className={`flex-1 w-px ${
            isHighlighted ? "bg-blue-400/30" : "bg-gray-200"
          }`}
        />
      </div>

      {/* Icon */}
      <div
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
          isHighlighted
            ? "bg-white/20 text-white"
            : "bg-blue-50 text-blue-500"
        }`}
      >
        <IconComponent size={16} strokeWidth={2} />
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <p
          className={`truncate text-sm font-semibold ${
            isHighlighted ? "text-white" : "text-gray-800"
          }`}
        >
          {activity.title}
        </p>
        <div
          className={`mt-0.5 flex items-center gap-1 text-xs ${
            isHighlighted ? "text-blue-200" : "text-gray-400"
          }`}
        >
          <MapPin size={11} strokeWidth={2} />
          <span className="truncate">{activity.location}</span>
        </div>
      </div>

      {/* Status badge */}
      <span
        className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
          isHighlighted
            ? activity.status === "Done"
              ? "bg-white/20 text-white border border-white/30"
              : activity.status === "In Progress"
              ? "bg-amber-400/90 text-amber-900 border border-amber-300"
              : "bg-white/10 text-blue-100 border border-white/20"
            : statusConf.className
        }`}
      >
        {activity.status}
      </span>
    </div>
  );
}

// DaySection
function DaySection({ date, activities, tripStartDate, todayRef }) {
  const todayFlag = isToday(date);
  const { label } = formatDayLabel(date, tripStartDate);

  return (
    <div
      ref={todayFlag ? todayRef : null}
      className={`rounded-2xl overflow-hidden mb-3 transition-all ${
        todayFlag
          ? "bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 shadow-lg shadow-blue-200"
          : "bg-white border border-gray-100 shadow-sm"
      }`}
    >
      {/* Day header */}
      <div
        className={`flex items-center justify-between px-4 py-3 ${
          todayFlag ? "" : ""
        }`}
      >
        <p
          className={`text-sm font-bold tracking-wide ${
            todayFlag ? "text-white" : "text-gray-700"
          }`}
        >
          {label}
        </p>

        {todayFlag && (
          <span className="flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-600 shadow-sm">
            <Sun size={12} className="text-amber-500" />
            Today
          </span>
        )}
      </div>

      {/* Divider */}
      <div
        className={`mx-4 h-px ${todayFlag ? "bg-white/20" : "bg-gray-100"}`}
      />

      {/* Activities */}
      <div className={`px-3 divide-y ${todayFlag ? "divide-white/10" : "divide-gray-100"}`}>
        {activities
          .sort((a, b) => a.time.localeCompare(b.time))
          .map((activity) => (
            <ActivityRow
              key={activity.id}
              activity={activity}
              isHighlighted={todayFlag}
            />
          ))}
      </div>
    </div>
  );
}

// Main component
function UpcomingItinerary({ itineraryData = [], tripStartDate = "" }) {
  const todayRef = useRef(null);
  const scrollContainerRef = useRef(null);

  // Group activities by date
  const grouped = itineraryData.reduce((acc, activity) => {
    const date = activity.date;
    if (!acc[date]) acc[date] = [];
    acc[date].push(activity);
    return acc;
  }, {});

  const sortedDates = Object.keys(grouped).sort();
  const isEmpty = itineraryData.length === 0;

  // Scroll so today is at the top on mount
  useEffect(() => {
    if (!todayRef.current || !scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const todayEl = todayRef.current;

    // Use a small delay to let layout settle
    const timer = setTimeout(() => {
      const containerTop = container.getBoundingClientRect().top;
      const todayTop = todayEl.getBoundingClientRect().top;
      const offset = todayTop - containerTop + container.scrollTop;
      container.scrollTo({ top: offset, behavior: "smooth" });
    }, 100);

    return () => clearTimeout(timer);
  }, [itineraryData]);

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* <CalendarDays size={20} className="text-gray-700" /> */}
          <h2 className="text-lg font-bold text-gray-900">Upcoming Itinerary</h2>
        </div>
        <Link
          to="/itinerary"
          className="flex items-center gap-1 text-sm font-semibold text-blue-500 hover:text-blue-700"
        >
          View Details <ChevronRight size={16} />
        </Link>
      </div>

      {/* Empty state */}
      {isEmpty ? (
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <CalendarDays
            size={36}
            className="mb-2 text-gray-200"
            strokeWidth={1.5}
          />
          <p className="text-sm font-bold text-gray-600">No activities planned yet</p>
          <p className="mt-1 text-xs font-medium text-gray-400">
            Activities added to your itinerary will appear here.
          </p>
        </div>
      ) : (
        /* Scrollable container */
        <div
          ref={scrollContainerRef}
          className="overflow-y-auto pr-1"
          style={{
            maxHeight: "480px",
            scrollbarWidth: "thin",
            scrollbarColor: "#CBD5E1 transparent",
          }}
        >
          {sortedDates.map((date) => (
            <DaySection
              key={date}
              date={date}
              activities={grouped[date]}
              tripStartDate={tripStartDate}
              todayRef={todayRef}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default UpcomingItinerary;