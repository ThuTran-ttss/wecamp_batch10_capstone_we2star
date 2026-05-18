import React from "react";
import { Link } from "react-router-dom";
import { ClipboardList, AlertTriangle, ChevronRight } from "lucide-react";

function StatRow({ label, packed, total }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm font-medium text-gray-600">{label}</span>
      <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
        {packed} / {total} packed
      </span>
    </div>
  );
}

function PackingProgress({ packingData = [] }) {
  
  const requiredItems = packingData.filter((i) => i.required === "Yes");
  const optionalItems = packingData.filter((i) => i.required === "No");

  const requiredPacked = requiredItems.filter((i) => i.packed === "Yes").length;
  const optionalPacked = optionalItems.filter((i) => i.packed === "Yes").length;

  // Các item bắt buộc nhưng chưa pack
  const missingRequired = requiredItems.filter((i) => i.packed === "No");

  return (
    <div className="flex flex-col gap-5 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* <ClipboardList size={20} className="text-gray-700" /> */}
          <h2 className="text-lg font-bold text-gray-900">Packing Progress</h2>
        </div>
        <Link
          to="/packing"
          className="flex items-center gap-1 text-sm font-semibold text-blue-500 hover:text-blue-700"
        >
          View Details <ChevronRight size={16} />
        </Link>
      </div>

      {/* Stat rows */}
      <div className="flex flex-col gap-3">
        <StatRow
          label="Required"
          packed={requiredPacked}
          total={requiredItems.length}
        />
        <StatRow
          label="Optional"
          packed={optionalPacked}
          total={optionalItems.length}
        />
      </div>

      {/* Missing required items alert*/}
      {missingRequired.length > 0 && (
        <div className="rounded-xl bg-red-50 p-4">
          <div className="mb-3 flex items-center gap-2">
            <div className="rounded-full bg-red-100 p-1.5 text-red-500">
              <AlertTriangle size={14} strokeWidth={2.5} />
            </div>
            <span className="text-sm font-bold text-red-700">
              Missing Required Items
            </span>
          </div>
          <ul className="flex flex-col gap-2 pl-4">
            {missingRequired.map((item) => (
              <li key={item.id} className="text-sm font-medium text-gray-700">
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Empty state*/}
      {packingData.length === 0 && (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <ClipboardList size={36} className="mb-2 text-gray-200" strokeWidth={1.5} />
          <p className="text-sm font-bold text-gray-600">No packing items yet</p>
          <p className="mt-1 text-xs font-medium text-gray-400">
            Items added to your packing list will appear here.
          </p>
        </div>
      )}

    </div>
  );
}

export default PackingProgress;