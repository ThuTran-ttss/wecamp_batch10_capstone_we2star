import React from "react";
import { ChevronDown } from "lucide-react";

const ActivitySelect = ({
  label,
  options = [],
  required = false,
  error,
  ...props
}) => {
  return (
    <div>
      {/* LABEL */}
      <label className="mb-2 block text-sm font-semibold text-gray-700">
        {label}

        {required && <span className="text-red-500"> *</span>}
      </label>

      {/* SELECT */}
      <div
        className={`flex items-center rounded-xl border px-4 py-2 ${
          error ? "border-red-400" : "border-gray-300"
        }`}
      >
        <select
          {...props}
          className="w-full appearance-none bg-transparent text-sm outline-none"
        >
          <option value="">Select {label.toLowerCase()}</option>

          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <ChevronDown size={18} className="text-gray-400" />
      </div>

      {/* ERROR */}
      {error && (
        <div className="mt-2 flex items-center gap-2 text-sm text-red-500">
          <div className="h-2 w-2 rounded-full bg-red-500" />

          <span>{error}</span>
        </div>
      )} 
    </div>
  );
};

export default ActivitySelect;
