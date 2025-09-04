import React, { useState } from 'react';
import { post } from '../../api/api';

const CreateBadgeCategoryModal = ({ onClose, selectedUserTypeId, refresh }) => {
  const [categoryName, setCategoryName] = useState('');
  const [categoryHtml, setCategoryHtml] = useState('');
  const [qrX, setQrX] = useState('');
  const [qrY, setQrY] = useState('');
  const [qrHeight, setQrHeight] = useState('');
  const [qrWidth, setQrWidth] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState('');

  const handleCreateBadgeCategory = async () => {
    if (!categoryName.trim() || !categoryHtml.trim()) {
      setError('Category Name and Category HTML are required');
      return;
    }
    
    setIsCreating(true);
    setError('');
    
    try {
      const response = await post('/createUserTypeCategory', {
        userTypeId: selectedUserTypeId,
        categoryName: categoryName.trim(),
        badgeUrl: categoryHtml.trim(),
        qrHeight: parseInt(qrHeight) || 157,
        qrWidth: parseInt(qrWidth) || 157,
        xCoordinate: parseInt(qrX) || 435,
        yCoordinate: parseInt(qrY) || 708
      });
      
      console.log(response);
      
      // Reset form and close modal on success
      setCategoryName('');
      setCategoryHtml('');
      setQrX('');
      setQrY('');
      setQrHeight('');
      setQrWidth('');
      onClose();
      
      // Refresh the data if callback provided
      if (refresh) {
        refresh();
      }
    } catch (error) {
      console.error('Error creating badge category:', error);
      setError(error.message || 'Failed to create badge category. Please try again.');
    } finally {
      setIsCreating(false);
    }
  };

  const handleCancel = () => {
    setCategoryName('');
    setCategoryHtml('');
    setQrX('');
    setQrY('');
    setQrHeight('');
    setQrWidth('');
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-lg mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-900">Create Badge Category</h2>
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

          {/* Category Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category Name
            </label>
            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Enter category name"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF0808] focus:border-transparent transition-all duration-200"
            />
          </div>

          {/* Category HTML Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Badge URL
            </label>
            <textarea
              value={categoryHtml}
              onChange={(e) => setCategoryHtml(e.target.value)}
              placeholder="Enter Badge Url"
              rows={6}
              className="w-full px-4 py-3 border-2 border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF0808] focus:border-transparent transition-all duration-200 resize-none font-mono text-sm"
            />
          </div>

          {/* QR Code Coordinates */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              QR Code Co-ordinates
            </label>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                value={qrX}
                onChange={(e) => setQrX(e.target.value)}
                placeholder="X coordinate"
                className="w-full px-4 py-3 border-2 border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF0808] focus:border-transparent transition-all duration-200"
              />
              <input
                type="number"
                value={qrY}
                onChange={(e) => setQrY(e.target.value)}
                placeholder="Y coordinate"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF0808] focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>

          {/* QR Code Height & Width */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              QR Code Height & Width
            </label>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                value={qrHeight}
                onChange={(e) => setQrHeight(e.target.value)}
                placeholder="Height"
                className="w-full px-4 py-3 border-2 border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF0808] focus:border-transparent transition-all duration-200"
              />
              <input
                type="number"
                value={qrWidth}
                onChange={(e) => setQrWidth(e.target.value)}
                placeholder="Width"
                className="w-full px-4 py-3 border-2 border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF0808] focus:border-transparent transition-all duration-200"
              />
            </div>
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
            onClick={handleCreateBadgeCategory}
            disabled={!categoryName.trim() || !categoryHtml.trim() || isCreating}
            className={`flex-1 px-6 py-3 text-white font-medium rounded-xl transition-all duration-200 ${
              !categoryName.trim() || !categoryHtml.trim() || isCreating
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-[#E91E63] hover:bg-orange-600 hover:shadow-md'
            }`}
          >
            {isCreating ? 'Saving...' : 'Save'}
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

export default CreateBadgeCategoryModal;