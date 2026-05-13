import { useState, useEffect } from "react"
import { tripDetails } from "../mock_data/tripDetails"
import {
  getItineraryStats, groupItineraryByDate,
  filterItinerary, getUniqueDates
} from "../utils/itineraryUtils"
import ItineraryStats from "../components/itinerary/ItineraryStats"
import ItineraryDayGroup from "../components/itinerary/ItineraryDayGroup"
import ItineraryFilters from "../components/itinerary/ItineraryFilters"
import ItineraryEditForm from "../components/itinerary/ItineraryEditForm"
import { useNavigate } from "react-router-dom"

const ITINERARY_STORAGE_KEY = "trip_001_itinerary"

function ItineraryPage() {
  const currentTrip = tripDetails.trip_001

  //state declaration
  const [itinerary, setItinerary] = useState(() => {
    try {
      const savedItinerary = localStorage.getItem(ITINERARY_STORAGE_KEY)
      if (savedItinerary) {
        return JSON.parse(savedItinerary)
      }
      return currentTrip.itinerary
    } catch (error) {
      console.error("Failed to load itinerary from localStorage", error)
      return currentTrip.itinerary
    }
  })

  const [filters, setFilters] = useState({
    date: "All",
    category: "All",
    status: "All",
    priority: "All",
  })

  const [editingItem, setEditingItem] = useState(null)

  //useEffect autosave
  useEffect(() => {
    localStorage.setItem(
      ITINERARY_STORAGE_KEY,
      JSON.stringify(itinerary)
    )
  }, [itinerary])

  const stats = getItineraryStats(itinerary)
  const availableDates = getUniqueDates(itinerary)
  const filteredItinerary = filterItinerary(itinerary, filters)
  const groupedItinerary = groupItineraryByDate(filteredItinerary)
  const datesList = Object.keys(groupedItinerary).sort()
  
  //add new activity
  function handleAddActivityClick() {
    navigate("/itinerary/add")
  }
  //delete
  function handleDeleteActivity(id) {
    const confirmed = window.confirm("Do you want to delete this activity?")
    if (!confirmed) return
    setItinerary((prev) => prev.filter((activity) => activity.id !== id))
  }

  //edit
  function handleEditActivity(activity) {
    setEditingItem(activity)
  }
  function handleSaveEdit(updatedItem) {
    setItinerary((prev) =>
      prev.map((activity) =>
        activity.id === updatedItem.id ? updatedItem : activity
      )
    )

    setEditingItem(null)
  }
  function handleCancelEdit() {
    setEditingItem(null)
  }

  //filter
  function handleClearFilters() {
    setFilters({
      date: "All",
      category: "All",
      status: "All",
      priority: "All",
    })
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

        <ItineraryFilters
          filters={filters}
          setFilters={setFilters}
          availableDates={availableDates}
          onClearFilters={handleClearFilters}
          onAddActivity={handleAddActivityClick}
        />

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
              />
            ))
          )}
        </section>
      </div>
    </main>
  )
}

export default ItineraryPage