import React from 'react';
import { HiOutlineDownload, HiOutlineClipboardCopy } from 'react-icons/hi';
import { post } from '../../api/api'; // Adjust to your actual API helper path

const EventExpanded = ({ event, onCopyLink }) => {
const handleDownloadReports = async (eventId) => {
  try {
    const response = await post(
      '/downloadEventReport',
      { eventId },
      { responseType: 'blob' } // important for binary data
    );

    console.log(response)
    const filename = `event-report-${eventId}.xlsx`;

    const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Failed to download report:', error);
    alert('Failed to download report. Please try again.');
  }
};



  return (
    <div className="bg-gray-50 px-6 py-4 text-gray-700">
      <div className="mb-4 font-medium">User Registration Status</div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-4 text-center">
        <div><strong>Pending:</strong> {event.pending}</div>
        <div><strong>Approved:</strong> {event.approved}</div>
        <div><strong>Rejected:</strong> {event.rejected}</div>
        <div><strong>Badge Collected:</strong> {event.badgeCollected}</div>
        <div><strong>Checked-In:</strong> {event.checkedIn ? 'Yes' : 'No'}</div>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => handleDownloadReports(event.eventId)}
          className="bg-pink-500 text-white text-xs px-4 py-2 rounded hover:bg-pink-600"
        >
          <HiOutlineDownload className="inline w-4 h-4 mr-1" />
          Download Reports
        </button>

        <button
          onClick={() => onCopyLink(event.eventLink)}
          className="bg-pink-500 text-white text-xs px-4 py-2 rounded hover:bg-pink-600"
        >
          <HiOutlineClipboardCopy className="inline w-4 h-4 mr-1" />
          Copy Link
        </button>
      </div>
    </div>
  );
};

export default EventExpanded;
