import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <div>
        <Header />
      </div>

      {/* Body: Sidebar + Content */}
      <div className="flex flex-1 overflow-hidden m-1">
        {/* Sidebar */}
        <div className="overflow-y-auto">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;