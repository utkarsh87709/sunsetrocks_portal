import React, { useState } from 'react';
import { post } from '../../api/api';

const AddUserTypeModal = ({ onClose,refresh }) => {
  const [userTypeName, setUserTypeName] = useState('');
  const [description, setDescription] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState('');

  const handleCreateUserType = async () => {
    if (!userTypeName.trim()) return;
    
    setIsCreating(true);
    setError('');
    
    try {
      const response = await post('/createUserType', {
        userTypeName: userTypeName.trim(),
        userTypeDescription: description.trim()
      });
       console.log(response);

      if(!response.meta.status){
        alert(response.meta.message)
      }
      else{
         refresh();

   
      onClose();

      }
     
     
    } catch (error) {
      alert("Failed to create User Type")
      console.error('Error creating user type:', error);
      setError(error.message || 'Failed to create user type. Please try again.');
    } finally {
      setIsCreating(false);
    }
  };

  const handleCancel = () => {
    setUserTypeName('');
    setDescription('');
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-900">Add A User Type</h2>
        </div>

        {/* Form Content */}
        <div className="space-y-6">
          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-red-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          )}

          {/* User Type Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              User Type Name
            </label>
            <input
              type="text"
              value={userTypeName}
              onChange={(e) => setUserTypeName(e.target.value)}
              placeholder="Enter user type name"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF0808] focus:border-transparent transition-all duration-200"
            />
          </div>

          {/* Description Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF0808] focus:border-transparent transition-all duration-200 resize-none"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-8">
          <button
            onClick={handleCancel}
            className="flex-1 px-6 py-3 text-gray-700 font-medium rounded-xl border border-gray-300 hover:bg-gray-50 transition-all duration-200"
            disabled={isCreating}
          >
            Cancel
          </button>
          <button
            onClick={handleCreateUserType}
            disabled={!userTypeName.trim() || isCreating}
            className={`flex-1 px-6 py-3 text-white font-medium rounded-xl transition-all duration-200 ${
              !userTypeName.trim() || isCreating
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-[#FF0808] hover:bg-red-600 hover:shadow-md'
            }`}
          >
            {isCreating ? 'Creating...' : 'Create User Type'}
          </button>
        </div>

        {/* Close button - small X in top right */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default AddUserTypeModal;