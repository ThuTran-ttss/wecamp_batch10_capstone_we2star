import React, { Children } from "react";

function BaseProgressBar({
  percentage,
  colorClass = "bg-blue-600",
  bgClass = "bg-gray-100",
  heightClass = "h-1.5",
  textInside,
}) {
  const validPercentage = Math.min(Math.max(percentage, 0), 100);

  return (
    <div
      className={`relative w-full overflow-hidden rounded-full ${bgClass} ${heightClass}`}
    >
      <div
        className={`absolute top-0 left-0 h-full transition-all duration-500 ease-out ${colorClass}`}
        style={{ width: `${validPercentage}%` }}
      />

      {textInside && (
        <div className="insert-0 absolute z-10 flex items-center justify-center text-xs font-medium text-gray-800">
          {textInside}
        </div>
      )}
    </div>
  );
}

export default BaseProgressBar;
