import React, { useState } from 'react';
import { post } from '../../api/api';

const DeleteUserTypeModal = ({ onClose, userTypes,refresh }) => {
  const [deleting, setDeleting] = useState(null); // Track which item is being deleted

  const handleDelete = async (userTypeId) => {
    setDeleting(userTypeId);
    console.log(userTypeId)
    try {
      const response = await post('/deleteUserType', {
      userTypeId
      });
      
     if(response.meta.status){
      onClose();refresh();
     }
     else{
      alert(response.meta.message);
     }
      
      // You might want to refresh the list or remove the item from local state here
      // For now, we'll just stop the loading state
      setDeleting(null);
    } catch (error) {
      console.error('Error deleting user type:', error);
      setDeleting(null);
    }
  };

 

 

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-xl w-full max-w-2xl mx-4 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="text-center py-6 border-b border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-900">Delete User Type</h2>
        </div>

        {/* Bottom Close Button - Half inside, half outside */}
        <button
          onClick={onClose}
          className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-[#FF0808] hover:bg-red-600 text-white p-3 rounded-full transition-all duration-200 hover:shadow-md z-10"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* User Types List */}
        <div className="p-6 max-h-96 overflow-y-auto">
          <div className="space-y-4">
            {userTypes.map((userType) => (
              <div key={userType.id} className="bg-gray-50 rounded-xl p-4 flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 mb-1">{userType.name}</h3>
                  <p className="text-sm text-gray-600 truncate pr-4">{userType.description}</p>
                </div>
                <button
                  onClick={() => handleDelete(userType.id)}
                  disabled={deleting === userType.id}
                  className={`px-6 py-2 rounded-xl text-white font-medium transition-all duration-200 whitespace-nowrap ${
                    deleting === userType.id
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-[#FF0808] hover:bg-red-600 hover:shadow-md'
                  }`}
                >
                  {deleting === userType.id ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Close Button */}
        <div className="flex justify-center pb-6">
        
        </div>
      </div>
    </div>
  );
};

export default DeleteUserTypeModal;