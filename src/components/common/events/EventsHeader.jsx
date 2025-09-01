import { HiOutlinePlus } from 'react-icons/hi';

const EventsHeader = ({ activeTab, setActiveTab, onCreateEvent }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 lg:p-6 border-b border-gray-200">
      <div className="flex items-center gap-4 mb-4 sm:mb-0">
        <h1 className="text-xl lg:text-2xl font-bold text-gray-900">Event</h1>
        
        {/* Tabs */}
        <div className="flex rounded-lg bg-gray-100 p-1">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`px-3 lg:px-4 py-2 text-sm lg:text-base font-medium rounded-md transition-colors ${
              activeTab === 'upcoming'
                ? 'bg-pink-500 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Upcoming Events
          </button>
          <button
            onClick={() => setActiveTab('past')}
            className={`px-3 lg:px-4 py-2 text-sm lg:text-base font-medium rounded-md transition-colors ${
              activeTab === 'past'
                ? 'bg-pink-500 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Past Events
          </button>
        </div>
      </div>

      {/* Create New Event Button */}
      <button 
        onClick={onCreateEvent}
        className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg lg:rounded-xl hover:bg-gray-800 transition-colors text-sm lg:text-base font-medium"
      >
        <HiOutlinePlus className="w-4 h-4 lg:w-5 lg:h-5" />
        <span className="hidden sm:inline">Create New Event</span>
        <span className="sm:hidden">Create</span>
      </button>
    </div>
  );
};

export default EventsHeader;