import { HiOutlinePlus, HiOutlineCalendar } from 'react-icons/hi';

const EmptyState = ({ activeTab, onCreateEvent }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <HiOutlineCalendar className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">No events found</h3>
      <p className="text-gray-500 mb-4">
        {activeTab === 'upcoming' ? 'No upcoming events scheduled.' : 'No past events available.'}
      </p>
      <button 
        onClick={onCreateEvent}
        className="flex items-center gap-2 px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
      >
        <HiOutlinePlus className="w-4 h-4" />
        Create New Event
      </button>
    </div>
  );
};

export default EmptyState;