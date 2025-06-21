import React from "react";

const Spinner = ({ size = "md", overlay = true }) => {
  // Size options
  const sizeClasses = {
    sm: "w-8 h-8 border-3",
    md: "w-12 h-12 border-4",
    lg: "w-16 h-16 border-[5px]",
    xl: "w-20 h-20 border-[6px]",
  };

  return (
    <div
      className={`flex items-center justify-center ${
        overlay ? "fixed inset-0 bg-black bg-opacity-30 z-50" : "h-full w-full"
      }`}
    >
      <div className="relative">
        {/* Main spinner */}
        <div
          className={`${sizeClasses[size]} border-white/30 rounded-full animate-spin`}
        ></div>

        {/* Accent element for better visibility */}
        <div
          className={`${sizeClasses[size]} absolute top-0 left-0 border-transparent border-b-[#ff3d00] rounded-full animate-spin`}
          style={{ animationDelay: "0.1s" }}
        ></div>

        {/* Optional text (uncomment if needed) */}
        {/* <p className="text-white mt-4 text-sm font-medium">Loading...</p> */}
      </div>
    </div>
  );
};

export default Spinner;
