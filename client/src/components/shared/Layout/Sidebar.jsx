import React from "react";
import { useLocation, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { BiSolidDonateBlood, BiTransferAlt } from "react-icons/bi";
import { CgOrganisation } from "react-icons/cg";
import { MdOutlineInventory } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";
import { GoAlertFill } from "react-icons/go";
import {
  FaWarehouse,
  FaHospital,
  FaHandHoldingMedical,
  FaUsers,
  FaDonate,
} from "react-icons/fa";
import { Building2 } from "lucide-react";

const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  const menuItems = [
    {
      role: "admin",
      items: [
        { path: "/donor-list", label: "Donors", icon: <FaUsers /> },
        {
          path: "/hospital",
          label: "Hospitals",
          icon: <FaHospital />,
        },
        { path: "/addHospital", label: "Add ", icon: <Building2 /> },
      ],
    },
    {
      role: "hospital",
      items: [
        { path: "/donations", label: "Donations", icon: <FaDonate /> },
        { path: "/transfer", label: "Transfer", icon: <BiTransferAlt /> },
        { path: "/donor-list", label: "Donors", icon: <FaUsers /> },
        { path: "/blood", label: "Inventory", icon: <MdOutlineInventory /> },
        {
          path: "/createDonation",
          label: "Add Donation",
          icon: <IoIosAddCircle />,
        },
        { path: "/alert", label: "Alerts", icon: <GoAlertFill /> },
        { path: "/analytics", label: "Analytics", icon: <FaHospital /> },
      ],
    },
    {
      role: "donor",
      items: [
        { path: "/donation", label: "Donation", icon: <BiSolidDonateBlood /> },
        { path: "/hospital", label: "Hospitals", icon: <FaHospital /> },
        { path: "/donor-alerts", label: "Alerts", icon: <GoAlertFill /> },
        { path: "/donor-responses", label: "Responses", icon: <FaHospital /> },
      ],
    },
  ];

  const renderMenu = () => {
    const currentRoleMenu = menuItems.find((menu) => menu.role === user?.role);

    if (!currentRoleMenu) return null;

    return currentRoleMenu.items.map((item) => {
      const isActive = location.pathname.startsWith(item.path);

      return (
        <div key={item.path}>
          <Link
            to={item.path}
            className={`flex items-center space-x-4 p-4 rounded-lg transition-colors duration-300
              ${
                isActive
                  ? "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg"
                  : "bg-[#1a1a2e] text-gray-300 hover:bg-[#16213e] hover:text-white"
              }`}
          >
            <div
              className={`text-2xl ${
                isActive ? "text-white" : "text-gray-400 hover:text-white"
              }`}
            >
              {item.icon}
            </div>
            <span className="text-lg font-medium">{item.label}</span>
          </Link>
        </div>
      );
    });
  };

  return (
    <div className="h-full bg-[#0f0f1a] text-white shadow-xl mx-1 rounded-xl flex flex-col border-r border-[#16213e]">
      {/* Menu (Scrollable) */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">{renderMenu()}</div>

      {/* Image Below the Menu */}
      <div className="p-6 flex justify-center">
        <img
          src="/transfer.jpg"
          alt="Sidebar Image"
          className="max-w-full h-48 rounded-lg object-cover border border-[#16213e]"
        />
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-[#16213e] text-gray-400 text-sm text-center">
        © {new Date().getFullYear()} BeTheDrop
      </div>
    </div>
  );
};

export default Sidebar;
