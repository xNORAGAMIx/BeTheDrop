import React, { useEffect, useState } from "react";
import Layout from "../../components/shared/Layout/Layout";
import moment from "moment";
import API from "../../services/API";
import { motion } from "framer-motion";
import { getDonationsHospital } from "../../redux/features/donation/donationActions";
import { useSelector, useDispatch } from "react-redux";

const Donations = () => {
  const { donation } = useSelector((state) => state.donation);
  const dispatch = useDispatch();

  const [filteredData, setFilteredData] = useState([]);
  const [selectedBloodGroup, setSelectedBloodGroup] = useState("All");
  const [sortOption, setSortOption] = useState("");

  useEffect(() => {
    dispatch(getDonationsHospital());
  }, []);

  useEffect(() => {
    let data = [...donation];

    if (selectedBloodGroup !== "All") {
      data = data.filter((record) => record.bloodGroup === selectedBloodGroup);
    }

    if (sortOption === "dateAsc") {
      data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (sortOption === "dateDesc") {
      data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortOption === "quantityAsc") {
      data.sort((a, b) => a.quantityInML - b.quantityInML);
    } else if (sortOption === "quantityDesc") {
      data.sort((a, b) => b.quantityInML - a.quantityInML);
    }

    setFilteredData(data);
  }, [donation, selectedBloodGroup, sortOption]);

  const bloodGroups = [
    "All",
    "A+",
    "A-",
    "B+",
    "B-",
    "AB+",
    "AB-",
    "O+",
    "O-",
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto p-6">
        <motion.h1
          className="text-3xl font-bold mb-6 text-center text-gray-800 underline"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          DONATION RECORDS
        </motion.h1>

        {/* Filter and Sort Controls */}
        <div className="flex flex-wrap justify-center items-end gap-8 mb-8">
          <div className="flex flex-col">
            <label className="mb-2 text-lg font-semibold text-gray-700">
              Filter by Blood Group
            </label>
            <select
              value={selectedBloodGroup}
              onChange={(e) => setSelectedBloodGroup(e.target.value)}
              className="px-4 py-2 text-lg border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ease-in-out"
            >
              {bloodGroups.map((group) => (
                <option key={group} value={group}>
                  {group}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label className="mb-2 text-lg font-semibold text-gray-700">
              Sort by
            </label>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="px-4 py-2 text-lg border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ease-in-out"
            >
              <option value="">-- Select --</option>
              <option value="dateAsc">Date ↑ (Oldest)</option>
              <option value="dateDesc">Date ↓ (Newest)</option>
              <option value="quantityAsc">Quantity ↑ (Least)</option>
              <option value="quantityDesc">Quantity ↓ (Most)</option>
            </select>
          </div>
        </div>

        {filteredData.length === 0 ? (
          <motion.p
            className="text-center text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            No records found.
          </motion.p>
        ) : (
          <motion.div
            className="overflow-x-auto max-h-[500px] overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            <table className="min-w-full bg-white border border-gray-200 shadow-lg rounded-lg overflow-hidden">
              <thead className="bg-gray-900 text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-xl font-semibold uppercase tracking-wider">
                    Blood Group
                  </th>
                  <th className="px-6 py-3 text-left text-xl font-semibold uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xl font-semibold uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-left text-xl font-semibold uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xl font-semibold uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredData.map((record) => (
                  <motion.tr
                    key={record._id}
                    className="transition-transform duration-300 transform hover:scale-95"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-xl font-medium text-gray-800">
                      {record.bloodGroup}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xl font-semibold rounded-full ${
                          record.donor.isAvailable
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {record.donor.name.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-xl text-gray-700">
                      {record.quantityInML} mL
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-xl text-gray-700">
                      {record.donor.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-xl text-gray-500">
                      {moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}
      </div>
    </Layout>
  );
};

export default Donations;
