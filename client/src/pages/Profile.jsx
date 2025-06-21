import Layout from "../components/shared/Layout/Layout";
import { useState, useEffect } from "react";
import Spinner from "../components/shared/Spinner";
import API from "../services/API";
import {
  MdDeleteForever,
  MdAddCircle,
  MdEdit,
  MdCheckCircle,
} from "react-icons/md";
import { FaUserShield, FaUserInjured, FaUserNurse } from "react-icons/fa";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [newCondition, setNewCondition] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});

  const handleDeleteCondition = async (condition) => {
    try {
      const { data } = await API.post("/user/remove-health-condition", {
        condition,
      });
      if (data.status) {
        console.log("Health condition deleted successfully");
        getUserProfile();
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
        setNewCondition("");
        getUserProfile();
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
        setEditData({
          name: data.user.name,
          email: data.user.email,
          contact: data.user.contact,
          address: data.user.address,
          age: data.user.age,
          gender: data.user.gender,
        });
      }
    } catch (error) {
      console.log("Error fetching user profile:", error.message);
    }
  };

  const handleAvailability = async () => {
    try {
      await API.post("user/toggle-avail");
      getUserProfile();
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = async () => {
    try {
      const { data } = await API.put("/user/update-profile", editData);
      if (data.status) {
        getUserProfile();
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  const renderRoleIcon = () => {
    switch (user?.role) {
      case "admin":
        return <FaUserShield className="text-blue-600" />;
      case "hospital":
        return <FaUserNurse className="text-green-600" />;
      default:
        return <FaUserInjured className="text-red-600" />;
    }
  };

  return (
    <Layout>
      {!user ? (
        <Spinner />
      ) : (
        <div className="flex justify-center p-4 md:p-8">
          <div className="w-full max-w-6xl bg-white rounded-xl shadow-lg overflow-hidden flex flex-col border border-gray-200">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-blue-700 to-blue-900 p-6 text-white relative">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
                    {renderRoleIcon()}
                    User Profile
                  </h1>
                  <p className="text-blue-100 mt-1">
                    Manage your personal information
                  </p>
                </div>
                <button
                  onClick={handleEditToggle}
                  className="flex items-center gap-1 bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full text-sm transition-all"
                >
                  {isEditing ? (
                    <>
                      <MdCheckCircle size={16} />
                      Cancel
                    </>
                  ) : (
                    <>
                      <MdEdit size={16} />
                      Edit Profile
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 flex-grow">
              {/* Sidebar */}
              <div className="bg-gradient-to-b from-blue-50 to-blue-100 p-6 md:p-8 flex flex-col items-center text-center border-r border-gray-200">
                <div className="relative group">
                  <div className="w-32 h-32 bg-blue-200 rounded-full shadow-lg mb-4 overflow-hidden border-4 border-white">
                    <img
                      src="./transfer.jpg"
                      alt="User Avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {isEditing && (
                    <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="text-white bg-blue-600 p-2 rounded-full">
                        <MdEdit size={20} />
                      </button>
                    </div>
                  )}
                </div>

                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={editData.name}
                    onChange={handleEditChange}
                    className="text-xl md:text-2xl font-bold text-gray-800 bg-white border border-blue-300 rounded px-2 py-1 mb-2 w-full text-center"
                  />
                ) : (
                  <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                    {user.name}
                  </h2>
                )}

                <p className="text-gray-500 text-xs mt-1">ID: {user._id}</p>

                <div className="mt-6 space-y-3 w-full">
                  <span
                    onClick={user.role === "donor" ? handleAvailability : null}
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                      user.role !== "donor"
                        ? "bg-gray-800 text-white cursor-default"
                        : user.isAvailable
                        ? "bg-green-100 text-green-800 cursor-pointer hover:bg-green-200"
                        : "bg-red-100 text-red-800 cursor-pointer hover:bg-red-200"
                    } transition-colors`}
                  >
                    {user.role !== "donor"
                      ? `${user.role.toUpperCase()}`
                      : user.isAvailable
                      ? "AVAILABLE TO DONATE"
                      : "CURRENTLY UNAVAILABLE"}
                  </span>

                  {user.bloodGroup && (
                    <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100">
                      <p className="text-sm text-gray-600 font-medium">
                        Blood Group
                      </p>
                      <p className="text-2xl font-bold text-red-600">
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
                  <h3 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b border-blue-200 flex items-center gap-2">
                    <FaUserShield className="text-blue-500" />
                    Personal Information
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div className="space-y-4">
                      <InfoField
                        label="Age"
                        value={
                          isEditing ? (
                            <input
                              type="number"
                              name="age"
                              value={editData.age || ""}
                              onChange={handleEditChange}
                              className="border border-gray-300 rounded px-2 py-1 w-full"
                            />
                          ) : (
                            user.age || "N/A"
                          )
                        }
                      />
                      <InfoField
                        label="Gender"
                        value={
                          isEditing ? (
                            <select
                              name="gender"
                              value={editData.gender || ""}
                              onChange={handleEditChange}
                              className="border border-gray-300 rounded px-2 py-1 w-full"
                            >
                              <option value="">Select Gender</option>
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                              <option value="Other">Other</option>
                            </select>
                          ) : (
                            user.gender || "N/A"
                          )
                        }
                      />
                      <InfoField
                        label="Email"
                        value={
                          isEditing ? (
                            <input
                              type="email"
                              name="email"
                              value={editData.email || ""}
                              onChange={handleEditChange}
                              className="border border-gray-300 rounded px-2 py-1 w-full"
                            />
                          ) : (
                            user.email || "N/A"
                          )
                        }
                        important
                      />
                    </div>
                    <div className="space-y-4">
                      <InfoField
                        label="Contact"
                        value={
                          isEditing ? (
                            <input
                              type="tel"
                              name="contact"
                              value={editData.contact || ""}
                              onChange={handleEditChange}
                              className="border border-gray-300 rounded px-2 py-1 w-full"
                            />
                          ) : (
                            user.contact || "N/A"
                          )
                        }
                        important
                      />
                      <InfoField
                        label="Address"
                        value={
                          isEditing ? (
                            <input
                              type="text"
                              name="address"
                              value={editData.address || ""}
                              onChange={handleEditChange}
                              className="border border-gray-300 rounded px-2 py-1 w-full"
                            />
                          ) : (
                            user.address || "N/A"
                          )
                        }
                      />
                      <InfoField
                        label="Last Donation"
                        value={
                          user.lastDonationDate
                            ? new Date(
                                user.lastDonationDate
                              ).toLocaleDateString()
                            : "N/A"
                        }
                      />
                    </div>
                  </div>

                  {isEditing && (
                    <div className="mt-6 flex justify-end">
                      <button
                        onClick={handleSaveChanges}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                      >
                        <MdCheckCircle size={18} />
                        Save Changes
                      </button>
                    </div>
                  )}

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
                  <h3 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b border-blue-200 flex items-center gap-2">
                    <FaUserInjured className="text-red-500" />
                    Health Conditions
                  </h3>

                  {user.healthConditions.length === 0 ? (
                    <div className="bg-blue-50 rounded-lg p-4 text-center">
                      <p className="text-gray-500 italic">
                        No health conditions recorded
                      </p>
                    </div>
                  ) : (
                    <ul className="space-y-3 mb-6">
                      {user.healthConditions.map((condition, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="flex items-center justify-between bg-white rounded-lg p-3 shadow-sm border border-gray-100 hover:shadow-md transition-all"
                        >
                          <span className="font-medium text-gray-800">
                            {condition}
                          </span>
                          <button
                            onClick={() => handleDeleteCondition(condition)}
                            className="text-red-500 hover:text-red-700 transition-colors p-1 rounded-full hover:bg-red-50"
                            title="Remove condition"
                          >
                            <MdDeleteForever size={20} />
                          </button>
                        </motion.li>
                      ))}
                    </ul>
                  )}

                  <div className="flex items-center gap-2 mt-4">
                    <input
                      type="text"
                      placeholder="Add new health condition (e.g. Diabetes)"
                      value={newCondition}
                      onChange={(e) => setNewCondition(e.target.value)}
                      className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                      onKeyPress={(e) =>
                        e.key === "Enter" && handleAddCondition()
                      }
                    />
                    <button
                      onClick={handleAddCondition}
                      className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors flex items-center justify-center shadow-md hover:shadow-lg"
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
    <p className="text-sm text-gray-500 font-medium mb-1">{label}</p>
    <div
      className={`font-semibold ${
        important ? "text-blue-700" : "text-gray-800"
      }`}
    >
      {value}
    </div>
  </div>
);

export default Profile;
