import React, { useEffect, useState } from "react";
import Layout from "./../../components/shared/Layout/Layout";
import API from "../../services/API";
import { motion } from "framer-motion";
import { Droplet, User, Phone, Mail, MapPin, Clock } from "lucide-react";

const DonorList = () => {
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filters, setFilters] = useState({
    gender: "",
    bloodGroup: "",
    isAvailable: "",
  });

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const genders = ["Male", "Female", "Other"];
  const availabilityOptions = [
    { label: "Available", value: "true" },
    { label: "Unavailable", value: "false" },
  ];

  const getDonars = async () => {
    try {
      const { data } = await API.get("/public/donors");
      if (data?.status) {
        setData(data?.donors);
        setFiltered(data?.donors);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const updatedFilters = { ...filters, [name]: value };
    setFilters(updatedFilters);

    const filteredList = data.filter((donor) => {
      return (
        (updatedFilters.gender === "" ||
          donor.gender === updatedFilters.gender) &&
        (updatedFilters.bloodGroup === "" ||
          donor.bloodGroup === updatedFilters.bloodGroup) &&
        (updatedFilters.isAvailable === "" ||
          donor.isAvailable.toString() === updatedFilters.isAvailable)
      );
    });

    setFiltered(filteredList);
  };

  useEffect(() => {
    getDonars();
  }, []);

  const getBloodGroupColor = (bg) => {
    const colors = {
      "A+": "bg-red-100 text-red-800",
      "A-": "bg-red-200 text-red-900",
      "B+": "bg-blue-100 text-blue-800",
      "B-": "bg-blue-200 text-blue-900",
      "AB+": "bg-purple-100 text-purple-800",
      "AB-": "bg-purple-200 text-purple-900",
      "O+": "bg-orange-100 text-orange-800",
      "O-": "bg-orange-200 text-orange-900",
    };
    return colors[bg] || "bg-gray-100 text-gray-800";
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-10"
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Blood Donors
          </h1>
          <p className="text-gray-600">Find available donors in your area</p>
        </motion.div>

        {/* Filter Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
        >
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-5 rounded-xl shadow-sm border border-blue-100">
            <label className="block text-blue-800 font-medium mb-2 flex items-center">
              <User className="w-4 h-4 mr-2" /> Gender
            </label>
            <select
              name="gender"
              value={filters.gender}
              onChange={handleFilterChange}
              className="w-full bg-white border border-blue-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
            >
              <option value="">All Genders</option>
              {genders.map((gender) => (
                <option key={gender} value={gender}>
                  {gender}
                </option>
              ))}
            </select>
          </div>

          <div className="bg-gradient-to-br from-red-50 to-red-100 p-5 rounded-xl shadow-sm border border-red-100">
            <label className="block text-red-800 font-medium mb-2 flex items-center">
              <Droplet className="w-4 h-4 mr-2" /> Blood Group
            </label>
            <select
              name="bloodGroup"
              value={filters.bloodGroup}
              onChange={handleFilterChange}
              className="w-full bg-white border border-red-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-transparent"
            >
              <option value="">All Blood Groups</option>
              {bloodGroups.map((bg) => (
                <option key={bg} value={bg}>
                  {bg}
                </option>
              ))}
            </select>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 p-5 rounded-xl shadow-sm border border-green-100">
            <label className="block text-green-800 font-medium mb-2 flex items-center">
              <Clock className="w-4 h-4 mr-2" /> Availability
            </label>
            <select
              name="isAvailable"
              value={filters.isAvailable}
              onChange={handleFilterChange}
              className="w-full bg-white border border-green-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-transparent"
            >
              <option value="">All Statuses</option>
              {availabilityOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* Table Section */}
        {filtered?.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 text-center"
          >
            <p className="text-gray-500">
              No donors match your current filters.
            </p>
            <button
              onClick={() => {
                setFilters(
                  { gender: "", bloodGroup: "", isAvailable: "" },
                  getDonars()
                );
              }}
              className="mt-4 text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              Clear all filters
            </button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-black">
                  <tr>
                    <th className="px-6 py-3 text-left text-xl font-medium text-gray-100 uppercase tracking-wider">
                      <div className="flex items-center">
                        <Droplet className="w-4 h-4 mr-2" /> Blood
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xl font-medium text-gray-100 uppercase tracking-wider">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-2" /> Donor
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xl font-medium text-gray-100 uppercase tracking-wider">
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 mr-2" /> Contact
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xl font-medium text-gray-100 uppercase tracking-wider">
                      <div className="flex items-center">
                        <Mail className="w-4 h-4 mr-2" /> Email
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xl font-medium text-gray-100 uppercase tracking-wider">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2" /> Location
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xl font-medium text-gray-100 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filtered.map((donor) => (
                    <motion.tr
                      key={donor._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${getBloodGroupColor(
                            donor.bloodGroup
                          )}`}
                        >
                          {donor.bloodGroup}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {donor.name}
                        </div>
                        <div className="text-xs text-gray-500 capitalize">
                          {donor.gender}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {donor.contact}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {donor.email}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                        {donor.address}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            donor.isAvailable
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {donor.isAvailable ? "Available" : "Unavailable"}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </div>
    </Layout>
  );
};

export default DonorList;
