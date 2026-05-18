import React from "react";
import { useState, useEffect } from "react";
import StatCard from "@/components/dashboard/StatCard";
import BudgetOverview from "@/components/dashboard/BudgetOverview";
import UpcomingItinerary from "@/components/dashboard/UpcomingItinerary";
import PackingProgress from "@/components/dashboard/PackingProgress";
import { tripDetails } from "@/mock_data";
import {
  calculateItineraryStats,
  calculatePackingStats,
  calculateBudgetStats,
  calculateBudgetUnpaid,
  calculateOverdueActivities,
  calculateBudgetCat,
} from "@/utils/dashboardUtils";

function DashboardPage() {
  const currentTripId = "trip_001";
  const [tripData, setTripData] = useState(() => {
    try {
      const savedTrips = localStorage.getItem("tripDetails");

      if (savedTrips) {
        const parsedTrips = JSON.parse(savedTrips);

        return parsedTrips[currentTripId] || tripDetails[currentTripId];
      }

      return tripDetails[currentTripId];
    } catch (error) {
      console.error("Failed to parse trip details from localStorage:", error);
      return tripDetails[currentTripId];
    }
  });

  if (!tripData) {
    return <div className="p-8 text-center text-gray-500">Loading data...</div>;
  }

  // Calculate statistics
  const itineraryStats = calculateItineraryStats(tripData.itinerary);
  const packingStats = calculatePackingStats(tripData.packingList);
  const budgetStats = calculateBudgetStats(
    tripData.budgetItems,
    tripData.budget,
  );
  const unpaidStats = calculateBudgetUnpaid(tripData.budgetItems);
  const overdueStats = calculateOverdueActivities(tripData.itinerary);

  // Budget Overview
  const budgetCatInfo = calculateBudgetCat(
    tripData.budgetItems,
    tripData.budget,
  );

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 p-4 md:p-6 lg:p-8">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
            {tripData.tripName}
          </h1>
          <button className="text-gray-400 transition-colors hover:text-gray-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4 Z" />
            </svg>
          </button>
        </div>
        <p className="text-sm font-medium text-gray-500">
          {tripData.startDate} - {tripData.endDate} • {tripData.tripType} trip
        </p>
      </div>

      {/*Row 1: KPI Stat Cards */}

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
          subtext={`$${budgetStats.used.toLocaleString("en-US")} of $${tripData.budget.toLocaleString("en-US")} used`}
          type="budget"
        />
        <StatCard
          title="Unpaid Budget Items"
          value={unpaidStats.unpaid}
          subtext={`${unpaidStats.amount.toLocaleString("en-US")} pending payment`}
          type="unpaid"
        />
        <StatCard
          title="Overdue Activities"
          value={`${overdueStats}`}
          subtext="Requires your attention"
          type="overdue"
        />
      </div>

      {/* Row 2: Khối logic */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <UpcomingItinerary
            itineraryData={tripData.itinerary || []}
            tripStartDate={tripData.startDate}/>
        </div>

        <div className="lg:col-span-3">
          <PackingProgress packingData={tripData.packingList || []} />
        </div>

        <div className="lg:col-span-4">
          <BudgetOverview
            totalBudget={tripData.budget}
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
