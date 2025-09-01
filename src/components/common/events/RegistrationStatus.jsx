const RegistrationStatus = ({ registrationStatus, variant = 'desktop' }) => {
  const isMobile = variant === 'mobile';
  
  return (
    <div className={isMobile ? "bg-gray-50 rounded-lg p-3" : "text-xs text-gray-600"}>
      <div className={`text-xs font-medium text-gray-700 ${isMobile ? 'mb-2' : 'mb-1'}`}>
        User Registration Status:
      </div>
      <div className={isMobile ? "grid grid-cols-2 gap-2 text-xs" : "space-y-1"}>
        <div className="flex justify-between">
          <span>Pending:</span>
          <span className="font-medium">{registrationStatus.pending}</span>
        </div>
        <div className="flex justify-between">
          <span>Approved:</span>
          <span className="font-medium">{registrationStatus.approved}</span>
        </div>
        <div className="flex justify-between">
          <span>Rejected:</span>
          <span className="font-medium">{registrationStatus.rejected}</span>
        </div>
        <div className="flex justify-between">
          <span>Badge Collected:</span>
          <span className="font-medium">{registrationStatus.badgeCollected}</span>
        </div>
      </div>
      <div className={`${isMobile ? 'mt-2' : ''} flex items-center gap-2`}>
        <span className="text-xs">Checked-In:</span>
        <span className={`text-xs font-medium ${
          registrationStatus.checkedIn ? 'text-green-600' : 'text-gray-500'
        }`}>
          {registrationStatus.checkedIn ? 'Yes' : 'No'}
        </span>
      </div>
    </div>
  );
};

export default RegistrationStatus;