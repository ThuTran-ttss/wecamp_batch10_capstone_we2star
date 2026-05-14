import { useState, useEffect } from "react";
import { tripDetails } from "../../mock_data/tripDetails";
import {
  getItineraryStats,
  groupItineraryByDate,
  filterItinerary,
  getUniqueDates,
} from "../../utils/itineraryUtils";
import ItineraryStats from "../../components/itinerary/ItineraryStats";
import ItineraryDayGroup from "../../components/itinerary/ItineraryDayGroup";
import ItineraryFilters from "../../components/itinerary/ItineraryFilters";
import ItineraryEditForm from "../../components/itinerary/ItineraryEditForm";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

// const ITINERARY_STORAGE_KEY = "itinerary";

function ItineraryPage() {
  const currentTrip = tripDetails.trip_001;
  const location = useLocation();
  //state declaration
  // const [itinerary, setItinerary] = useState(() => {
  //   try {
  //     const savedItinerary = localStorage.getItem(ITINERARY_STORAGE_KEY);
  //     if (savedItinerary) {
  //       return JSON.parse(savedItinerary);
  //     }
  //     return currentTrip.itinerary;
  //   } catch (error) {
  //     console.error("Failed to load itinerary from localStorage", error);
  //     return currentTrip.itinerary;
  //   }
  // });
  const [itinerary, setItinerary] = useState(() => {
    try {
      const savedTrips = localStorage.getItem("tripDetails");

      if (savedTrips) {
        const parsedTrips = JSON.parse(savedTrips);

        return parsedTrips[currentTrip.tripId]?.itinerary || [];
      }

      return currentTrip.itinerary;
    } catch (error) {
      console.error("Failed to load itinerary from localStorage", error);

      return currentTrip.itinerary;
    }
  });
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

  //useEffect autosave (old key)
  // useEffect(() => {
  //   localStorage.setItem(ITINERARY_STORAGE_KEY, JSON.stringify(itinerary));
  // }, [itinerary]);
  useEffect(() => {
    const savedTrips =
      JSON.parse(localStorage.getItem("tripDetails")) || tripDetails;

    savedTrips[currentTrip.tripId].itinerary = itinerary;

    localStorage.setItem("tripDetails", JSON.stringify(savedTrips));
  }, [itinerary, currentTrip.tripId]);
  const stats = getItineraryStats(itinerary);
  const availableDates = getUniqueDates(itinerary);
  const filteredItinerary = filterItinerary(itinerary, filters);
  const groupedItinerary = groupItineraryByDate(filteredItinerary);
  const datesList = Object.keys(groupedItinerary).sort();

  //delete
  function handleDeleteActivity(id) {
    const confirmed = window.confirm("Do you want to delete this activity?");
    if (!confirmed) return;
    setItinerary((prev) => prev.filter((activity) => activity.id !== id));
    toast.success("Activity deleted successfully!");
  }

  //edit (open form, save, canel)
  function handleEditActivity(activity) {
    setEditingItem(activity);
  }
  
  function handleSaveEdit(updatedItem) {
    setItinerary((prev) =>
      prev.map((activity) =>
        activity.id === updatedItem.id ? updatedItem : activity,
      ),
    );

    setEditingItem(null);
    toast.success("Activity updated successfully!");
  }

  function handleCancelEdit() {
    setEditingItem(null);
  }

  // set default filter
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
        <h1 className="text-3xl font-bold text-slate-900">
          {currentTrip.tripName}
        </h1>

        <p className="mt-2 text-slate-500">
          {currentTrip.startDate} - {currentTrip.endDate}
        </p>

        <ItineraryStats stats={stats} />
        <div className="flex items-end justify-between">
          <ItineraryFilters
            filters={filters}
            setFilters={setFilters}
            availableDates={availableDates}
            onClearFilters={handleClearFilters}
          />
          <Link
            to={"/itinerary/add-activity"}
            state={{ tripId: currentTrip.tripId }}
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
                tripId={currentTrip.tripId}
              />
            ))
          )}
        </section>
      </div>
    </main>
  );
}

export default ItineraryPage;
