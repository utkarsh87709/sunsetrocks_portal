import { useState } from 'react';
import { 
  HiOutlinePlus,
  HiOutlineEye,
  HiOutlineClipboardCopy,
  HiOutlineDownload
} from 'react-icons/hi';

const Events = () => {
  const [activeTab, setActiveTab] = useState('upcoming');

  // Sample data matching your image
  const eventsData = [
    {
      id: 1,
      name: "Tech Summit'25",
      dateTime: "24 Aug '25 8:00 PM",
      location: "Toronto, CA",
      eventId: "S4BH0DL4F0",
      registrationStatus: {
        pending: 12,
        approved: 120,
        rejected: 5,
        badgeCollected: 10,
        checkedIn: true
      }
    },
    {
      id: 2,
      name: "Tech Summit'25",
      dateTime: "24 Aug '25 8:00 PM",
      location: "Toronto, CA",
      eventId: "S4BH0DL4F0",
      registrationStatus: {
        pending: 8,
        approved: 95,
        rejected: 3,
        badgeCollected: 15,
        checkedIn: false
      }
    },
    {
      id: 3,
      name: "Tech Summit'25",
      dateTime: "24 Aug '25 8:00 PM",
      location: "Toronto, CA",
      eventId: "S4BH0DL4F0",
      registrationStatus: {
        pending: 5,
        approved: 80,
        rejected: 2,
        badgeCollected: 20,
        checkedIn: false
      }
    },
    {
      id: 4,
      name: "Tech Summit'25",
      dateTime: "24 Aug '25 8:00 PM",
      location: "Toronto, CA",
      eventId: "S4BH0DL4F0",
      registrationStatus: {
        pending: 15,
        approved: 150,
        rejected: 8,
        badgeCollected: 25,
        checkedIn: false
      }
    },
    {
      id: 5,
      name: "Tech Summit'25",
      dateTime: "24 Aug '25 8:00 PM",
      location: "Toronto, CA",
      eventId: "S4BH0DL4F0",
      registrationStatus: {
        pending: 10,
        approved: 110,
        rejected: 4,
        badgeCollected: 12,
        checkedIn: true
      }
    },
    {
      id: 6,
      name: "Tech Summit'25",
      dateTime: "24 Aug '25 8:00 PM",
      location: "Toronto, CA",
      eventId: "S4BH0DL4F0",
      registrationStatus: {
        pending: 7,
        approved: 90,
        rejected: 6,
        badgeCollected: 18,
        checkedIn: false
      }
    }
  ];

  const handleCopyEvent = (eventId) => {
    navigator.clipboard.writeText(eventId);
  };

  const handleViewEdit = (eventId) => {
    console.log('View/Edit event:', eventId);
  };

  const handleDownloadReports = (eventId) => {
    console.log('Download reports for:', eventId);
  };

  const handleCopyLink = (eventId) => {
    console.log('Copy link for:', eventId);
  };

  return (
    <div className="w-full h-full bg-white rounded-lg lg:rounded-2xl shadow-sm">
      {/* Header */}
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
        <button className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg lg:rounded-xl hover:bg-gray-800 transition-colors text-sm lg:text-base font-medium">
          <HiOutlinePlus className="w-4 h-4 lg:w-5 lg:h-5" />
          <span className="hidden sm:inline">Create New Event</span>
          <span className="sm:hidden">Create</span>
        </button>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto">
        <div className="min-w-full">
          {/* Desktop Table Header */}
          <div className="hidden lg:grid lg:grid-cols-6 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-200 text-sm font-medium text-gray-600">
            <div>Event Name</div>
            <div>Date & time</div>
            <div>Location</div>
            <div>Event ID</div>
            <div>Actions</div>
            <div></div>
          </div>

          {/* Events List */}
          <div className="divide-y divide-gray-200">
            {eventsData.map((event, index) => (
              <div key={event.id} className="p-4 lg:p-0">
                {/* Mobile Card Layout */}
                <div className="lg:hidden space-y-3">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-gray-900">{event.name}</h3>
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                      {event.eventId}
                    </span>
                  </div>
                  
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Date:</span>
                      <span>{event.dateTime}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Location:</span>
                      <span>{event.location}</span>
                    </div>
                  </div>

                  {/* Mobile Registration Status */}
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-xs font-medium text-gray-700 mb-2">User Registration Status:</div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="flex justify-between">
                        <span>Pending:</span>
                        <span className="font-medium">{event.registrationStatus.pending}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Approved:</span>
                        <span className="font-medium">{event.registrationStatus.approved}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Rejected:</span>
                        <span className="font-medium">{event.registrationStatus.rejected}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Badge Collected:</span>
                        <span className="font-medium">{event.registrationStatus.badgeCollected}</span>
                      </div>
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-xs">Checked-In:</span>
                      <span className={`text-xs font-medium ${
                        event.registrationStatus.checkedIn ? 'text-green-600' : 'text-gray-500'
                      }`}>
                        {event.registrationStatus.checkedIn ? 'Yes' : 'No'}
                      </span>
                    </div>
                  </div>

                  {/* Mobile Actions */}
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => handleCopyEvent(event.eventId)}
                      className="flex items-center gap-1 px-3 py-1.5 text-xs border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                    >
                      Copy Event
                    </button>
                    <button
                      onClick={() => handleViewEdit(event.id)}
                      className="flex items-center gap-1 px-3 py-1.5 text-xs border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                    >
                      View/Edit
                    </button>
                    <button
                      onClick={() => handleDownloadReports(event.id)}
                      className="flex items-center gap-1 px-3 py-1.5 text-xs bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-colors"
                    >
                      Download Reports
                    </button>
                    <button
                      onClick={() => handleCopyLink(event.id)}
                      className="flex items-center gap-1 px-3 py-1.5 text-xs bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-colors"
                    >
                      Copy Link
                    </button>
                  </div>
                </div>

                {/* Desktop Row Layout */}
                <div className="hidden lg:grid lg:grid-cols-6 gap-4 px-6 py-4 items-start hover:bg-gray-50 transition-colors">
                  {/* Event Name & Registration Status */}
                  <div className="space-y-2">
                    <div className="font-semibold text-gray-900">{event.name}</div>
                    <div className="text-xs text-gray-600">
                      <div className="mb-1 font-medium">User Registration Status:</div>
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span>Pending:</span>
                          <span className="font-medium">{event.registrationStatus.pending}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Approved:</span>
                          <span className="font-medium">{event.registrationStatus.approved}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Rejected:</span>
                          <span className="font-medium">{event.registrationStatus.rejected}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Badge Collected:</span>
                          <span className="font-medium">{event.registrationStatus.badgeCollected}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Checked-In:</span>
                          <span className={`font-medium ${
                            event.registrationStatus.checkedIn ? 'text-green-600' : 'text-gray-500'
                          }`}>
                            {event.registrationStatus.checkedIn ? 'Yes' : 'No'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Date & Time */}
                  <div className="text-gray-900">{event.dateTime}</div>

                  {/* Location */}
                  <div className="text-gray-900">{event.location}</div>

                  {/* Event ID */}
                  <div className="text-gray-900 font-mono text-sm">{event.eventId}</div>

                  {/* Actions */}
                  <div className="space-y-2">
                    <button
                      onClick={() => handleCopyEvent(event.eventId)}
                      className="block w-full text-left px-3 py-1.5 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                    >
                      Copy Event
                    </button>
                    <button
                      onClick={() => handleViewEdit(event.id)}
                      className="block w-full text-left px-3 py-1.5 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                    >
                      <HiOutlineEye className="inline w-4 h-4 mr-1" />
                      View/Edit
                    </button>
                  </div>

                  {/* Additional Actions */}
                  <div className="space-y-2">
                    <button
                      onClick={() => handleDownloadReports(event.id)}
                      className="block w-full text-left px-3 py-1.5 text-sm bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-colors"
                    >
                      <HiOutlineDownload className="inline w-4 h-4 mr-1" />
                      Download Reports
                    </button>
                    <button
                      onClick={() => handleCopyLink(event.id)}
                      className="block w-full text-left px-3 py-1.5 text-sm bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-colors"
                    >
                      <HiOutlineClipboardCopy className="inline w-4 h-4 mr-1" />
                      Copy Link
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Empty State (when no events) */}
      {eventsData.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <HiOutlineCalendar className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No events found</h3>
          <p className="text-gray-500 mb-4">
            {activeTab === 'upcoming' ? 'No upcoming events scheduled.' : 'No past events available.'}
          </p>
          <button className="flex items-center gap-2 px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors">
            <HiOutlinePlus className="w-4 h-4" />
            Create New Event
          </button>
        </div>
      )}
    </div>
  );
};

export default Events;