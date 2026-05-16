export function calculateItineraryStats(activities = []) {
  if (activities.length === 0) return { completed: 0, total: 0, percent: 0 };

  const completed = activities.filter((act) => act.status === "Done").length;
  const total = activities.length;
  const percent = Math.round((completed / total) * 100);

  return { completed, total, percent };
}

export function calculatePackingStats(packingItems = []) {
  if (packingItems.length === 0) return { packed: 0, percent: 0, total: 0 };

  const total = packingItems.length;
  const packed = packingItems.filter((item) => item.packed === "Yes").length;
  const percent = Math.round((packed / total) * 100);
  return { packed, percent, total };
}

export function calculateBudgetStats(budgetList = [], budget) {
  if (budgetList.length === 0) return { used: 0, percent: 0 };

  const used = budgetList.reduce((acc, item) => acc + item.actualCost, 0);

  const percent = Math.min(Math.round((used / budget) * 100), 100);

  return { used, percent };
}

export function calculateBudgetUnpaid(budgetList = []) {
  if (budgetList.length === 0) return { unpaid: 0, amount: 0 };

  const unpaid = budgetList.filter(
    (item) => item.paymentStatus === "Unpaid",
  ).length;

  const amount = budgetList
    .filter((item) => item.paymentStatus === "Unpaid")
    .reduce((arr, item) => arr + item.actualCost, 0);

  return { unpaid, amount };
}

export function calculateOverdueActivities(activities = []) {
  if (!Array.isArray(activities) || activities.length === 0) return 0;

  const now = new Date();

  const overdueCount = activities.filter((activity) => {
    if (activity.status === "Done") {
      return false;
    }

    const timeString = activity.time ? activity.time : "00:00";
    const activityDateTimeString = `${activity.date}T${timeString}:00`;

    const activityDate = new Date(activityDateTimeString);
    console.log(activityDate);

    return activityDate < now;
  }).length;

  return overdueCount;
}
