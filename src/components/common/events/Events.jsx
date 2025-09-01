import { useState } from 'react';
import EventsHeader from './EventsHeader';
import EventsTableHeader from './EventsTableHeader';
import EventCardMobile from './EventCardMobile';
import EventRowDesktop from './EventRowDesktop';
import RegistrationStatus from './RegistrationStatus';
import EventActions from './EventActions';
import EmptyState from './EmptyState';

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

  // Event handlers
  const handleCreateEvent = () => {
    console.log('Create new event');
  };

  const handleCopyEvent = (eventId) => {
    navigator.clipboard.writeText(eventId);
    console.log('Copied event ID:', eventId);
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
      <EventsHeader 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onCreateEvent={handleCreateEvent}
      />

      {/* Table Container */}
      <div className="overflow-x-auto">
        <div className="min-w-full">
          {/* Desktop Table Header */}
          <EventsTableHeader />

          {/* Events List */}
          <div className="divide-y divide-gray-200">
            {eventsData.map((event) => (
              <div key={event.id} className="p-4 lg:p-0">
                {/* Mobile Card Layout */}
                <EventCardMobile
                  event={event}
                  onCopyEvent={handleCopyEvent}
                  onViewEdit={handleViewEdit}
                  onDownloadReports={handleDownloadReports}
                  onCopyLink={handleCopyLink}
                />

                {/* Desktop Row Layout */}
                <EventRowDesktop
                  event={event}
                  onCopyEvent={handleCopyEvent}
                  onViewEdit={handleViewEdit}
                  onDownloadReports={handleDownloadReports}
                  onCopyLink={handleCopyLink}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Empty State */}
      {eventsData.length === 0 && (
        <EmptyState 
          activeTab={activeTab}
          onCreateEvent={handleCreateEvent}
        />
      )}
    </div>
  );
};

export default Events;