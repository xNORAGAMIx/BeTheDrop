import Layout from "../components/shared/Layout/Layout";
import { useState, useEffect } from "react";
import Spinner from "../components/shared/Spinner";
import API from "../services/API";
import { MdDeleteForever, MdAddCircle } from "react-icons/md";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [newCondition, setNewCondition] = useState("");

  const handleDeleteCondition = async (condition) => {
    try {
      const { data } = await API.post("/user/remove-health-condition", {
        condition,
      });
      if (data.status) {
        console.log("Health condition deleted successfully");
        getUserProfile();
      } else {
        console.error("Failed to delete health condition");
      }
    } catch (error) {
      console.error("Error deleting health condition:", error);
    }
  };

  const handleAddCondition = async () => {
    if (!newCondition.trim()) return;
    try {
      const { data } = await API.post("/user/add-health-condition", {
        condition: newCondition,
      });
      if (data.status) {
        console.log("Health condition added successfully");
        setNewCondition("");
        getUserProfile();
      } else {
        console.error("Failed to add health condition");
      }
    } catch (error) {
      console.error("Error adding health condition:", error);
    }
  };

  const getUserProfile = async () => {
    try {
      const { data } = await API.get("user/profile");
      if (data.status) {
        setUser(data.user);
        console.log("User profile fetched successfully");
      }
    } catch (error) {
      console.log("Error fetching user profile:", error.message);
    }
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  return (
    <Layout>
      {!user ? (
        <Spinner />
      ) : (
        <div className="flex justify-center p-4 md:p-8 lg:p-12">
          <div className="w-full max-w-6xl bg-white rounded-xl shadow-lg overflow-hidden flex flex-col border border-gray-200">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-4 text-white">
              <h1 className="text-2xl md:text-3xl font-bold">User Profile</h1>
              <p className="text-blue-100">Manage your personal information</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 flex-grow">
              {/* Sidebar */}
              <div className="bg-gradient-to-b from-blue-50 to-blue-100 p-6 md:p-8 flex flex-col items-center text-center border-r border-gray-200">
                <div className="w-32 h-32 bg-blue-200 rounded-full shadow-md mb-4 overflow-hidden border-4 border-white">
                  <img
                    src="./transfer.jpg"
                    alt="User Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                  {user.name}
                </h2>
                <p className="text-gray-600 text-sm mt-1">ID: {user._id}</p>

                <div className="mt-4 space-y-3 w-full">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                      user.role !== "donor"
                        ? "bg-gray-800 text-white"
                        : user.isAvailable
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {user.role !== "donor"
                      ? user.role.toUpperCase()
                      : user.isAvailable
                      ? "AVAILABLE TO DONATE"
                      : "CURRENTLY UNAVAILABLE"}
                  </span>

                  {user.bloodGroup && (
                    <div className="bg-white p-2 rounded-lg shadow-sm">
                      <p className="text-sm text-gray-600 font-medium">
                        Blood Group
                      </p>
                      <p className="text-xl font-bold text-red-600">
                        {user.bloodGroup}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Main Content */}
              <div className="lg:col-span-2 p-6 md:p-8 flex flex-col">
                {/* Personal Information Section */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b border-blue-200">
                    Personal Information
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div className="space-y-3">
                      <InfoField label="Age" value={user.age || "N/A"} />
                      <InfoField label="Gender" value={user.gender || "N/A"} />
                      <InfoField
                        label="Email"
                        value={user.email || "N/A"}
                        important
                      />
                    </div>
                    <div className="space-y-3">
                      <InfoField
                        label="Contact"
                        value={user.contact || "N/A"}
                        important
                      />
                      <InfoField
                        label="Address"
                        value={user.address || "N/A"}
                      />
                      <InfoField
                        label="Last Donation"
                        value={
                          user.lastDonationDate
                            ? new Date(user.lastDonationDate).toDateString()
                            : "N/A"
                        }
                      />
                    </div>
                  </div>

                  {user.role === "hospital" && (
                    <div className="mt-4">
                      <InfoField
                        label="Hospital"
                        value={user.hospitalId?.name || "N/A"}
                        important
                      />
                    </div>
                  )}
                </div>

                {/* Health Conditions Section */}
                <div className="mt-4">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b border-blue-200">
                    Health Conditions
                  </h3>

                  {user.healthConditions.length === 0 ? (
                    <p className="text-gray-500 italic mb-4">
                      No health conditions recorded
                    </p>
                  ) : (
                    <ul className="space-y-2 mb-6">
                      {user.healthConditions.map((condition, index) => (
                        <li
                          key={index}
                          className="flex items-center justify-between bg-blue-50 rounded-lg p-3"
                        >
                          <span className="font-medium text-gray-800">
                            {condition}
                          </span>
                          <button
                            onClick={() => handleDeleteCondition(condition)}
                            className="text-red-500 hover:text-red-700 transition-colors"
                            title="Remove condition"
                          >
                            <MdDeleteForever size={20} />
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="flex items-center gap-2 mt-4">
                    <input
                      type="text"
                      placeholder="Add new health condition (e.g. Diabetes)"
                      value={newCondition}
                      onChange={(e) => setNewCondition(e.target.value)}
                      className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                    />
                    <button
                      onClick={handleAddCondition}
                      className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors flex items-center justify-center"
                      title="Add condition"
                    >
                      <MdAddCircle size={24} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

// Reusable component for info fields
const InfoField = ({ label, value, important = false }) => (
  <div>
    <p className="text-sm text-gray-500 font-medium">{label}</p>
    <p
      className={`font-semibold ${
        important ? "text-blue-700" : "text-gray-800"
      }`}
    >
      {value}
    </p>
  </div>
);

export default Profile;