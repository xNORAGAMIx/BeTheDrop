import React from "react";
// import { userMenu } from "./Menus/userMenu";
import { useLocation, Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { CgOrganisation } from "react-icons/cg";

const Sidebar = () => {
  //GET USER STATE
  const { user } = useSelector((state) => state.auth);

  const location = useLocation();

  return (
    <div>
      <div className="h-screen bg-[#dee0c8] text-white shadow-sm">
        <div className="menu pt-24">
          {user?.role === "organisation" && (
            <>
              <div
                className={`menu-item pt-8 ${
                  location.pathname === "/" &&
                  "bg-white text-[#2e3200] p-2 mt-6"
                }`}
              >
                <i className="fa-solid fa-warehouse text-white text-xl mr-4"></i>
                <Link to="/" className="text-white text-xl">
                  Inventory
                </Link>
              </div>
              <div
                className={`menu-item pt-8 ${
                  location.pathname === "/donar" &&
                  "bg-white text-[#2e3200] p-2 mt-6"
                }`}
              >
                <i className="fa-solid fa-hand-holding-medical text-white text-xl mr-4"></i>
                <Link to="/donar" className="text-white text-xl">
                  Donar
                </Link>
              </div>
              <div
                className={`menu-item pt-8 ${
                  location.pathname === "/hospital" &&
                  "bg-white text-[#2e3200] p-2 mt-6"
                }`}
              >
                <i className="fa-solid fa-hospital text-white text-xl mr-4"></i>
                <Link to="/hospital" className="text-white text-xl">
                  Hospital
                </Link>
              </div>
            </>
          )}
          {user?.role === "admin" && (
            <>
              <div
                className={`menu-item pt-8 ${
                  location.pathname === "/donar-list" &&
                  "bg-white text-[#2e3200] p-2 mt-6"
                }`}
              >
                <i className="fa-solid fa-warehouse text-white text-xl mr-4"></i>
                <Link to="/donar-list" className="text-white text-xl">
                  Donar List
                </Link>
              </div>
              <div
                className={`menu-item pt-8 ${
                  location.pathname === "/hospital-list" &&
                  "bg-white text-[#2e3200] p-2 mt-6"
                }`}
              >
                <i className="fa-solid fa-hand-holding-medical text-white text-xl mr-4"></i>
                <Link to="/hospital-list" className="text-white text-xl">
                  Hospital List
                </Link>
              </div>
              <div
                className={`menu-item pt-8 ${
                  location.pathname === "/org-list" &&
                  "bg-white text-[#2e3200] p-2 mt-6"
                }`}
              >
                <i className="fa-solid fa-hospital text-white text-xl mr-4"></i>
                <Link to="/org-list" className="text-white text-xl">
                  Organisation List
                </Link>
              </div>
            </>
          )}
          {(user?.role === "donor" || user?.role === "hospital") && (
            <div
              className={`menu-item pt-8 flex items-center ${
                location.pathname === "/organisation" &&
                "bg-white text-[#33351f] p-2 mt-6"
              }`}
            >
              <CgOrganisation className="text-4xl mr-3 text-black" />
              <Link to="/organisation" className="text-black text-xl">
                Organisation
              </Link>
            </div>
          )}
          {user?.role === "hospital" && (
            <div
              className={`menu-item pt-8 ${
                location.pathname === "/consumer" &&
                "bg-white text-[#2e3200] p-2 mt-6"
              }`}
            >
              <i className="fa-sharp fa-solid fa-building-ngo text-white text-xl mr-4"></i>
              <Link to="/consumer" className="text-white text-xl">
                Consumer
              </Link>
            </div>
          )}
          {user?.role === "donar" && (
            <div
              className={`menu-item pt-8 ${
                location.pathname === "/donation" &&
                "bg-white text-[#2e3200] p-2 mt-6"
              }`}
            >
              <i className="fa-sharp fa-solid fa-building-ngo text-white text-xl mr-4"></i>
              <Link to="/donation" className="text-white text-xl">
                Donation
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
