import {
  Plane,
  Bed,
  Utensils,
  ShoppingBag,
  Ticket,
  Package,
} from "lucide-react";

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

  const percent = Math.round((used / budget) * 100);

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

    return activityDate < now;
  }).length;

  return overdueCount;
}

export function calculateBudgetCat(budgetItems = [], totalBudget = 0) {
  const categoryDictionary = {
    Transport: { icon: Plane, cost: 0 },
    Accommodation: { icon: Bed, cost: 0 },
    Food: { icon: Utensils, cost: 0 },
    Shopping: { icon: ShoppingBag, cost: 0 },
    Activity: { icon: Ticket, cost: 0 },
    Other: { icon: Package, cost: 0 },
  };

  let totalActualUsed = 0;

  budgetItems.forEach((item) => {
    const actualCost = item.actualCost;

    const cat = item.category;

    if (categoryDictionary[cat]) {
      categoryDictionary[cat].cost += actualCost;
    }
    totalActualUsed += actualCost;
  });

  const categoryStats = Object.keys(categoryDictionary).map((key) => {
    const item = categoryDictionary[key];

    const percent =
      totalBudget > 0 ? Math.round((item.cost / totalBudget) * 100) : 0;

    return {
      name: key,
      icon: item.icon,
      cost: item.cost,
      percent: percent,
    };
  });

  const remainingBudget = Math.max(totalBudget - totalActualUsed, 0);

  return {
    categoryStats,
    totalUsed: totalActualUsed,
    remainingBudget,
  };
}


export function calculateUnpaidItems(budgetItems = []) {

  const unpaidItems = budgetItems.filter(
    (item) => item.paymentStatus === "Unpaid",
  );

  const unpaidAmount = unpaidItems.reduce((sum, item) => {
    const itemCost =
      item.actualCost > 0 ? item.actualCost : item.estimatedCost || 0;
    return sum + itemCost;
  }, 0);

  return {
    count: unpaidItems.length,
    amount: unpaidAmount,
  };
}

// Unpaid Budget Items
export function getUnpaidItemsList(budgetItems = []) {
  return budgetItems
    .filter((item) => item.paymentStatus === "Unpaid")
    .map((item) => ({
      name: item.name,
      cost: item.actualCost > 0 ? item.actualCost : item.estimatedCost || 0,
    }));
}

// Overdue Activities
export function getOverdueActivitiesList(activities = []) {
  const now = new Date();
  return activities
    .filter((activity) => {
      if (activity.status === "Done") return false;
      const timeString = activity.time || "00:00";
      const activityDate = new Date(`${activity.date}T${timeString}:00`);
      return activityDate < now;
    })
    .map((activity) => ({
      name: activity.name,
      date: activity.date,
      time: activity.time || "00:00",
    }));
}
