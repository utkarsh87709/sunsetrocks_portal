import React from 'react';
import { HiOutlinePlus } from 'react-icons/hi';

const EventsHeader = ({ activeTab, setActiveTab, onCreateClick }) => {
  return (
    <div className="mb-8">
      {/* Main Heading */}
      <h1 className="text-3xl lg:text-4xl font-bold text-black mb-4">
        Events
      </h1>

      {/* Tabs and Create Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        {/* Tabs */}
        <div className="flex bg-gray-100 rounded-full p-1 space-x-2 w-fit">
          {['upcoming', 'past'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-5 border  gap-2 font-medium transition-colors ${
                activeTab === tab
                  ? 'bg-red-600 text-white'
                  : 'text-red-600 hover:bg-red-50 '
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)} Events
            </button>
          ))}
        </div>

        {/* Create Button */}
        <button
          onClick={onCreateClick}
          className="flex items-center justify-center px-6 py-3 border-2 border-red-500 text-red-600 rounded-full hover:bg-red-50 transition-colors font-medium"
        >
          <HiOutlinePlus className="w-4 h-4 mr-2" />
          Create New Event
        </button>
      </div>
    </div>
  );
};

export default EventsHeader;
