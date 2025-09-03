import React, { useState } from 'react';
import { Calendar, MapPin, Clock, Plus, QrCode, CheckCircle, Users, Award, Eye, Edit } from 'lucide-react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('Upcoming');

  const stats = [
    {
      id: 1,
      title: 'Total Registrations',
      value: '154',
      change: '+12 this week',
      changeType: 'positive',
      icon: Users,
      highlighted: true
    },
    {
      id: 2,
      title: 'Tickets Approved',
      value: '121',
      change: '+8 today',
      changeType: 'positive',
      icon: CheckCircle
    },
    {
      id: 3,
      title: 'Pending Approvals',
      value: '11',
      change: 'Needs attention',
      changeType: 'warning',
      icon: Clock
    },
    {
      id: 4,
      title: 'Badges Collected',
      value: '10',
      change: '10 / 120 approved',
      changeType: 'info',
      icon: Award
    },
    {
      id: 5,
      title: 'Checked In',
      value: '0',
      change: 'Event not started',
      changeType: 'neutral',
      icon: CheckCircle
    }
  ];

  const events = [
    {
      id: 1,
      name: "Tech Summit'25",
      date: "24 Aug' 25 8:00 PM",
      location: "Toronto, CA",
      eventId: "544HGJGJ47G",
      highlighted: true
    },
    {
      id: 2,
      name: "Tech Summit'25",
      date: "24 Aug' 25 8:00 PM",
      location: "Toronto, CA",
      eventId: "544HGJGJ47G"
    },
    {
      id: 3,
      name: "Tech Summit'25",
      date: "24 Aug' 25 8:00 PM",
      location: "Toronto, CA",
      eventId: "544HGJGJ47G"
    }
  ];

  const actionCards = [
    {
      id: 1,
      title: 'Create New Event',
      subtitle: 'Set up a new event',
      icon: Calendar
    },
    {
      id: 2,
      title: 'Scan Badge',
      subtitle: 'Generate or scan badges',
      icon: QrCode
    },
    {
      id: 3,
      title: 'Check-In User',
      subtitle: 'Mark attendees as checked in',
      icon: CheckCircle
    }
  ];

  const handleActionClick = (action) => {
    console.log('Action clicked:', action);
  };

  const handleViewEventDetails = () => {
    console.log('View event details clicked');
  };

  const handleEditEvent = (eventId) => {
    console.log('Edit event clicked:', eventId);
  };

  const handleViewEvent = (eventId) => {
    console.log('View event clicked:', eventId);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-8 gap-6">
          <h1 className="text-3xl lg:text-4xl font-bold text-black">
            Dashboard (Static)
          </h1>
          
          {/* Action Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {actionCards.map((card) => (
              <button
                key={card.id}
                onClick={() => handleActionClick(card.title)}
                className="bg-red-600 text-white p-4 rounded-lg hover:bg-red-700 transition-colors text-left min-w-[200px]"
              >
                <div className="flex items-start gap-3">
                  <card.icon size={24} className="mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-sm">{card.title}</h3>
                    <p className="text-xs text-red-100 mt-1">{card.subtitle}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Current Event Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Event Details */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-red-600 mb-2">Annual Gala 2025</h2>
            <p className="text-gray-500 mb-4">Event ID: 5454FUHG55</p>
            
            <div className="space-y-3">
              <div className="flex items-center text-gray-700">
                <Calendar size={18} className="mr-3 text-red-600" />
                <span className="text-sm">October 26, 2025 | 7:00 PM onwards</span>
              </div>
              
              <div className="flex items-center text-gray-700">
                <MapPin size={18} className="mr-3 text-red-600" />
                <span className="text-sm">The Grand Ballroom, Downtown</span>
              </div>
              
              <div className="flex items-center text-gray-700">
                <Clock size={18} className="mr-3 text-red-600" />
                <span className="text-sm">43 Days Remaining</span>
              </div>
            </div>
          </div>

     
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {stats.map((stat) => (
                <div
                  key={stat.id}
                  className={`bg-white rounded-lg p-4 shadow-sm relative ${
                    stat.highlighted ? 'ring-2 ring-blue-400' : ''
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="bg-red-100 p-2 rounded-lg">
                      <stat.icon size={20} className="text-red-600" />
                    </div>
                  </div>
                  
                  <div className="text-2xl font-bold text-black mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600 mb-2">{stat.title}</div>
                  
                  <div className={`text-xs flex items-center ${
                    stat.changeType === 'positive' ? 'text-green-600' :
                    stat.changeType === 'warning' ? 'text-red-600' :
                    stat.changeType === 'info' ? 'text-orange-600' :
                    'text-gray-500'
                  }`}>
                    {stat.changeType === 'positive' && '↗ '}
                    {stat.changeType === 'warning' && '▲ '}
                    {stat.changeType === 'info' && '→ '}
                    {stat.changeType === 'neutral' && '● '}
                    {stat.change}
                  </div>
                </div>
              ))}
              
              {/* View Event Details Card */}
              <div className="bg-white rounded-lg p-4 shadow-sm flex items-center justify-center">
                <button
                  onClick={handleViewEventDetails}
                  className="text-center"
                >
                  <Eye size={24} className="mx-auto mb-2 text-gray-400" />
                  <span className="text-sm text-gray-600">View Event details</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Dots */}
        <div className="flex justify-center gap-2 mb-8">
          <div className="w-2 h-2 bg-black rounded-full"></div>
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
        </div>

        {/* All Events Overview */}
        <div className="bg-white rounded-lg shadow-sm">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-6 border-b">
            <h3 className="text-xl font-semibold text-black mb-4 sm:mb-0">All Events Overview</h3>
            
            <div className="flex gap-2">
              {['Upcoming', 'Past', 'All'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-full font-medium text-sm transition-colors ${
                    activeTab === tab
                      ? 'bg-black text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-4 font-semibold text-gray-800">Event Name</th>
                  <th className="text-left p-4 font-semibold text-gray-800">Date & time</th>
                  <th className="text-left p-4 font-semibold text-gray-800">Location</th>
                  <th className="text-left p-4 font-semibold text-gray-800">Event ID</th>
                  <th className="text-left p-4 font-semibold text-gray-800">Actions</th>
                </tr>
              </thead>
              <tbody>
                {events.map((event) => (
                  <tr
                    key={event.id}
                    className={`border-b hover:bg-gray-50 ${
                      event.highlighted ? 'bg-yellow-50' : ''
                    }`}
                  >
                    <td className="p-4 font-medium text-gray-800">{event.name}</td>
                    <td className="p-4 text-gray-600">{event.date}</td>
                    <td className="p-4 text-gray-600">{event.location}</td>
                    <td className="p-4 text-gray-600">{event.eventId}</td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleViewEvent(event.id)}
                          className="p-2 text-gray-600 hover:text-gray-800 transition-colors"
                          title="View Event"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => handleEditEvent(event.id)}
                          className="p-2 text-gray-600 hover:text-gray-800 transition-colors"
                          title="Edit Event"
                        >
                          <Edit size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;