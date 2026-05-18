import React, { useState } from "react";
import {
  Calendar,
  ShoppingBag,
  CircleDollarSign,
  Wallet,
  Clock,
  TriangleAlert,
} from "lucide-react";
import BaseProgressBar from "./BaseProgressBar";

function StatCard({ 
  title, 
  value = "0", 
  subtext, type, 
  percentage, rawValue, 
  totalBudget,
  tooltipList = [],
  tooltipType, 
}) {
  const [showTooltip, setShowTooltip] = useState(false);

  const isOverBudget =
    type === "budget" &&
    typeof rawValue === "number" &&
    typeof totalBudget === "number" &&
    rawValue > totalBudget;

  const overAmount = isOverBudget ? rawValue - totalBudget : 0;

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
      colors: isOverBudget ? "bg-red-500 text-gray-100" : "bg-orange-500 text-gray-100",
      textColor: isOverBudget ? "text-red-600" : "text-orange-600",
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

  const hasTooltip =
    (type === "budget" && isOverBudget) ||
    (["unpaid", "overdue"].includes(type) && tooltipList.length > 0);

  return (
    <div
      className={`relative flex flex-col gap-3 rounded-2xl border bg-white p-5 shadow-sm transition-colors duration-300 ${
        isOverBudget ? "border-red-400 cursor-default" : "border-gray-100"
      } ${hasTooltip ? "cursor-default" : ""}`}
      onMouseEnter={() => hasTooltip && setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {/* Tooltip over budget */}
      {isOverBudget && showTooltip && (
        <div className="absolute bottom-full left-1/2 z-50 mb-2 w-56 -translate-x-1/2 rounded-lg bg-gray-900 px-3 py-2 text-xs font-medium text-white shadow-lg">
          Over budget by{" "}
          <span className="font-bold text-red-300">
            ${overAmount.toLocaleString("en-US")}
          </span>
          <div className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
        </div>
      )}

      {/* Tooltip unpaid / overdue */}
      {!isOverBudget && showTooltip && tooltipList.length > 0 && (
        <div className="absolute bottom-full left-1/2 z-50 mb-2 w-64 -translate-x-1/2 rounded-xl bg-gray-900 p-3 shadow-xl">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
            {tooltipType === "unpaid"
              ? "Unpaid Items"
              : "Overdue Activities"}
          </p>

          <div className="flex flex-col gap-1.5">
            {tooltipList.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between gap-2 rounded-lg bg-gray-800 px-2.5 py-1.5"
              >
                <span className="truncate text-xs font-medium text-white">
                  {item.name}
                </span>

                {tooltipType === "unpaid" && (
                  <span className="shrink-0 text-xs font-bold text-purple-300">
                    ${item.cost.toLocaleString("en-US")}
                  </span>
                )}

                {tooltipType === "overdue" && (
                  <span className="shrink-0 text-xs text-red-300">
                    {item.date} {item.time}
                  </span>
                )}
              </div>
            ))}
          </div>

          <div className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
        </div>
      )}

      <div className="flex items-center gap-3">
        <div className={`rounded-full p-2.5 ${colors}`}>
          <Icon size={20} strokeWidth={2.5} />
        </div>

        <div className="flex flex-col gap-2">
          {/* Title + warning icon */}
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-bold text-gray-800">{title}</span>

            {isOverBudget && (
              <TriangleAlert
                size={16}
                className="text-yellow-400"
                fill="#facc15"
                strokeWidth={2}
              />
            )}
          </div>

          <span className={`truncate text-3xl font-extrabold ${textColor}`}>
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
            isOverBudget={isOverBudget}
          />
        )}

        {subtext && (
          <span className="text-xs font-medium text-gray-500">
            {subtext}
          </span>
        )}
      </div>
    </div>
  );
}

export default StatCard;