function AppFooter({ className = "" }) {
  const year = new Date().getFullYear();

  return (
    <footer
      className={`flex flex-col gap-4 border-t border-gray-100 pt-6 text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between ${className}`}
    >
      <p>© {year} Trip Planner Pro. All rights reserved.</p>

      <nav className="flex flex-wrap gap-4">
        {["Terms", "Privacy", "Support"].map((link) => (
          <button
            key={link}
            type="button"
            className="font-medium transition hover:text-blue-600"
          >
            {link}
          </button>
        ))}
      </nav>
    </footer>
  );
}

export default AppFooter;
