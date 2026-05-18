import { Landmark } from "lucide-react";

const PackingTip = () => {
  return (
    <div className="mt-6 flex flex-col items-center rounded-2xl border border-slate-200 bg-white px-6 py-8 text-center shadow-sm">
      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-50">
        <Landmark size={22} className="text-blue-600" />
      </div>
      <h3 className="mb-1 text-base font-bold text-slate-800">
        Comprehensive Hanoi Prep
      </h3>
      <p className="max-w-md text-sm text-slate-400">
        Ensure you have all documents and medications packed before departure.
        Hanoi weather can be unpredictable.
      </p>
    </div>
  );
};

export default PackingTip;
