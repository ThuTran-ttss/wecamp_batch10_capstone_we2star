function FormSectionCard({ title, icon: Icon, subtitle, children, className = "" }) {
  return (
    <section
      className={`rounded-2xl border border-gray-100 bg-white p-6 shadow-sm ${className}`}
    >
      {(title || Icon) && (
        <header className="mb-6 flex flex-col gap-1">
          <div className="flex items-center gap-2">
            {Icon && <Icon size={20} className="text-blue-600" />}
            {title && (
              <h2 className="text-lg font-bold text-gray-900">{title}</h2>
            )}
          </div>
          {subtitle && (
            <p className="text-sm text-gray-500">{subtitle}</p>
          )}
        </header>
      )}

      {children}
    </section>
  );
}

export default FormSectionCard;
