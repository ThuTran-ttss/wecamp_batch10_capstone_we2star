import React from "react";

const ActivityInput = ({
  label,
  placeholder,
  error,
  icon: Icon,
  required = false,
  type = "text",
  ...props
}) => {
  return (
    <div className="">
      {/* LABEL */}
      <label className="mb-2 block text-sm font-semibold text-gray-700">
        {label}

        {required && <span className="text-red-500"> *</span>}
      </label>

      {/* INPUT */}
      <div
        className={`flex items-center rounded-xl bg-white px-4 py-2 shadow ${
          error ? "border-red-400" : ""
        }`}
      >
        {Icon && <Icon size={18} className="mr-3 text-gray-400" />}

        <input
          type={type}
          placeholder={placeholder}
          {...props}
          className="w-full bg-white text-sm outline-none"
        />
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

export default ActivityInput;
