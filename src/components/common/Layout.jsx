import { useState, useEffect } from "react";
import { NavLink, Outlet } from "react-router";
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
  HiOutlineChevronRight
} from "react-icons/hi";
import logo from '../..//assets/logo_app.png'

// Icon components with consistent styling
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
  {
    path: "/dashboard",
    label: "Dashboard",
    icon: IconDashboard,
    end: true
  },
  {
    path: "/dashboard/events",
    label: "Events",
    icon: Events
  },
  {
    path: "/dashboard/registered-users",
    label: "Registered Users",
    icon: RegisteredUsers
  },
  {
    path: "/dashboard/config",
    label: "Configuration",
    icon: Configuration
  }
];

export default function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDesktopSidebarCollapsed, setIsDesktopSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Handle responsive behavior
  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      
      // Auto-close mobile sidebar when switching to desktop
      if (!mobile && isSidebarOpen) {
        setIsSidebarOpen(false);
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, [isSidebarOpen]);

  // Close mobile sidebar when clicking outside
  useEffect(() => {
    if (!isMobile) return;

    const handleClickOutside = (event) => {
      if (isSidebarOpen && !event.target.closest('aside') && !event.target.closest('[data-sidebar-trigger]')) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isSidebarOpen, isMobile]);

  // Prevent scroll when mobile sidebar is open
  useEffect(() => {
    if (isMobile && isSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobile, isSidebarOpen]);

  const toggleSidebar = () => {
    if (isMobile) {
      setIsSidebarOpen(!isSidebarOpen);
    } else {
      setIsDesktopSidebarCollapsed(!isDesktopSidebarCollapsed);
    }
  };

  const closeMobileSidebar = () => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Sidebar Overlay */}
      {isMobile && isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Header */}
      <header className="sticky top-0 z-30 h-16 lg:h-20 flex items-center justify-between px-4 lg:pr-7 bg-white shadow-sm lg:rounded-b-2xl">
        <div className="flex items-center gap-4">
          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 -ml-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={toggleSidebar}
            data-sidebar-trigger
            aria-label="Toggle navigation menu"
          >
            <HiOutlineMenu className="w-6 h-6" />
          </button>

          {/* Logo */}
          
            <img
              src={logo}
              alt="Sunset Rocks"
              className="w-32 sm:w-40 lg:w-[248px] h-auto"
              loading="eager"
            />
          
        </div>

        {/* Header Actions */}
        <div onClick={()=>logout()} className="flex items-center gap-2 sm:gap-4 lg:gap-7">
          <button className="hidden sm:flex rounded-xl lg:rounded-2xl px-3 lg:px-5 py-2 items-center gap-2 lg:gap-3.5 text-sm lg:text-base cursor-pointer hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            <HiOutlineQrcode className="w-5 h-5" />
            <span className="hidden md:inline">Scan QR Code</span>
          </button>
          
          {/* Mobile QR button */}
          <button className="sm:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            <HiOutlineQrcode className="w-5 h-5" />
          </button>

          {/* User menu */}
          <button onClick={()=>logout()} className="flex items-center gap-1 lg:gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            <HiOutlineUser className="w-5 h-5" />
            <HiOutlineChevronDown className="w-4 h-4" />
          </button>
        </div>
      </header>

      <div className="flex h-[calc(100vh-4rem)] lg:h-[calc(100vh-5rem)]">
        {/* Sidebar */}
        <aside
          className={`
            fixed lg:relative top-0 left-0 z-50 lg:z-auto
            h-full lg:h-auto
            bg-yellow-200 lg:bg-[#FEEE95]
            transition-transform lg:transition-[width] duration-300 ease-in-out
            flex flex-col justify-between py-4 lg:py-6
            ${isMobile 
              ? `w-80 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`
              : `${isDesktopSidebarCollapsed ? 'w-16' : 'w-80'} lg:rounded-tr-2xl`
            }
          `}
        >
          {/* Mobile header */}
          {isMobile && (
            <div className="flex items-center justify-between px-4 pb-4 border-b border-yellow-300">
              <span className="font-semibold text-lg">Menu</span>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="p-2 hover:bg-yellow-300 rounded-lg transition-colors"
                aria-label="Close menu"
              >
                <HiOutlineX className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* Navigation */}
          <nav className="flex-1 px-4">
            <ul className="space-y-2 lg:space-y-8">
              {NAVIGATION_ITEMS.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    end={item.end}
                    onClick={closeMobileSidebar}
                    className={({ isActive }) => `
                      flex items-center px-3 py-3 lg:py-2 rounded-lg lg:rounded-none
                      text-base lg:text-2xl   font-bold                      transition-all duration-200
                      hover:bg-yellow-300 lg:hover:bg-transparent
                        focus:ring-offset-2
                      ${(!isMobile && isDesktopSidebarCollapsed) ? 'justify-center' : 'gap-3 lg:gap-4'}
                      ${isActive 
                        ? 'bg-yellow-300 lg:bg-transparent font-bold text-[#FF0808]' 
                        : 'text-gray-900 hover:text-gray-700'
                      }
                    `}
                  >
                    {({ isActive }) => (
                      <>
                        <item.icon 
                          color={isActive ? "#F9298C" : "#000"} 
                          className="w-6 h-6 flex-shrink-0"
                        />
                        {(isMobile || !isDesktopSidebarCollapsed) && (
                          <span className="truncate">{item.label}</span>
                        )}
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Desktop collapse button */}
          {!isMobile && (
            <div className="px-4">
              <button
                onClick={toggleSidebar}
                className="ml-auto flex items-center justify-center w-10 h-10 rounded-lg bg-black/10 hover:bg-black/20 transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF0808] focus:ring-offset-2 focus:ring-offset-yellow-200"
                aria-label={isDesktopSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
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
        <main className="flex-1 overflow-auto bg-gray-50">
          <div className="h-full p-4 lg:p-6">
          
          <Outlet/>
          </div>
        </main>
      </div>
    </div>
  );
}
const LoaderSkeleton=({ count = 20 }) =>{
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="h-32 w-full bg-gray-200 rounded-lg animate-pulse"
        />
      ))}
    </div>
  );
}
