import { Link } from "react-router-dom";
import StatCard from "@/components/dashboard/StatCard";
import BudgetOverview from "@/components/dashboard/BudgetOverview";
import UpcomingItinerary from "@/components/dashboard/UpcomingItinerary";
import PackingProgress from "@/components/dashboard/PackingProgress";
import {
  calculateItineraryStats,
  calculatePackingStats,
  calculateBudgetStats,
  calculateBudgetUnpaid,
  calculateOverdueActivities,
  calculateBudgetCat,
  getUnpaidItemsList,
  getOverdueActivitiesList,
} from "@/utils/dashboardUtils";
import useCurrentTrip from "@/hooks/useCurrentTrip";
import { formatTripDateRange } from "@/utils/tripsUtils";

function DashboardPage() {
  const { trip } = useCurrentTrip();

  if (!trip) {
    return (
      <div className="mx-auto max-w-7xl p-8 text-center">
        <p className="text-gray-500">Trip not found.</p>
        <Link
          to="/trips"
          className="mt-4 inline-block text-sm font-semibold text-blue-600 hover:text-blue-700"
        >
          Back to My Trips
        </Link>
      </div>
    );
  }

  const itineraryStats = calculateItineraryStats(trip.itinerary);
  const packingStats = calculatePackingStats(trip.packingList);
  const budgetStats = calculateBudgetStats(trip.budgetItems, trip.budget);
  const unpaidStats = calculateBudgetUnpaid(trip.budgetItems);
  const overdueStats = calculateOverdueActivities(trip.itinerary);
  const budgetCatInfo = calculateBudgetCat(trip.budgetItems, trip.budget);
  const unpaidItemsList = getUnpaidItemsList(trip.budgetItems);
  const overdueList = getOverdueActivitiesList(trip.itinerary);
  const dateRange = formatTripDateRange(trip.startDate, trip.endDate);

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 p-4 md:p-6 lg:p-8">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
            {trip.tripName}
          </h1>
          <p className="text-sm font-medium text-gray-500">
            {dateRange} • {trip.tripType} trip
          </p>
        </div>
        <Link
          to="/trips"
          className="text-sm font-semibold text-blue-600 hover:text-blue-700"
        >
          ← All trips
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
        <StatCard
          title="Itinerary Completed"
          value={`${itineraryStats.percent}%`}
          percentage={itineraryStats.percent}
          subtext={`${itineraryStats.completed} of ${itineraryStats.total} activities completed`}
          type="itinerary"
        />
        <StatCard
          title="Packing Completed"
          value={`${packingStats.percent}%`}
          percentage={packingStats.percent}
          subtext={`${packingStats.packed} of ${packingStats.total} items packed`}
          type="packing"
        />
        <StatCard
          title="Budget Used"
          value={`${budgetStats.percent}%`}
          percentage={budgetStats.percent}
          subtext={`$${budgetStats.used.toLocaleString("en-US")} of $${trip.budget.toLocaleString("en-US")} used`}
          type="budget"
          rawValue={budgetStats.used}
          totalBudget={trip.budget}
        />
        <StatCard
          title="Unpaid Budget Items"
          value={unpaidStats.unpaid}
          subtext={`${unpaidStats.amount.toLocaleString("en-US")} pending payment`}
          type="unpaid"
          tooltipList={unpaidItemsList}
          tooltipType="unpaid"
        />
        <StatCard
          title="Overdue Activities"
          value={`${overdueStats}`}
          subtext="Requires your attention"
          type="overdue"
          tooltipList={overdueList}
          tooltipType="overdue"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <UpcomingItinerary
            itineraryData={trip.itinerary || []}
            tripStartDate={trip.startDate}
          />
        </div>
        <div className="lg:col-span-3">
          <PackingProgress packingData={trip.packingList || []} />
        </div>
        <div className="lg:col-span-4">
          <BudgetOverview
            totalBudget={trip.budget}
            remainingBudget={budgetCatInfo.remainingBudget}
            unpaidItemsCount={unpaidStats.unpaid}
            unpaidAmount={unpaidStats.amount}
            categoryStats={budgetCatInfo.categoryStats}
          />
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
