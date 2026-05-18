import { useState, useEffect } from "react";
import {
  getItineraryStats,
  groupItineraryByDate,
  filterItinerary,
  getUniqueDates,
} from "@/utils/itineraryUtils";
import ItineraryStats from "@/components/itinerary/ItineraryStats";
import ItineraryDayGroup from "@/components/itinerary/ItineraryDayGroup";
import ItineraryFilters from "@/components/itinerary/ItineraryFilters";
import ItineraryEditForm from "@/components/itinerary/ItineraryEditForm";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import useCurrentTrip from "@/hooks/useCurrentTrip";
import { formatTripDateRange } from "@/utils/tripsUtils";

function ItineraryPage() {
  const location = useLocation();
  const { tripId, trip, updateTrip } = useCurrentTrip();

  const [itinerary, setItinerary] = useState(() => trip?.itinerary ?? []);

  useEffect(() => {
    setItinerary(trip?.itinerary ?? []);
  }, [tripId, location.pathname, trip]);

  useEffect(() => {
    const scrollToId = location.state?.scrollToId;

    if (scrollToId) {
      setTimeout(() => {
        const element = document.getElementById(scrollToId);

        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }

        window.history.replaceState({}, document.title);
      }, 100);
    }
  }, [location.state]);

  const [filters, setFilters] = useState({
    date: "All",
    category: "All",
    status: "All",
    priority: "All",
  });

  const [editingItem, setEditingItem] = useState(null);

  const saveItinerary = (nextItinerary) => {
    setItinerary(nextItinerary);
    updateTrip({ itinerary: nextItinerary });
  };

  if (!trip) {
    return (
      <motion.div className="p-8 text-center text-gray-500">Trip not found.</motion.div>
    );
  }

  const stats = getItineraryStats(itinerary);
  const availableDates = getUniqueDates(itinerary);
  const filteredItinerary = filterItinerary(itinerary, filters);
  const groupedItinerary = groupItineraryByDate(filteredItinerary);
  const datesList = Object.keys(groupedItinerary).sort();
  const dateRange = formatTripDateRange(trip.startDate, trip.endDate);

  function handleDeleteActivity(id) {
    const confirmed = window.confirm("Do you want to delete this activity?");

    if (!confirmed) {
      return;
    }

    saveItinerary(itinerary.filter((activity) => activity.id !== id));
    toast.success("Activity deleted successfully!");
  }

  function handleEditActivity(activity) {
    setEditingItem(activity);
  }

  function handleSaveEdit(updatedItem) {
    saveItinerary(
      itinerary.map((activity) =>
        activity.id === updatedItem.id ? updatedItem : activity,
      ),
    );

    setEditingItem(null);
    toast.success("Activity updated successfully!");
  }

  function handleCancelEdit() {
    setEditingItem(null);
  }

  function handleClearFilters() {
    setFilters({
      date: "All",
      category: "All",
      status: "All",
      priority: "All",
    });
  }

  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold text-slate-900">{trip.tripName}</h1>

        <p className="mt-2 text-slate-500">{dateRange}</p>

        <ItineraryStats stats={stats} />
        <div className="flex items-end justify-between">
          <ItineraryFilters
            filters={filters}
            setFilters={setFilters}
            availableDates={availableDates}
            onClearFilters={handleClearFilters}
          />
          <Link
            to="/itinerary/add-activity"
            state={{ tripId, date: availableDates[0] }}
          >
            <button
              type="button"
              className="cursor-pointer rounded-xl bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700"
            >
              + Add Activity
            </button>
          </Link>
        </div>

        {editingItem && (
          <ItineraryEditForm
            editingItem={editingItem}
            onSave={handleSaveEdit}
            onCancel={handleCancelEdit}
          />
        )}

        <section className="mt-8 space-y-8">
          {datesList.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
              <h2 className="text-lg font-bold text-slate-900">
                No activities found
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                Try changing or clearing your filters.
              </p>
            </div>
          ) : (
            datesList.map((date, index) => (
              <ItineraryDayGroup
                key={date}
                dayNumber={index + 1}
                date={date}
                activities={groupedItinerary[date]}
                onDelete={handleDeleteActivity}
                onEdit={handleEditActivity}
                tripId={tripId}
              />
            ))
          )}
        </section>
      </div>
    </main>
  );
}

export default ItineraryPage;
