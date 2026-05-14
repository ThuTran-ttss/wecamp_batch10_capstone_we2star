import React, { useState } from "react";

import { Menu } from "lucide-react";

const Sidebar = () => {
  const [open, setOpen] = useState(true);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="absolute top-6 right-4 z-50 bg-white p-2 shadow-md"
      >
        <Menu size={18} />
      </button>

      <aside
        className={`flex h-screen flex-col justify-between border-r bg-white transition-all duration-300 ${open ? "w-56" : "w-16"}`}
      ></aside>
    </div>
  );
};

export default Sidebar;
