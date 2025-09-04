import React from "react";
import { HiOutlineDownload, HiOutlineClipboardCopy } from "react-icons/hi";
import { post, blobpost } from "../../api/api"; // Adjust to your actual API helper path

const EventExpanded = ({ event, onCopyLink }) => {
  const handleDownloadReports = async (eventId) => {
    try {
      const response = await blobpost(
        "/downloadEventReport",
        { eventId },
        { responseType: "blob" }
      );

      // Create download link directly from the blob response
      const url = window.URL.createObjectURL(response.data);
      const a = document.createElement("a");
      a.href = url;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to download report:", error);
      alert("Failed to download report. Please try again.");
    }
  };

  return (
    <div className="bg-white px-6 py-4 text-gray-700 rounded-xl">
      <div className="mb-4 font-medium text-black/50">
        User Registration Status...
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-4">
        <div>
          <strong>Pending:</strong> {event.pending}
        </div>
        <div>
          <strong>Approved:</strong> {event.approved}
        </div>
        <div>
          <strong>Rejected:</strong> {event.rejected}
        </div>
        <div>
          <strong>Badge Collected:</strong> {event.badgeCollected}
        </div>
        <div>
          <strong>Checked-In:</strong> {event.checkedIn}
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => handleDownloadReports(event.eventId)}
          className="bg-[#FF0808] text-white  px-4 py-2  hover:bg-orange-600 rounded-xl cursor-pointer"
        >
          Download Reports
        </button>

        <button
          onClick={() => onCopyLink(event.eventLink)}
          className="bg-[#FF0808] text-white  px-4 py-2 rounded-xl hover:bg-orange-600 cursor-pointer"
        >
          Copy Link
        </button>
      </div>
    </div>
  );
};

export default EventExpanded;
