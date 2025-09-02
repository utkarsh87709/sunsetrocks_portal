import React from 'react';
import { HiChevronDown, HiChevronRight } from 'react-icons/hi';
import EventExpanded from './EventExpanded';

const EventRow = ({
  event,
  isOpen,
  onToggleExpand,
  onCopyEvent,
  onViewEdit,
  onDownloadReports,
  onCopyLink
}) => {
  const dateTime = new Date(event.eventStartDate).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  return (
    <div className="py-2 my-3 border border-slate-300 rounded-xl bg-white">
      <div
        className="grid grid-cols-2 sm:grid-cols-6 gap-4 items-center px-6 py-4 hover:bg-gray-50 transition cursor-pointer"
        onClick={() => onToggleExpand(event.eventId)}
      >
        <div className="flex items-center gap-2 col-span-1 sm:col-span-2">
          {isOpen ? (
            <HiChevronDown className="w-5 h-5 text-gray-500" />
          ) : (
            <HiChevronRight className="w-5 h-5 text-gray-500" />
          )}
          <span className="font-medium text-gray-900">{event.eventName}</span>
        </div>

        <div>{dateTime}</div>
        <div>{event.eventLocation}</div>
        <div className="font-mono">{event.eventCode}</div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onCopyEvent(event.eventCode);
            }}
            className="text-xs border px-3 py-1.5 rounded hover:bg-gray-100"
          >
            Copy
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewEdit(event.eventId);
            }}
            className="text-xs border px-3 py-1.5 rounded hover:bg-gray-100"
          >
            View/Edit
          </button>
        </div>
      </div>

      {isOpen && (
        <EventExpanded
          event={event}
          onDownloadReports={onDownloadReports}
          onCopyLink={onCopyLink}
        />
      )}
    </div>
  );
};

export default EventRow;
