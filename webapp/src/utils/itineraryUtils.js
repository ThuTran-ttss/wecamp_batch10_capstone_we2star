//check if activity is overdue
export function isOverdueActivity(activity) {
  if (!activity.date || !activity.time) return false;
  const now = new Date();
  const activityDateTime = new Date(`${activity.date}T${activity.time}`)
  return activityDateTime < now && activity.status !== "Done"
}

//use for filter button
export function filterItinerary(itinerary, filters) {
  return itinerary.filter((activity) => {
    const matchDate = filters.date === "All" || activity.date === filters.date;
    const matchCategory = filters.category === "All" || activity.category === filters.category;
    const matchStatus = filters.status === "All" || activity.status === filters.status;
    const matchPriority = filters.priority === "All" || activity.priority === filters.priority;
    return matchDate && matchCategory && matchStatus && matchPriority;
  })
}

// use for grouping activity
export function groupItineraryByDate(itinerary) {
  return itinerary.reduce((result, activity) => {
    if (!result[activity.date]) {
      result[activity.date] = [];
    }
    result[activity.date].push(activity);
    return result;

  }, {})
}

//use to calculate stats
export function getItineraryStats(itinerary) {
  const totalActivities = itinerary.length;
  let completedActivities = 0;
  let overdueActivities = 0;

  for (let i = 0; i < totalActivities; i++) {
    const activity = itinerary[i];
    if (activity.status === "Done") {
      completedActivities++;
    }
    if (isOverdueActivity(activity)) {
      overdueActivities++;
    }
  }
  const totalDays = new Set(
    itinerary.map((activity) => activity.date)
  ).size;
  return {
    totalActivities,
    completedActivities,
    overdueActivities,
    totalDays
  }
}

//use for filter date
export function getUniqueDates(itinerary) {
  const uniqueDateList = new Set(
    itinerary.map(activity => activity.date)
  );
  return [...uniqueDateList].sort();
}
// use for dropdown filter or button
export function formatShortDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric"
  })
}
//use for date appearance
export function formatFullDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-US", {
    weekday: "short",
    month: "long",
    day: "numeric",
    year: "numeric"
  })
}

export function getWeekday(dateString) {
  return new Date(dateString).toLocaleDateString("en-US", {
    weekday: "short"
  })
}

//Use to validate Edit Activity form 
export function validateItineraryForm(formData) {
  const errors = {}

  if (!formData.title.trim()) {
    errors.title = "Title is required"
  }

  if (!formData.location.trim()) {
    errors.location = "Location is required"
  }

  if (!formData.date) {
    errors.date = "Date is required"
  }

  if (!formData.time) {
    errors.time = "Time is required"
  }

  if (!formData.category) {
    errors.category = "Category is required"
  }

  if (!formData.priority) {
    errors.priority = "Priority is required"
  }

  if (!formData.status) {
    errors.status = "Status is required"
  }

  return errors
}