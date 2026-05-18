import { ToastContainer } from "react-toastify";
import AppRouter from "./router";
import { getInitialTripDetails } from "./mock_data";
import { STORAGE_KEYS } from "./constants/trips";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    const savedTrips = localStorage.getItem(STORAGE_KEYS.TRIP_DETAILS);

    if (!savedTrips) {
      localStorage.setItem(
        STORAGE_KEYS.TRIP_DETAILS,
        JSON.stringify(getInitialTripDetails()),
      );
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
