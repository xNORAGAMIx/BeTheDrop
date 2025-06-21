import { toast } from "react-toastify";
import { FaUserAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Droplets } from "lucide-react";

const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    toast.success("Logout Successfully");
    navigate("/login");
  };

  return (
    <nav className="bg-[#1a1a2e] shadow-lg mx-1 rounded-b-xl border-b border-[#16213e]">
      <div className="container mx-auto flex justify-between items-center px-6 py-3">
        {/* Logo Section */}
        <div className="flex items-center space-x-2">
          <Droplets className="text-red-500 text-3xl" />
          <Link
            to="/"
            className="text-2xl font-bold bg-gradient-to-r from-red-500 to-red-300 bg-clip-text text-transparent"
          >
            BeTheDrop
          </Link>
        </div>

        {/* Navigation Section */}
        <div className="flex items-center space-x-6">
          {user ? (
            <>
              {/* User Info */}
              <div className="flex items-center space-x-3 bg-[#16213e] px-4 py-2 rounded-full">
                <div className="bg-red-500 p-2 rounded-full">
                  <FaUserAlt className="text-white text-sm" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-white">
                    {user?.name?.toUpperCase()}
                  </span>
                  <span className="text-xs text-gray-300">
                    {user?.role?.toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Navigation Links */}
              <div className="flex space-x-4">
                <Link
                  to="/profile"
                  className="text-sm font-medium text-white hover:text-red-300 transition-colors duration-300 flex items-center"
                >
                  Profile
                </Link>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="text-sm font-medium text-red-400 hover:text-red-300 transition-colors duration-300 cursor-pointer"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              {/* When User is Not Logged In */}
              <div className="flex space-x-4">
                <Link
                  to="/login"
                  className="text-sm font-medium text-white hover:text-red-300 transition-colors duration-300"
                >
                  Login
                </Link>
                <div>
                  <Link
                    to="/register"
                    className="bg-red-500 text-white font-medium px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-300 text-sm shadow-md"
                  >
                    Register
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
