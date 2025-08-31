import { MdDashboard, MdEvent, MdPeople, MdSettings } from "react-icons/md";
import { useState } from "react";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [activeItem, setActiveItem] = useState('Dashboard');

  const menuItems = [
    { name: 'Dashboard', icon: MdDashboard, path: '/dashboard' },
    { name: 'Events', icon: MdEvent, path: '/events' },
    { name: 'Registered Users', icon: MdPeople, path: '/users' },
    { name: 'Configuration', icon: MdSettings, path: '/configuration' }
  ];

  const handleMenuClick = (itemName) => {
    setActiveItem(itemName);
    // On mobile, close sidebar after clicking
    if (window.innerWidth < 1024) {
      toggleSidebar();
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-screen bg-yellow-200 transition-transform duration-300 ease-in-out z-50
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        ${isOpen ? 'w-64' : 'lg:w-16'}
        lg:relative lg:h-screen
      `}>
        <div className="flex flex-col h-full">
          {/* Top spacing to account for navbar */}
          <div className="h-16 flex-shrink-0"></div>
          
          {/* Menu items */}
          <div className="flex-1 py-4">
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={item.name}
                  onClick={() => handleMenuClick(item.name)}
                  className={`
                    w-full flex items-center gap-4 px-4 py-3 mx-2 rounded-lg transition-colors duration-200
                    ${activeItem === item.name 
                      ? 'bg-yellow-300 text-gray-900 font-medium' 
                      : 'text-gray-700 hover:bg-yellow-100'
                    }
                  `}
                >
                  <IconComponent className="w-5 h-5 flex-shrink-0" />
                  <span className={`${!isOpen && 'lg:hidden'} whitespace-nowrap`}>
                    {item.name}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Bottom section (optional - for user info or footer) */}
          <div className="flex-shrink-0 p-4 border-t border-yellow-300">
            <div className={`${!isOpen && 'lg:hidden'} text-xs text-gray-600 text-center`}>
              © 2025 Sunset Rocks
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;