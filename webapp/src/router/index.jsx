import { createBrowserRouter, RouterProvider } from "react-router-dom";

import AddActivity from "@pages/itinerary/AddActivity";
import MainLayout from "@/layouts/MainLayout";
import ItineraryPage from "@/pages/itinerary/ItineraryPage";
import DashboardPage from "@/pages/DashboardPage";
import BudgetPage from "@/pages/BudgetPage";
import PackingListPage from "@/pages/PackingListPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,

    children: [
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

