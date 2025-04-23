import React from "react";
import { BiDonateBlood, BiUserCircle } from "react-icons/bi";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useSelector } from "react-redux";
const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();
  // logout handler
  const handleLogout = () => {
    localStorage.clear();
    alert("Logout Successfully");
    navigate("/login");
  };

  return (
    <>
      <nav className="bg-white shadow-md">
        <div className="max-w-screen-xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <BiDonateBlood color="red" />
            <span className="text-xl font-semibold">Blood Bank App</span>
          </div>
          <ul className="flex items-center space-x-6">
            <li className="text-lg">
              <p className="flex items-center space-x-2">
                <BiUserCircle />
                <span>
                  Welcome{" "}
                  {user?.name || user?.hospitalName || user?.organisationName}
                  &nbsp;
                  <span className="bg-gray-500 text-white px-2 py-1 rounded-md">
                    {user?.role}
                  </span>
                </span>
              </p>
            </li>
            {location.pathname === "/" ||
            location.pathname === "/donar" ||
            location.pathname === "/hospital" ? (
              <li className="text-lg">
                <Link
                  to="/analytics"
                  className="text-blue-600 hover:text-blue-800"
                >
                  Analytics
                </Link>
              </li>
            ) : (
              <li className="text-lg">
                <Link to="/" className="text-blue-600 hover:text-blue-800">
                  Home
                </Link>
              </li>
            )}
            <li>
              <button
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Header;
