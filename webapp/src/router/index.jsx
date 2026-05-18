import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";

import AddActivity from "@pages/itinerary/AddActivity";
import MainLayout from "@/layouts/MainLayout";
import ItineraryPage from "@/pages/itinerary/ItineraryPage";
import DashboardPage from "@/pages/DashboardPage";
import BudgetPage from "@/pages/BudgetPage";
import PackingListPage from "@/pages/PackingListPage";
import MyTripsPage from "@/pages/trips/MyTripsPage";
import CreateTripPage from "@/pages/trips/CreateTripPage";

const CREATE_TRIP_BREADCRUMBS = [
  { label: "My Trips", to: "/trips" },
  { label: "Create New Trip" },
];

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: "trips",
        element: <MyTripsPage />,
        handle: { navTitle: "My trips" },
      },
      {
        path: "trips/new",
        element: <CreateTripPage />,
        handle: { navBreadcrumbs: CREATE_TRIP_BREADCRUMBS },
      },
      {
        path: "itinerary",
        element: <ItineraryPage />,
      },
      {
        path: "itinerary/add-activity",
        element: <AddActivity />,
      },
      {
        path: "dashboard",
        element: <DashboardPage />,
      },
      {
        path: "budget",
        element: <BudgetPage />,
      },
      {
        path: "packing",
        element: <PackingListPage />,
      },
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
