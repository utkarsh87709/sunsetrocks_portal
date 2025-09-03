import React, { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';

// Mock API function for demo purposes
const post = async (endpoint, data) => {
  // Simulating API response
  return {
    meta: { status: true },
    data: {
      userTypeList: [
        {
          userTypeId: 1,
          userTypeName: "VIP",
          userTypeDescription: "All the user under VIP comes under here.",
          categoryList: [
            {
              categoryId: 1,
              categoryName: "Blue",
              badgeUrl: "https://webbackend-sse-dev-cus-001.azurewebsites.net/uploads/sunset-rocks-badges-back.png",
              xCoordinate: 435,
              yCoordinate: 708,
              qrHeight: 157,
              qrWidth: 157
            },
            {
              categoryId: 4,
              categoryName: "Gold",
              badgeUrl: "https://webbackend-sse-dev-cus-001.azurewebsites.net/uploads/sunset-rocks-badges-back.png",
              xCoordinate: 435,
              yCoordinate: 708,
              qrHeight: 157,
              qrWidth: 157
            }
          ]
        },
        {
          userTypeId: 3,
          userTypeName: "Regular",
          userTypeDescription: "All the user under Regular comes under here.",
          categoryList: [
            {
              categoryId: 3,
              categoryName: "Red",
              badgeUrl: "https://webbackend-sse-dev-cus-001.azurewebsites.net/uploads/sunset-rocks-badges-back.png",
              xCoordinate: 435,
              yCoordinate: 708,
              qrHeight: 157,
              qrWidth: 157
            }
          ]
        }
      ]
    }
  };
};

const Configuration = () => {
  const [selectedUserType, setSelectedUserType] = useState('VIP');
  const [userTypes, setUserTypes] = useState([]);
  const [badgeCategories, setBadgeCategories] = useState([]);
  const [apiData, setApiData] = useState(null); // Store the full API response
  const [loading, setLoading] = useState(true);

  const getAllUserType = async () => {
    try {
      const response = await post('/getAllUserType', {});
      console.log(response);
      
      if (response.meta.status && response.data.userTypeList) {
        // Store the full API response
        setApiData(response.data);
        
        // Set user types from API response
        const apiUserTypes = response.data.userTypeList.map(userType => ({
          id: userType.userTypeId,
          name: userType.userTypeName,
          description: userType.userTypeDescription,
          active: userType.userTypeName === 'VIP' // Set VIP as active by default
        }));
        
        setUserTypes(apiUserTypes);
        
        // Set badge categories for the initially selected user type
        const initialUserType = response.data.userTypeList.find(type => type.userTypeName === 'VIP');
        if (initialUserType) {
          setBadgeCategories(initialUserType.categoryList || []);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllUserType();
  }, []);

  const handleUserTypeClick = (userTypeName) => {
    setSelectedUserType(userTypeName);
    
    // Update badge categories based on selected user type using stored API data
    if (apiData) {
      const selectedType = apiData.userTypeList.find(type => type.userTypeName === userTypeName);
      if (selectedType) {
        setBadgeCategories(selectedType.categoryList || []);
      }
    }
  };

  const handleEdit = (category) => {
    console.log('Edit clicked for:', category);
  };

  const handleDelete = (category) => {
    console.log('Delete clicked for:', category);
  };

  const handleAddNewUserType = () => {
    console.log('Add new user type clicked');
  };

  const handleDeleteUserType = () => {
    console.log('Delete user type clicked');
  };

  const handleAddBadgeCategory = () => {
    console.log('Add badge category clicked');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-black mb-4 sm:mb-0">
            Configuration
          </h1>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <button 
              onClick={handleAddNewUserType}
              className="flex items-center justify-center px-6 py-3 border-2 border-green-500 text-green-600 rounded-full hover:bg-green-50 transition-colors font-medium"
            >
              <Plus size={20} className="mr-2" />
              Add New User Type
            </button>
            
            <button 
              onClick={handleDeleteUserType}
              className="flex items-center justify-center px-6 py-3 border-2 border-red-500 text-red-600 rounded-full hover:bg-red-50 transition-colors font-medium"
            >
              <Plus size={20} className="mr-2 rotate-45" />
              Delete User Type
            </button>
          </div>
        </div>

        {/* User Type Tabs */}
        <div className="flex flex-wrap gap-4 mb-8">
          {userTypes.map((userType, index) => (
            <button
              key={userType.id}
              onClick={() => handleUserTypeClick(userType.name)}
              className={`px-8 py-4 font-semibold text-lg border-2 transition-colors ${
                selectedUserType === userType.name
                  ? 'bg-red-600 text-white border-red-600'
                  : 'bg-white text-red-600 border-red-600 hover:bg-red-50'
              } ${
                index === 0 ? 'rounded-l-lg' : 
                index === userTypes.length - 1 ? 'rounded-r-lg' : ''
              }`}
            >
              {userType.name}
            </button>
          ))}
        </div>

        {/* Add Badge Category Button */}
        <div className="flex justify-end mb-6">
          <button
            onClick={handleAddBadgeCategory}
            className="flex items-center px-6 py-3 bg-white border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors shadow-sm"
          >
            <Plus size={20} className="mr-2 text-gray-400" />
            <span className="text-gray-600 font-medium">Add Badge category</span>
          </button>
        </div>

        {/* Main Content Area */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          {/* Description Section */}
          <div className="mb-8">
            <h3 className="text-gray-500 font-medium mb-4">Description</h3>
            <p className="text-gray-800 leading-relaxed">
              {userTypes.find(type => type.name === selectedUserType)?.description || 
               "Lorem ipsum dolor sit amet consectetur. Purus euismod turpis feugiat nisl tortor amet sit. Iaculis leo nisl volutpat mattis aliquam at in. Eu pulvinar nec enim fermentum vestibulum dolor turpis convallis."}
            </p>
          </div>

          {/* Badge Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {badgeCategories.length > 0 ? (
              badgeCategories.map((category) => (
                <div key={category.categoryId} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <h3 className="text-xl font-semibold text-black">
                    {category.categoryName}
                  </h3>
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleEdit(category)}
                      className="px-6 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors font-medium text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(category)}
                      className="px-6 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-colors font-medium text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-8 text-gray-500">
                No badge categories available for this user type.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Configuration;