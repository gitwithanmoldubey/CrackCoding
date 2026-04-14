import { Link, useLocation } from "react-router";
import {
  BookOpenIcon,
  LayoutDashboardIcon,
  MoonIcon,
  SparklesIcon,
  SunIcon,
} from "lucide-react";
import { UserButton } from "@clerk/clerk-react";
import { useTheme } from "../context/ThemeContext";

function Navbar() {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 border-b border-base-300/60 bg-base-100/80 shadow-lg backdrop-blur-xl">
      <div className="max-w-7xl mx-auto p-4 flex items-center justify-between">
        {/* LOGO */}
        <Link
          to="/"
          className="group flex items-center gap-3 hover:scale-105 transition-transform duration-200"
        >
          <div className="size-10 rounded-xl bg-gradient-to-r from-primary via-secondary to-accent flex items-center justify-center shadow-lg ">
            <SparklesIcon className="size-6 text-white" />
          </div>

          <div className="flex flex-col">
            <span className="font-black text-xl bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent font-mono tracking-wider">
              LetsCode
            </span>
            <span className="text-xs text-base-content/60 font-medium -mt-1">Collaborate Smarter</span>
          </div>
        </Link>

        <div className="flex items-center gap-1">
          {/* PROBLEMS PAGE LINK */}
          <Link
            to={"/problems"}
            className={`px-4 py-2.5 rounded-lg transition-all duration-200 
              ${
                isActive("/problems")
                  ? "bg-primary text-primary-content"
                  : "hover:bg-base-200 text-base-content/70 hover:text-base-content"
              }
              
              `}
          >
            <div className="flex items-center gap-x-2.5">
              <BookOpenIcon className="size-4" />
              <span className="font-medium hidden sm:inline">Problems</span>
            </div>
          </Link>

          {/* DASHBORD PAGE LINK */}
          <Link
            to={"/dashboard"}
            className={`px-4 py-2.5 rounded-lg transition-all duration-200 
              ${
                isActive("/dashboard")
                  ? "bg-primary text-primary-content"
                  : "hover:bg-base-200 text-base-content/70 hover:text-base-content"
              }
              
              `}
          >
            <div className="flex items-center gap-x-2.5">
              <LayoutDashboardIcon className="size-4" />
              <span className="font-medium hidden sm:inline">Dashbord</span>
            </div>
          </Link>

          <button
            type="button"
            onClick={toggleTheme}
            className="btn btn-ghost btn-sm ml-2 gap-2 border border-base-300 bg-base-100/70 text-base-content hover:bg-base-200"
          >
            {theme === "light" ? <MoonIcon className="size-4" /> : <SunIcon className="size-4" />}
            <span className="hidden md:inline">{theme === "light" ? "Dark Mode" : "Light Mode"}</span>
          </button>

          <div className="ml-3 mt-2">
            <UserButton />
          </div>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
