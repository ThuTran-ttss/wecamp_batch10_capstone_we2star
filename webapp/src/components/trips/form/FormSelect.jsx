import { ChevronDown } from "lucide-react";

function FormSelect({
  label,
  options = [],
  error,
  required = false,
  icon: Icon,
  ...props
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-gray-700">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>

      <div
        className={`relative flex items-center rounded-xl bg-white px-4 py-2 shadow ${
          error ? "ring-2 ring-red-400" : ""
        }`}
      >
        {Icon && <Icon size={18} className="mr-3 shrink-0 text-gray-400" />}

        <select
          {...props}
          className="w-full appearance-none bg-white pr-8 text-sm outline-none"
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <ChevronDown
          size={18}
          className="pointer-events-none absolute right-4 text-gray-400"
        />
      </div>

      {error && (
        <div className="mt-2 flex items-center gap-2 text-sm text-red-500">
          <span className="h-2 w-2 rounded-full bg-red-500" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}

export default FormSelect;
