import React, { useState } from 'react';

const CopyLinkModal = ({ link, onClose }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        onClose();
      }, 1500);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = link;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        onClose();
      }, 1500);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-lg mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Content */}
        <div className="flex items-center gap-4">
          {/* Link Display */}
          <div className="flex-1 min-w-0">
            <div className="bg-gray-50 rounded-lg px-4 py-3 border">
              <div className="text-sm text-gray-800 truncate" title={link}>
                {link}
              </div>
            </div>
          </div>

          {/* Copy Button */}
          <button
            onClick={handleCopyLink}
            className={`px-6 py-3 rounded-xl text-white font-medium transition-all duration-200 whitespace-nowrap ${
              copied 
                ? 'bg-[#FF0808] cursor-default' 
                : 'bg-[#FF0808] hover:bg-red-600 hover:shadow-md'
            }`}
            disabled={copied}
          >
            {copied ? 'Copied!' : 'Copy Link'}
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

export default CopyLinkModal;