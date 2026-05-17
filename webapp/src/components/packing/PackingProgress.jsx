import { Package, AlertCircle } from "lucide-react";

const PackingProgress = ({ totalCount, packedCount, requiredUnpackedCount }) => {
  const percentage = totalCount > 0 ? Math.round((packedCount / totalCount) * 100) : 0;

  const getMessage = () => {
    if (percentage === 100) return "All packed! You're ready to go! 🎉";
    if (percentage >= 75) return "Almost there! Just a few more items.";
    if (percentage >= 50) return "Keep it up! You're almost ready for Hanoi.";
    if (percentage >= 25) return "Good start! Keep packing.";
    return "Let's start packing for your trip!";
  };

  return (
    <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-stretch">
      {/* Progress Section */}
      <div className="flex flex-1 items-center gap-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="flex-1">
          <h2 className="mb-1 text-lg font-bold text-slate-800">
            Packing Progress
          </h2>
          <p className="mb-3 text-sm text-slate-400">{getMessage()}</p>

          {/* Progress Bar */}
          <div className="h-3 w-full overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-blue-600 transition-all duration-500 ease-out"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        {/* Percentage */}
        <div className="text-4xl font-bold text-blue-600">{percentage}%</div>
      </div>

      {/* Required Items Left Card */}
      <div className="flex min-w-[220px] items-center gap-4 rounded-2xl border border-teal-100 bg-teal-50 p-6 shadow-sm">
        <div className="flex-1">
          <p className="mb-1 text-xs font-semibold tracking-wide text-teal-600">
            Required items left
          </p>
          <p className="text-4xl font-bold text-teal-700">
            {requiredUnpackedCount}
          </p>
          <p className="mt-1 text-xs font-medium text-teal-500">
            Priority Focus
          </p>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-100">
          <AlertCircle size={24} className="text-teal-600" />
        </div>
      </div>
    </div>
  );
};

export default PackingProgress;
