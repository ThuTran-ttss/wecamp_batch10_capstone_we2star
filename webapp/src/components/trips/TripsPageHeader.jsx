function TripsPageHeader({
  title = "My trips",
  userName = "Explorer",
  avatarUrl,
  activeTripCount,
  className = "",
}) {
  const initials = userName.slice(0, 1).toUpperCase();

  return (
    <header
      className={`flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between ${className}`}
    >
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
          {title}
        </h1>
        <div>
          <h2 className="text-xl font-bold text-gray-900 md:text-2xl">
            Welcome back, {userName}!
          </h2>
          <p className="mt-1 max-w-2xl text-sm text-gray-500 md:text-base">
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
        </div>
      </div>

      <div
        className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-white bg-gray-200 shadow-md ring-2 ring-blue-100"
        aria-hidden
      >
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt=""
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="text-sm font-bold text-gray-600">{initials}</span>
        )}
      </div>
    </header>
  );
}

export default TripsPageHeader;
