function FormTextarea({
  label,
  placeholder,
  error,
  required = false,
  rows = 4,
  ...props
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-gray-700">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>

      <textarea
        rows={rows}
        placeholder={placeholder}
        {...props}
        className={`w-full resize-none rounded-xl bg-white px-4 py-3 text-sm shadow outline-none ${
          error ? "ring-2 ring-red-400" : ""
        }`}
      />

      {error && (
        <div className="mt-2 flex items-center gap-2 text-sm text-red-500">
          <span className="h-2 w-2 rounded-full bg-red-500" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}

export default FormTextarea;
