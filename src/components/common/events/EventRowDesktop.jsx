import React, { useState } from 'react';
import {
  HiOutlineEye,
  HiOutlineClipboardCopy,
  HiOutlineDownload,
  HiChevronRight,
  HiChevronDown,
} from 'react-icons/hi';

const EventRowDesktop = ({ event, onCopyEvent, onViewEdit, onDownloadReports, onCopyLink }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border-b border-gray-200">
      {/* Main Row */}
      <div
        className="hidden lg:grid lg:grid-cols-6 gap-4 px-6 py-4 items-start hover:bg-gray-50 transition-colors cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {/* Chevron + Event Name */}
        <div className="flex items-start space-x-2">
          <span className="pt-1">
            {isExpanded ? (
              <HiChevronDown className="w-4 h-4 text-gray-600" />
            ) : (
              <HiChevronRight className="w-4 h-4 text-gray-600" />
            )}
          </span>
          <div>
            <div className="font-semibold text-gray-900">{event.name}</div>
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
            onClick={(e) => {
              e.stopPropagation();
              onCopyEvent(event.eventId);
            }}
            className="block w-full text-left px-3 py-1.5 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            Copy Event
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewEdit(event.id);
            }}
            className="block w-full text-left px-3 py-1.5 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            <HiOutlineEye className="inline w-4 h-4 mr-1" />
            View/Edit
          </button>
        </div>

        {/* Empty cell to align spacing */}
        <div />
      </div>

      {/* Expanded Section */}
      {isExpanded && (
        <div className="lg:grid grid-cols-6 gap-4 px-14 pb-4 text-sm text-gray-700">
          <div className="col-span-2 space-y-1">
            <div className="font-medium text-gray-800 mb-1">User Registration Status:</div>
            <div className="flex justify-between">
              <span>Pending:</span>
              <span className="font-semibold">{event.registrationStatus.pending}</span>
            </div>
            <div className="flex justify-between">
              <span>Approved:</span>
              <span className="font-semibold">{event.registrationStatus.approved}</span>
            </div>
            <div className="flex justify-between">
              <span>Rejected:</span>
              <span className="font-semibold">{event.registrationStatus.rejected}</span>
            </div>
            <div className="flex justify-between">
              <span>Badge Collected:</span>
              <span className="font-semibold">{event.registrationStatus.badgeCollected}</span>
            </div>
            <div className="flex justify-between">
              <span>Checked-In:</span>
              <span
                className={`font-semibold ${
                  event.registrationStatus.checkedIn ? 'text-green-600' : 'text-gray-500'
                }`}
              >
                {event.registrationStatus.checkedIn ? 'Yes' : 'No'}
              </span>
            </div>
          </div>

          {/* Actions: Download & Copy Link */}
          <div className="col-span-4 flex items-start space-x-4 mt-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDownloadReports(event.id);
              }}
              className="px-4 py-2 text-sm bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-colors"
            >
              <HiOutlineDownload className="inline w-4 h-4 mr-1" />
              Download Reports
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onCopyLink(event.id);
              }}
              className="px-4 py-2 text-sm bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-colors"
            >
              <HiOutlineClipboardCopy className="inline w-4 h-4 mr-1" />
              Copy Lin
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventRowDesktop;
