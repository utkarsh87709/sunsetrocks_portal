import React from "react";
import { HiChevronDown, HiChevronRight } from "react-icons/hi";
import EventExpanded from "./EventExpanded";
import { VscEye } from "react-icons/vsc";
import { FiEdit } from "react-icons/fi";

const EventRow = ({
  event,
  isOpen,
  onToggleExpand,
  onDownloadReports,
  onCopyLinkClick,
  handleViewEvent,
  handleEdit,
}) => {
  // Extract date from eventStartDate
  const eventDate = new Date(event.eventStartDate).toLocaleDateString(
    undefined,
    {
      dateStyle: "medium",
    }
  );

  // Use eventTime directly from the event object
  const eventTime = event.eventTime;

  return (
    <div
      className={`my-4 border  hover:border-[#FEEE95] rounded-xl  hover:bg-[#FEEE95] transition-colors pb-0 shadow-[8px_8px_16px_0_rgba(0,0,0,0.02)] ${
        isOpen ? "border-[#FEEE95] bg-[#FEEE95]" : "border-white bg-white"
      }`}
    >
      <div
        className="grid grid-cols-2 sm:grid-cols-6 gap-4 items-center px-6 py-6  transition cursor-pointer"
        onClick={() => onToggleExpand(event.eventId)}
      >
        <div className="flex items-center gap-2 col-span-1 sm:col-span-2">
          {isOpen ? (
            <HiChevronDown className="w-5 h-5 text-gray-500" />
          ) : (
            <HiChevronRight className="w-5 h-5 text-gray-500" />
          )}
          <span className="text-gray-800">{event.eventName}</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
          <span className="text-gray-800">{eventDate}</span>
          <span className="text-gray-800">{eventTime}</span>
        </div>
        <div className="text-gray-800">{event.eventLocation}</div>
        <div className="text-gray-800">{event.eventCode}</div>
        <div className="flex flex-wrap gap-2 sm:justify-end">
          <button
            onClick={() => handleViewEvent(event.eventId)}
            className="cursor-pointer p-1 rounded-full bg-gray-100 border border-gray-200 hover:bg-white"
          >
            <VscEye size={20} className=" " />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleEdit(event.eventId);
            }}
            className="cursor-pointer flex items-center justify-center text-gray-800"
          >
            <FiEdit className="mr-1" /> Edit
          </button>
        </div>
      </div>

      {isOpen && (
        <EventExpanded
          event={event}
          onDownloadReports={onDownloadReports}
          onCopyLink={onCopyLinkClick}
        />
      )}
    </div>
  );
};

export default EventRow;
