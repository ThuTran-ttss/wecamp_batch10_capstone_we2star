import React from "react";

const RadioButton = ({ label, name, options = [], register }) => {
  return (
    <div>
      <p className="mb-3 text-sm font-semibold text-gray-700">{label}</p>

      <div className="flex gap-5">
        {options.map((option) => (
          <label
            key={option.value}
            className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer"
          >
            <input
              type="radio"
              value={option.value}
              {...register(name)}
              className="accent-blue-600"
            />

            <span>{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default RadioButton;
