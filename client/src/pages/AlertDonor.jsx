import { useState, useEffect } from "react";
import API from "../services/API";
import Layout from "../components/shared/Layout/Layout";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Droplet,
  AlertTriangle,
  Hospital,
  Calendar,
  MessageCircleMore,
  View,
} from "lucide-react";

const AlertDonor = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [bloodGroupFilter, setBloodGroupFilter] = useState("All");
  const [hospitalFilter, setHospitalFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("All");
  const [hospitals, setHospitals] = useState([]);

  const bloodGroups = ["All", "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const dateOptions = ["All", "Today", "Last 7 days", "Last 30 days"];

  const fetchAlerts = async () => {
    try {
      setLoading(true);
      const { data } = await API.get("/alert");
      if (data.status) {
        const sortedAlerts = data.alerts.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
        setAlerts(sortedAlerts);
        setFilteredData(data.alerts);
        
        // Extract unique hospitals
        const uniqueHospitals = [...new Set(data.alerts.map(alert => 
          alert.hospitalId?.name || "Unknown"
        ))];
        setHospitals(["All", ...uniqueHospitals]);
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error("Error fetching alerts:", error);
      setError("Failed to fetch alerts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlerts();
  }, []);

  useEffect(() => {
    let data = [...alerts];

    if (bloodGroupFilter !== "All") {
      data = data.filter((alert) => alert.bloodGroup === bloodGroupFilter);
    }

    if (hospitalFilter !== "All") {
      data = data.filter((alert) => 
        (alert.hospitalId?.name || "Unknown") === hospitalFilter
      );
    }

    if (dateFilter !== "All") {
      const now = new Date();
      let startDate = new Date();

      switch (dateFilter) {
        case "Today":
          startDate.setHours(0, 0, 0, 0);
          break;
        case "Last 7 days":
          startDate.setDate(now.getDate() - 7);
          break;
        case "Last 30 days":
          startDate.setDate(now.getDate() - 30);
          break;
        default:
          break;
      }

      data = data.filter((alert) => new Date(alert.createdAt) >= startDate);
    }

    setFilteredData(data);
  }, [alerts, bloodGroupFilter, hospitalFilter, dateFilter]);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 text-red-500 mr-3" />
            Blood Alerts
          </h1>
          <p className="text-gray-600">
            Current urgent blood needs in your area
          </p>
        </motion.div>

        {/* Filter Controls */}
        <div className="flex flex-wrap justify-center items-end gap-8 mb-8">
          <div className="flex flex-col">
            <label className="mb-2 text-lg font-semibold text-gray-700">
              Filter by Blood Group
            </label>
            <select
              value={bloodGroupFilter}
              onChange={(e) => setBloodGroupFilter(e.target.value)}
              className="px-4 py-2 text-lg border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 ease-in-out"
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
              Filter by Hospital
            </label>
            <select
              value={hospitalFilter}
              onChange={(e) => setHospitalFilter(e.target.value)}
              className="px-4 py-2 text-lg border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 ease-in-out"
            >
              {hospitals.map((hospital) => (
                <option key={hospital} value={hospital}>
                  {hospital}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label className="mb-2 text-lg font-semibold text-gray-700">
              Filter by Date
            </label>
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="px-4 py-2 text-lg border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 ease-in-out"
            >
              {dateOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <motion.div
            className="flex justify-center items-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
          </motion.div>
        ) : error ? (
          <motion.div
            className="bg-red-50 border-l-4 border-red-500 p-4 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-red-700">{error}</p>
          </motion.div>
        ) : filteredData.length === 0 ? (
          <motion.div
            className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-gray-500">No active alerts found.</p>
            <p className="text-gray-400 mt-2">
              Alerts will appear here when hospitals post urgent needs
            </p>
          </motion.div>
        ) : (
          <motion.div
            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="overflow-x-auto max-h-[500px] overflow-y-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-black">
                  <tr>
                    <th className="px-6 py-4 text-left text-xl font-medium text-white uppercase tracking-wider">
                      <div className="flex items-center">
                        <Droplet className="w-4 h-4 mr-2" /> Blood Group
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-xl font-medium text-white uppercase tracking-wider">
                      <div className="flex items-center">
                        <AlertTriangle className="w-4 h-4 mr-2" /> Message
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-xsl font-medium text-white uppercase tracking-wider">
                      <div className="flex items-center">
                        <Hospital className="w-4 h-4 mr-2" /> Hospital
                      </div>
                    </th>

                    <th className="px-6 py-4 text-left text-xl font-medium text-white uppercase tracking-wider">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" /> Created
                      </div>
                    </th>

                    <th className="px-6 py-4 text-left text-xl font-medium text-white uppercase tracking-wider">
                      <div className="flex items-center">
                        <View className="w-4 h-4 mr-2" /> Actions
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-400">
                  {filteredData.map((alert, index) => (
                    <motion.tr
                      key={alert._id}
                      className="hover:bg-gray-50 transition-colors"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <td className="px-6 py-2 whitespace-nowrap">
                        <span
                          className={`px-3 py-1 rounded-full text-xl font-semibold ${
                            alert.bloodGroup.includes("+")
                              ? "bg-red-100 text-red-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {alert.bloodGroup}
                        </span>
                      </td>
                      <td className="px-6 py-2 text-xl text-gray-900">
                        {alert.message.substring(0, 30)}...
                      </td>
                      <td className="px-6 py-2 whitespace-nowrap text-xl text-gray-900">
                        {alert.hospitalId?.name || "N/A"}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-xl text-gray-500">
                        {new Date(alert.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                      <td className="px-6 py-2 whitespace-nowrap text-xl text-gray-900">
                        <Link className="text-blue-500 hover:text-blue-700" to={`/donor-alerts/${alert._id}`}>
                          <MessageCircleMore />
                        </Link>
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

export default AlertDonor;