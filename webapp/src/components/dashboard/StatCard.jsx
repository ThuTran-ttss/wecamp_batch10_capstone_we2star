import React from "react";
import {
  Calendar,
  ShoppingBag,
  CircleDollarSign,
  Wallet,
  Clock,
} from "lucide-react";
import BaseProgressBar from "./BaseProgressBar";

function StatCard({ title, value = "0", subtext, type, percentage }) {
  const config = {
    itinerary: {
      colors: "bg-blue-500 text-gray-100",
      textColor: "text-blue-600",
      progressColor: "bg-blue-600",
      Icon: Calendar,
    },
    packing: {
      colors: "bg-green-500 text-gray-100",
      textColor: "text-green-600",
      progressColor: "bg-green-600",
      Icon: ShoppingBag,
    },
    budget: {
      colors: "bg-orange-500 text-gray-100",
      textColor: "text-orange-600",
      progressColor: "bg-orange-500",
      Icon: CircleDollarSign,
    },
    unpaid: {
      colors: "bg-purple-500 text-gray-100",
      textColor: "text-purple-600",
      Icon: Wallet,
    },
    overdue: {
      colors: "bg-red-500 text-gray-100",
      textColor: "text-red-600",
      Icon: Clock,
    },
  };

  const currentConfig = config[type];
  const { Icon, colors, progressColor, textColor } = currentConfig;
  const isValidPercentage =
    typeof percentage === "number" && !isNaN(percentage);
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <div className={`rounded-full p-2.5 ${colors}`}>
          <Icon size={20} strokeWidth={2.5} />
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-sm font-bold text-gray-800">{title}</span>
          <span className={`text-3xl font-extrabold ${textColor} truncate`}>
            {value ?? "0"}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {isValidPercentage && (
          <BaseProgressBar
            percentage={percentage}
            colorClass={progressColor}
            heightClass="h-1.5"
          />
        )}
        {subtext && (
          <span className="text-xs font-medium text-gray-500">{subtext}</span>
        )}
      </div>
    </div>
  );
}

export default StatCard;
