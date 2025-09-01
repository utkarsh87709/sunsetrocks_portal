const EventCardMobile = ({ event, onCopyEvent, onViewEdit, onDownloadReports, onCopyLink }) => {
  return (
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
          onClick={() => onCopyEvent(event.eventId)}
          className="flex items-center gap-1 px-3 py-1.5 text-xs border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
        >
          Copy Event
        </button>
        <button
          onClick={() => onViewEdit(event.id)}
          className="flex items-center gap-1 px-3 py-1.5 text-xs border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
        >
          View/Edit
        </button>
        <button
          onClick={() => onDownloadReports(event.id)}
          className="flex items-center gap-1 px-3 py-1.5 text-xs bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-colors"
        >
          Download Reports
        </button>
        <button
          onClick={() => onCopyLink(event.id)}
          className="flex items-center gap-1 px-3 py-1.5 text-xs bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-colors"
        >
          Copy Link
        </button>
      </div>
    </div>
  );
};

export default EventCardMobile;