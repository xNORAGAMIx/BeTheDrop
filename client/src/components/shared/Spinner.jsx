import React from "react";

const Spinner = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-black bg-opacity-30">
      <div className="w-12 h-12 border-4 border-white border-b-4 border-b-[#ff3d00] rounded-full animate-spin"></div>
    </div>
  );
};

export default Spinner;
