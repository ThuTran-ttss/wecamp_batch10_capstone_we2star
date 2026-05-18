import { useMatches } from "react-router-dom";
import Breadcrumbs from "@/components/trips/Breadcrumbs";

function getNavConfig(matches) {
  for (let i = matches.length - 1; i >= 0; i -= 1) {
    const handle = matches[i]?.handle;

    if (handle?.navBreadcrumbs || handle?.navTitle) {
      return handle;
    }
  }

  return null;
}

function Navbar() {
  const matches = useMatches();
  const nav = getNavConfig(matches);

  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-gray-100 bg-white px-6">
      <div className="min-w-0 flex-1">
        {nav?.navBreadcrumbs ? (
          <Breadcrumbs items={nav.navBreadcrumbs} />
        ) : nav?.navTitle ? (
          <h1 className="truncate text-lg font-bold text-gray-900">
            {nav.navTitle}
          </h1>
        ) : null}
      </div>
    </header>
  );
}

export default Navbar;
