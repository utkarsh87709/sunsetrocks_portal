import React, { useEffect, useState } from 'react';
import { ArrowLeft, MapPin, Calendar, Clock, Copy, Download, X } from 'lucide-react';
import { FaEdit } from "react-icons/fa";
import { blobpost ,post} from '../../api/api';

const ViewEventModal = ({  setShowModal, onClose,selectedEvent,handleEdit }) => {
    const [eventDetails,setEventDetails]=useState(null);
  // Loading spinner component
  const LoadingSpinner = () => (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
    </div>
  );

    const getEventDetails = async (eventId) => {
    
     try{
       const response = await post('/eventDetails', {
       eventId
        });
        console.log(response)
        setEventDetails(response.data)
  
     }
     catch(error){
      console.log(error)
     }
       
     
    };

    useEffect(()=>{
        getEventDetails(selectedEvent)
    },[selectedEvent])

  const handleDownloadReports = async (eventId) => {
    
    try {
      const response = await blobpost(
        '/downloadEventReport', 
        { eventId },
        { responseType: 'blob' }
      );
      
      // Create download link directly from the blob response
      const url = window.URL.createObjectURL(response.data);
      const a = document.createElement('a');
      a.href = url;
      a.click();
      window.URL.revokeObjectURL(url);
      
    } catch (error) {
      console.error('Failed to download report:', error);
      alert('Failed to download report. Please try again.');
    }
  };
  // Format date function
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Format time function
  const formatTime = (timeString) => {
    if (!timeString) return '';
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  // Copy link function
  const copyLink = () => {
    if (eventDetails?.eventLink) {
      navigator.clipboard.writeText(eventDetails.eventLink);
      // You could add a toast notification here
    }
  };

  // Calculate days remaining
  const getDaysRemaining = (startDate) => {
    const today = new Date();
    const eventDate = new Date(startDate);
    const diffTime = eventDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const handleBackClick = () => {
    if (onClose) onClose();
    if (setShowModal) setShowModal(false);
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/70 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 ">
          <button 
            onClick={handleBackClick}
            className="flex items-center text-gray-600 hover:text-gray-800 font-bold"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to main Event
          </button>
        
        </div>

        {/* Content */}
        <div className="p-6">
          {!eventDetails ? (
            <LoadingSpinner />
          ) : (
            <div className="flex flex-col lg:flex-row gap-6 ">
              {/* Left side - Event Image */}
              <div className="lg:w-1/2">
                <div className="relative">
                  {eventDetails.eventImages && eventDetails.eventImages.length > 0 ? (
                    <img 
                      src={eventDetails.eventImages[0]} 
                      alt="Event poster"
                      className="w-full h-auto rounded-lg shadow-lg"
                      onError={(e) => {
                        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMDAgMTUwTDE3NSAxMjVIMjI1TDIwMCAxNTBaIiBmaWxsPSIjOUI5QkEwIi8+CjxwYXRoIGQ9Ik0yMDAgMTUwTDE3NSAxNzVIMjI1TDIwMCAxNTBaIiBmaWxsPSIjOUI5QkEwIi8+Cjwvdz4K';
                      }}
                    />
                  ) : (
                    <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                      <span className="text-gray-500">No image available</span>
                    </div>
                  )}
                  
                  {/* Event status indicators at bottom */}
                  <div className="mt-4 flex justify-center">
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* Right side - Event Details */}
              <div className="lg:w-1/2">
                {/* Event Title */}
                <div className="flex items-start justify-between mb-4">
                  <h1 className="text-3xl font-bold text-red-600">
                    {eventDetails.eventName}
                  </h1>
                  <button onClick={_=>{handleEdit(eventDetails.eventId)}} className="text-gray-400 hover:text-gray-600">
                    <span className="text-lg text-slate-400 font-semibold flex items-center "><FaEdit size={22} className='text-red-500 mr-1' />Edit</span>
                  </button>
                </div>

                {/* Event ID */}
                <p className="text-gray-500 mb-6">Event ID: <span className='font-bold'>{eventDetails.eventCode}</span></p>

                {/* Event Info */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-center text-gray-700">
                    <Calendar size={20} className="mr-3 text-red-600" />
                    <span>
                      {formatDate(eventDetails.eventStartDate)}
                      {eventDetails.eventTime && ` | ${formatTime(eventDetails.eventTime)} onwards`}
                    </span>
                  </div>
                  
                  <div className="flex items-center text-gray-700">
                    <MapPin size={20} className="mr-3 text-red-600" />
                    <span>{eventDetails.eventLocation}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-700">
                    <Clock size={20} className="mr-3 text-red-600" />
                    <span>{getDaysRemaining(eventDetails.eventStartDate)} Days Remaining</span>
                  </div>
                </div>

                {/* Event Details Section */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-800 mb-2">Event Details</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {eventDetails.eventDescription}
                  </p>
                </div>

                {/* Miscellaneous Details */}
                {eventDetails.eventMiscDetails && (
                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-800 mb-2">Miscellaneous Details</h3>
                    <ul className="text-gray-600 space-y-1">
                      <li>• {eventDetails.eventMiscDetails}</li>
                    </ul>
                  </div>
                )}

                {/* Terms & Conditions */}
                <div className="mb-6">
                  <button className="text-gray-700 hover:text-gray-700 underline">
                    View Terms & Conditions
                  </button>
                </div>

                {/* Event Link and Copy Button */}
                <div className="mb-6">
                  <div className="flex items-center bg-gray-100 rounded-lg p-3 overflow-hidden">
                    <input 
                      type="text" 
                      value={eventDetails.eventLink || ''} 
                      readOnly 
                      className="flex-1 bg-transparent text-sm text-gray-600 outline-none px-3"
                    />
                    <button 
                      onClick={copyLink}
                      className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors ml-1"
                    >
                      Copy Link
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* User Registration Status */}
          {eventDetails && (
            <>
            
              <div className="mb-4 pt-4 rounded-xl shadow-md p-3">
                <h3 className="text-lg font-semibold text-gray-500 mb-4">User Registration Status...</h3>
                
                <div className="flex flex-wrap gap-6 text-center">
                  <div>
                    <span className="text-yellow-600 font-bold text-xl">{eventDetails.pending}</span>
                    <p className="text-gray-600">Pending</p>
                  </div>
                  <div>
                    <span className="text-green-600 font-bold text-xl">{eventDetails.approved}</span>
                    <p className="text-gray-600">Approved</p>
                  </div>
                  <div>
                    <span className="text-red-600 font-bold text-xl">{eventDetails.rejected}</span>
                    <p className="text-gray-600">Rejected</p>
                  </div>
                  <div>
                    <span className="text-blue-600 font-bold text-xl">{eventDetails.badgeCollected}</span>
                    <p className="text-gray-600">Badge Collected</p>
                  </div>
                  <div>
                    <span className="text-purple-600 font-bold text-xl">{eventDetails.checkedIn}</span>
                    <p className="text-gray-600">Checked-In</p>
                  </div>
                  <div className="ml-auto">
                    <button onClick={_=>handleDownloadReports(eventDetails.eventId)} className="flex items-center bg-red-500 text-white px-4 py-2 rounded-lg transition-colors">
                      
                      Download Reports
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewEventModal;