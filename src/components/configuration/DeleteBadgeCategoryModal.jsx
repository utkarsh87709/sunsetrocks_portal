import React, { useState } from 'react';
import { post } from '../../api/api';

const DeleteBadgeCategoryModal = ({ onClose, badgeCategories = [], refresh }) => {
  const [deleting, setDeleting] = useState(null); // Track which item is being deleted

  const handleDelete = async (category) => {
    setDeleting(category.categoryId);
    
    try {
      const response = await post('/deleteUserTypeCategory', {
        categoryId: category.categoryId
      });
      
      console.log(response);
      
      // Refresh the data if callback provided
      if (refresh) {
        refresh();
        onClose();
      }
      
      setDeleting(null);
    } catch (error) {
      console.error('Error deleting badge category:', error);
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
          <h2 className="text-2xl font-semibold text-gray-900">Delete Badge Category</h2>
        </div>

        {/* Badge Categories List */}
        <div className="p-6 max-h-96 overflow-y-auto">
          {badgeCategories.length > 0 ? (
            <div className="space-y-4">
              {badgeCategories.map((category) => (
                <div key={category.categoryId} className="bg-gray-50 rounded-xl p-4 flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 mb-1">{category.categoryName}</h3>
                    <p className="text-sm text-gray-600">Category ID: {category.categoryId}</p>
                  </div>
                  <button
                    onClick={() => handleDelete(category)}
                    disabled={deleting === category.categoryId}
                    className={`px-6 py-2 rounded-xl text-white font-medium transition-all duration-200 whitespace-nowrap ${
                      deleting === category.categoryId
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-[#FF0808] hover:bg-red-600 hover:shadow-md'
                    }`}
                  >
                    {deleting === category.categoryId ? 'Deleting...' : 'Delete'}
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No badge categories available to delete.
            </div>
          )}
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
      </div>
    </div>
  );
};

export default DeleteBadgeCategoryModal;