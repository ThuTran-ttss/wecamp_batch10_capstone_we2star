import React from "react";

const RadioButton = ({ label, name, options = [], register }) => {
  return (
    <div>
      {/* LABEL */}
      <label className="mb-3 block text-sm font-semibold text-gray-700">
        {label}
      </label>

      {/* OPTIONS */}
      <div className="flex gap-5">
        {options.map((option) => (
          <label
            key={option.value}
            className="flex items-center gap-2 text-sm text-gray-700"
          >
            <input
              type="radio"
              value={option.value}
              {...register(name)}
              className="accent-blue-600"
            />

            {option.label}
          </label>
        ))}
      </div>
    </div>
  );
};

export default RadioButton;
