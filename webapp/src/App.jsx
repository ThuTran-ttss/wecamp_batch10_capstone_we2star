import { ToastContainer } from "react-toastify";
import AppRouter from "./router";
import ItineraryPage from "./pages/itinerary/ItineraryPage";
import { tripDetails } from "./mock_data";
import { useEffect } from "react";
function App() {
  useEffect(() => {
    const savedTrips = localStorage.getItem("tripDetails");

    if (!savedTrips) {
      localStorage.setItem("tripDetails", JSON.stringify(tripDetails));
    }
  }, []);
  return (
    <>
      <AppRouter />
      <ToastContainer />
    </>
  );
}

export default App;
