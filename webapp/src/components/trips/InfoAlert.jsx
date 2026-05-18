import { Info } from "lucide-react";

function InfoAlert({ title, children, className = "" }) {
  return (
    <div
      className={`flex gap-3 rounded-xl border border-blue-100 bg-blue-50 p-4 ${className}`}
    >
      <Info size={20} className="mt-0.5 shrink-0 text-blue-500" />
      <div className="flex flex-col gap-1">
        {title && (
          <p className="text-sm font-semibold text-blue-900">{title}</p>
        )}
        <p className="text-sm text-blue-800">{children}</p>
      </div>
    </div>
  );
}

export default InfoAlert;
