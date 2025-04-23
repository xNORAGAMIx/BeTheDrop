import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <>
      <div className="bg-gray-800 text-black py-4 px-6 shadow-md">
        <Header />
      </div>

      <div className="flex flex-row">
        <div className="w-full md:w-1/4">
          <Sidebar />
        </div>
        <div className="w-full md:w-3/4">{children}</div>
      </div>
    </>
  );
};

export default Layout;
