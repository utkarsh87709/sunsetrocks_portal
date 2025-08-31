import React from "react";
import AuthBanner from '../../assets/AuthBanner.webp';

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-white">
      <div className="flex min-h-screen">
        {/* Left banner image - hidden on mobile and tablets */}
        <div className="hidden lg:flex lg:w-1/2 relative">
          <img
            src={AuthBanner}
            alt="Auth banner"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right content area - full width on mobile, half on desktop */}
        <div className="w-full lg:w-1/2 flex flex-col">
          <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8 xl:p-12">
            <div className="w-full max-w-md">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}