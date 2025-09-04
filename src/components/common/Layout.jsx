import { useState, useEffect, useRef } from "react";
import { NavLink, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import { logout } from "../../api/api";
import {
  HiOutlineMenu,
  HiOutlineX,
  HiOutlineViewGrid,
  HiOutlineCalendar,
  HiOutlineUsers,
  HiOutlineCog,
  HiOutlineQrcode,
  HiOutlineUser,
  HiOutlineChevronDown,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
} from "react-icons/hi";
import logo from "../../assets/logo.svg";
import { useNavigate } from "react-router-dom";

// Icon Components
const IconDashboard = ({ color = "#000", className = "" }) => (
  <HiOutlineViewGrid className={`w-6 h-6 ${className}`} style={{ color }} />
);
const Events = ({ color = "#000", className = "" }) => (
  <HiOutlineCalendar className={`w-6 h-6 ${className}`} style={{ color }} />
);
const RegisteredUsers = ({ color = "#000", className = "" }) => (
  <HiOutlineUsers className={`w-6 h-6 ${className}`} style={{ color }} />
);
const Configuration = ({ color = "#000", className = "" }) => (
  <HiOutlineCog className={`w-6 h-6 ${className}`} style={{ color }} />
);

const NAVIGATION_ITEMS = [
  { path: "/dashboard", label: "Dashboard", icon: IconDashboard, end: true },
  { path: "/dashboard/events", label: "Events", icon: Events },
  {
    path: "/dashboard/registered-users",
    label: "Registered Users",
    icon: RegisteredUsers,
  },
  { path: "/dashboard/config", label: "Configuration", icon: Configuration },
];

export default function Layout() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDesktopSidebarCollapsed, setIsDesktopSidebarCollapsed] =
    useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const logout = async () => {
    try {
      Cookies.remove("token");
      Cookies.remove("role");
      Cookies.remove("email");
      navigate("/");
    } catch (err) {
      console.error("Logout API failed", err);
    } finally {
      Cookies.remove("token");
      Cookies.remove("role");
    }
  };

  const dropdownRef = useRef();

  const email = Cookies.get("email");
  const role = Cookies.get("role");

  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile && isSidebarOpen) {
        setIsSidebarOpen(false);
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, [isSidebarOpen]);

  useEffect(() => {
    if (!isMobile) return;

    const handleClickOutside = (event) => {
      if (
        isSidebarOpen &&
        !event.target.closest("aside") &&
        !event.target.closest("[data-sidebar-trigger]")
      ) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSidebarOpen, isMobile]);

  useEffect(() => {
    const handleClickOutsideDropdown = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowUserDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutsideDropdown);
    return () =>
      document.removeEventListener("mousedown", handleClickOutsideDropdown);
  }, []);

  useEffect(() => {
    document.body.style.overflow =
      isMobile && isSidebarOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobile, isSidebarOpen]);

  const toggleSidebar = () => {
    isMobile
      ? setIsSidebarOpen(!isSidebarOpen)
      : setIsDesktopSidebarCollapsed(!isDesktopSidebarCollapsed);
  };

  const closeMobileSidebar = () => isMobile && setIsSidebarOpen(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Overlay */}
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Header */}
      <header className="sticky top-0 z-30 h-16 lg:h-20 flex items-center justify-between px-4 lg:pr-7 bg-white shadow-sm lg:rounded-b-2xl">
        <div className="flex items-center gap-4">
          {/* Mobile Menu */}
          <button
            className="lg:hidden p-2 -ml-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
            onClick={toggleSidebar}
            data-sidebar-trigger
          >
            <HiOutlineMenu className="w-6 h-6" />
          </button>

          {/* Logo */}
          <img
            src={logo}
            alt="Sunset Rocks"
            className="w-32 sm:w-40 lg:w-[248px]"
          />
        </div>

        {/* Right-side actions */}
        <div className="relative flex items-center gap-4 lg:gap-7">
          {/* QR Code Button */}
          <button className="hidden sm:flex items-center px-3 py-2 hover:bg-gray-100 rounded-xl text-sm font-medium">
            <HiOutlineQrcode className="w-5 h-5 mr-2" />
            <span className="hidden md:inline">Scan QR Code</span>
          </button>

          {/* User Button with Dropdown */}
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setShowUserDropdown((prev) => !prev)}
              className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg"
            >
              <HiOutlineUser size={22} className="w-5 h-5" />
              <HiOutlineChevronDown className="w-4 h-4" />
            </button>

            {showUserDropdown && (
              <div className="absolute right-0 mt-3 w-72 bg-white border border-gray-100 rounded-2xl shadow-2xl z-50 overflow-hidden backdrop-blur-sm">
                {/* User Info Section */}
                <div className="p-6 bg-gradient-to-br from-gray-50 to-white border-b border-gray-100">
                  <div className="flex items-center space-x-4">
                    {/* Avatar */}
                    <div className="w-12 h-12 bg-gradient-to-br from-[#FF0808] to-[#800404] rounded-full flex items-center justify-center text-white font-semibold text-lg shadow-lg">
                      {(email || "U").charAt(0).toUpperCase()}
                    </div>

                    {/* User Details */}
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                        Signed in as
                      </p>
                      <p
                        title={email}
                        className="font-semibold text-gray-900 truncate text-sm mb-1"
                      >
                        {email || "Unknown User"}
                      </p>
                      <div className="flex items-center">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-[#FEEE95] text-black">
                          {role || "User"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Section */}
                <div className="p-2">
                  <button
                    onClick={logout}
                    className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 rounded-xl transition-all duration-200 group"
                  >
                    {/* Logout Icon */}
                    <svg
                      className="w-5 h-5 group-hover:scale-110 transition-transform duration-200"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    <span className="font-medium">Sign out</span>
                  </button>
                </div>

                {/* Bottom accent */}
                <div className="h-1 bg-gradient-to-r from-[#ff8484] to-[#FF0808]"></div>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-4rem)] lg:h-[calc(100vh-5rem)]">
        {/* Sidebar */}
        <aside
          className={`fixed lg:relative z-50 lg:z-auto bg-yellow-200 lg:bg-[#FEEE95] transition-all duration-300 flex flex-col justify-between py-4 lg:py-6
            ${
              isMobile
                ? `w-80 transform ${
                    isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                  }`
                : `${
                    isDesktopSidebarCollapsed ? "w-16" : "w-80"
                  } lg:rounded-tr-2xl`
            }`}
        >
          {/* Mobile Header */}
          {isMobile && (
            <div className="flex items-center justify-between px-4 pb-4 border-b border-yellow-300">
              <span className="font-semibold text-lg">Menu</span>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="p-2 hover:bg-yellow-300 rounded-lg"
              >
                <HiOutlineX className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* Navigation Items */}
          <nav className="flex-1 px-4">
            <ul className="space-y-2 lg:space-y-8">
              {NAVIGATION_ITEMS.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    end={item.end}
                    onClick={closeMobileSidebar}
                    className={({ isActive }) => `
                      flex items-center lg:py-2 rounded-lg text-base lg:text-2xl font-bold
                      transition-all duration-200
                      ${
                        !isMobile && isDesktopSidebarCollapsed
                          ? "justify-center"
                          : "gap-4"
                      }
                      ${
                        isActive
                          ? " text-[#FF0808]"
                          : "text-gray-900 hover:text-gray-700"
                      }
                    `}
                  >
                    {({ isActive }) => (
                      <>
                        <item.icon color={isActive ? "#FF0808" : "#000"} />
                        {(!isDesktopSidebarCollapsed || isMobile) && (
                          <span>{item.label}</span>
                        )}
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Collapse Button */}
          {!isMobile && (
            <div className="px-4">
              <button
                onClick={toggleSidebar}
                className="ml-auto flex items-center justify-center w-10 h-10 rounded-lg bg-black/10 hover:bg-black/20"
              >
                {isDesktopSidebarCollapsed ? (
                  <HiOutlineChevronRight className="w-5 h-5" />
                ) : (
                  <HiOutlineChevronLeft className="w-5 h-5" />
                )}
              </button>
            </div>
          )}
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto bg-[#F1F1F1]">
          <div className="h-full p-4 lg:p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
