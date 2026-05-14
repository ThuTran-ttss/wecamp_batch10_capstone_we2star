import React from "react";

const colorClasses = {
  green: {
    bg: "bg-green-100",
    text: "text-green-600",
  },

  purple: {
    bg: "bg-purple-100",
    text: "text-purple-600",
  },
};

const ActivityToggleCard = ({
  icon: Icon,
  title,
  description,
  color = "green",
  enabled,
  onToggle,
}) => {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-white px-5 py-4 shadow">
      {/* LEFT */}
      <div className="flex items-start gap-4">
        {/* ICON */}
        <div className={`rounded-xl p-3 ${colorClasses[color].bg}`}>
          <Icon size={20} className={colorClasses[color].text} />
        </div>

        {/* CONTENT */}
        <div>
          <h3 className="font-semibold text-gray-800">
            {title}

            <span className="font-normal text-gray-400"> (Optional)</span>
          </h3>

          <p className="mt-1 text-sm text-gray-500">{description}</p>
        </div>
      </div>

      {/* TOGGLE */}
      <button
        type="button"
        onClick={onToggle}
        className={`relative h-6 w-11 rounded-full transition cursor-pointer ${
          enabled ? "bg-blue-500" : "bg-gray-200"
        }`}
      >
        <div
          className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition ${
            enabled ? "left-6" : "left-1"
          }`}
        />
      </button>
    </div>
  );
};

export default ActivityToggleCard;
