import React from 'react';
import { HiChevronDown, HiChevronRight } from 'react-icons/hi';
import EventExpanded from './EventExpanded';
import { VscEye } from "react-icons/vsc";
import { FiEdit } from "react-icons/fi";

const EventRow = ({
  event,
  isOpen,
  onToggleExpand,
  onDownloadReports,
  onCopyLinkClick,
  handleViewEvent,
  handleEdit
}) => {
  // Extract date from eventStartDate
  const eventDate = new Date(event.eventStartDate).toLocaleDateString(undefined, {
    dateStyle: 'medium',
  });

  // Use eventTime directly from the event object
  const eventTime = event.eventTime;

  return (
    <div className="py-4 my-3 border border-slate-300 rounded-xl bg-white hover:bg-[#FEEE95] pb-0 shadow-md">
      <div
        className="grid grid-cols-2 sm:grid-cols-6 gap-4 items-center px-6 py-4  transition cursor-pointer"
        onClick={() => onToggleExpand(event.eventId)}
      >
        <div className="flex items-center gap-2 col-span-1 sm:col-span-2">
          {isOpen ? (
            <HiChevronDown className="w-5 h-5 text-gray-500" />
          ) : (
            <HiChevronRight className="w-5 h-5 text-gray-500" />
          )}
          <span className="font-bold text-lg text-gray-900">{event.eventName}</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
          <span className="text-sm font-bold">{eventDate}</span>
          <span className="text-sm font-bold text-gray-800">{eventTime}</span>
        </div>
        <div>{event.eventLocation}</div>
        <div className="font-mono">{event.eventCode}</div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleViewEvent(event.eventId)}
            className=" p-1 rounded-full bg-gray-100 border border-gray-200 hover:bg-white"
          >
           <VscEye size={20} className=' ' />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
             handleEdit(event.eventId);
            }}
            className=" cursor-pointer flex items-center justify-center text-slate-600"
          >
           <FiEdit className='mr-1' /> Edit
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