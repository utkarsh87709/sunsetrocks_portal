import React, { useEffect, useState } from "react";
import EventsHeader from "./EventsHeader";
import EventRow from "./EventRow";
import CreateEventModal from "./CreateEventModal";
import { post } from "../../api/api";
import CopyLinkModal from "./CopyLinkModal";
import EditEventModal from "./EditEventModal";
import ViewEventModal from "./ViewEventModal";
const Events = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [eventsData, setEventsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [expandedEventId, setExpandedEventId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [link, setLink] = useState("");
  const [eventDetails, setEventDetails] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const fetchEvents = async (status = activeTab) => {
    setLoading(true);
    setError(null);
    try {
      const response = await post("/getAllEvents", {
        page: 1,
        size: 100,
        eventStatus: status,
      });
      if (response.meta?.status) {
        setEventsData(response.data.eventList || []);
      } else {
        setError(response.meta?.message || "Failed to fetch events");
        setEventsData([]);
      }
    } catch (err) {
      setError(err.message || "Something went wrong");
      setEventsData([]);
    } finally {
      setLoading(false);
    }
  };
  const handleEdit = (eventId) => {
    setSelectedEvent(eventId);
    setShowModal("edit");
  };

  const handleViewEvent = (eventId) => {
    setSelectedEvent(eventId);

    setShowModal("view");
  };

  useEffect(() => {
    fetchEvents(activeTab);
  }, [activeTab]);

  const toggleExpand = (eventId) => {
    setExpandedEventId((prev) => (prev === eventId ? null : eventId));
  };

  const handleCopyEvent = (eventCode) =>
    navigator.clipboard.writeText(eventCode);
  const handleViewEdit = (eventId) => console.log("View/Edit event:", eventId);
  const handleDownloadReports = (eventId) =>
    console.log("Download reports for:", eventId);
  const handleCopyLink = (eventId) => console.log("Copy link for:", eventId);

  return (
    <div className="w-full  p-4 md:p-6 lg:p-8">
      <EventsHeader
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onCreateClick={() => setShowModal("create")}
      />

      {loading ? (
        <div className="py-10 text-center text-gray-500">Loading events...</div>
      ) : error ? (
        <div className="py-10 text-center text-red-500">Error: {error}</div>
      ) : eventsData.length === 0 ? (
        <div className="py-10 text-center text-gray-500">
          No events available.
        </div>
      ) : (
        <div className="rounded-2xl border border-white bg-white/50 p-5">
          <div className="grid grid-cols-2 sm:grid-cols-6 gap-4 px-6 py-3 font-bold text-black font-lg">
            <div className="col-span-1 sm:col-span-2">Event Name</div>
            <div>Date & Time</div>
            <div>Location</div>
            <div>Event ID</div>
            <div className="sm:text-right">Actions</div>
          </div>

          {eventsData.map((event) => (
            <EventRow
              key={event.eventId}
              event={event}
              isOpen={expandedEventId === event.eventId}
              onToggleExpand={toggleExpand}
              onCopyEvent={handleCopyEvent}
              onViewEdit={handleViewEdit}
              onDownloadReports={handleDownloadReports}
              onCopyLink={handleCopyLink}
              onClose={(_) => setShowModal(false)}
              onCopyLinkClick={(link) => {
                setLink(link);
                setShowModal("copyLink");
              }}
              setShowModal={setShowModal}
              handleViewEvent={handleViewEvent}
              handleEdit={handleEdit}
            />
          ))}
        </div>
      )}

      {showModal == "create" && (
        <CreateEventModal
          onClose={() => setShowModal(false)}
          refresh={fetchEvents}
        />
      )}
      {showModal == "copyLink" && (
        <CopyLinkModal
          link={link}
          onClose={() => {
            setLink("");
            setShowModal(false);
          }}
        />
      )}
      {showModal == "edit" && (
        <EditEventModal
          onClose={() => setShowModal(false)}
          eventId={selectedEvent}
          refresh={fetchEvents}
        />
      )}
      {showModal == "view" && (
        <ViewEventModal
          eventDetails={eventDetails}
          selectedEvent={selectedEvent}
          setShowModal={setShowModal}
          handleEdit={handleEdit}
          onClose={() => {
            setShowModal(false);
            setEventDetails(null);
          }}
        />
      )}
    </div>
  );
};

export default Events;
