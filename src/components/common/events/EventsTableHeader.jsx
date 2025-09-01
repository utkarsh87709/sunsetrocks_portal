const EventsTableHeader = () => {
  return (
    <div className="hidden lg:grid lg:grid-cols-6 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-200 text-sm font-medium text-gray-600">
      <div>Event Name</div>
      <div>Date & time</div>
      <div>Location</div>
      <div>Event ID</div>
      <div>Actions</div>
      <div></div>
    </div>
  );
};

export default EventsTableHeader;