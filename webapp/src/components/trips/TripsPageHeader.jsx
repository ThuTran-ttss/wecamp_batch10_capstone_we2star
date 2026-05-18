function TripsPageHeader({
  userName = "Explorer",
  activeTripCount,
  className = "",
}) {
  return (
    <header className={`flex flex-col gap-2 ${className}`}>
      <h2 className="text-xl font-bold text-gray-900 md:text-2xl">
        Welcome back, {userName}!
      </h2>
      <p className="max-w-2xl text-sm text-gray-500 md:text-base">
        {typeof activeTripCount === "number" ? (
          <>
            You have{" "}
            <span className="font-semibold text-gray-700">
              {activeTripCount} active journeys
            </span>
            . Plan your adventures, track activities, and never miss a
            landmark.
          </>
        ) : (
          "Plan your adventures, track activities, and never miss a landmark."
        )}
      </p>
    </header>
  );
}

export default TripsPageHeader;
