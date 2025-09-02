import React from 'react';
import { HiOutlinePlus } from 'react-icons/hi';

const EventsHeader = ({ activeTab, setActiveTab, onCreateClick }) => (
  <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border-b border-gray-200">
    <div className="flex items-center gap-4">
      <h1 className="text-xl font-bold text-gray-900">Events</h1>
      <div className="flex bg-gray-100 rounded-lg p-1 space-x-2">
        {['upcoming', 'past'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 border font-medium rounded-md ${
              activeTab === tab ? 'bg-pink-500 text-white' : 'text-gray-700 hover:text-black'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>
    </div>
    <button
      onClick={onCreateClick}
      className="flex items-center gap-2 px-4 py-2 mt-4 sm:mt-0 border rounded-full hover:bg-gray-800 hover:text-white transition-colors"
    >
      <HiOutlinePlus className="w-4 h-4" />
      Create New Event
    </button>
  </div>
);

export default EventsHeader;
