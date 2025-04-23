import { useState, useEffect } from "react";
import Layout from "../../components/shared/Layout/Layout";
import API from "../../services/API";
import { Link } from "react-router-dom";
import { Eye, AlertTriangle, ChevronDown, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";
import { MdToggleOff, MdToggleOn } from "react-icons/md";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const Alert = () => {
  const [bloodGroup, setBloodGroup] = useState("");
  const [message, setMessage] = useState("");
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post("/alert", {
        bloodGroup,
        message,
      });
      if (data.status) {
        setBloodGroup("");
        setMessage("");
        fetchAlerts(); // Refresh the alerts list
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error creating alert:", error);
    }
  };

  const handleToggle = async (id, currentStatus) => {
    try {
      const { data } = await API.post("/alert/toggle-alert", {
        id,
        status: !currentStatus,
      });
      if (data.status) {
        fetchAlerts(); // Refresh the alerts list
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.error("Error toggling alert:", error);
    }
  };

  const fetchAlerts = async () => {
    try {
      setLoading(true);
      const { data } = await API.get("/alert/active");
      if (data.status) {
        setAlerts(data.alerts);
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

  return (
    <Layout>
      <div className="flex flex-col items-center px-4 py-8">
        {/* Alert Creation Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-4xl bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 mb-8"
        >
          <div className="md:flex">
            {/* Image Section */}
            <div className="md:w-2/5 hidden md:block bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center">
              <div className="p-8 text-center">
                <AlertTriangle className="w-16 h-16 mx-auto text-red-400 mb-4" />
                <h3 className="text-xl font-bold text-gray-800">
                  Urgent Blood Need
                </h3>
                <p className="text-gray-600 mt-2">
                  Create an alert to find donors quickly
                </p>
              </div>
            </div>

            {/* Form Section */}
            <div className="md:w-3/5 p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-6 text-red-600 flex items-center">
                <AlertTriangle className="mr-2" /> Create Blood Alert
              </h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Blood Group <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={bloodGroup}
                      onChange={(e) => setBloodGroup(e.target.value)}
                      className="appearance-none block w-full border border-gray-300 rounded-lg px-4 py-3 pr-8 shadow-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      required
                    >
                      <option value="">Select Blood Group</option>
                      {bloodGroups.map((group) => (
                        <option key={group} value={group}>
                          {group}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 mt-6">
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe the urgent need (e.g., 'Emergency surgery requires 4 units of A+ blood')"
                    className="w-full border border-gray-300 rounded-lg p-3 shadow-sm h-32 resize-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    required
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-gradient-to-r from-red-600 to-red-500 text-white py-3 rounded-lg font-semibold hover:from-red-700 hover:to-red-600 transition shadow-md flex items-center justify-center"
                >
                  Send Alert
                </motion.button>
              </form>
            </div>
          </div>
        </motion.div>

        {/* Active Alerts Section */}
        <div className="w-full max-w-6xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              <AlertTriangle className="mr-2 text-red-500" /> Active Blood
              Alerts
            </h2>
            <button
              onClick={fetchAlerts}
              className="flex items-center text-sm text-red-600 hover:text-red-800"
            >
              <RefreshCw className="w-4 h-4 mr-1" /> Refresh
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-red-500"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
              <p className="text-red-700">{error}</p>
            </div>
          ) : alerts.length === 0 ? (
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg">
              <p className="text-blue-700">No active alerts found.</p>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-black">
                    <tr>
                      <th className="px-6 py-3 text-left text-xl font-medium text-gray-100 uppercase tracking-wider">
                        Blood Group
                      </th>
                      <th className="px-6 py-3 text-left text-xl font-medium text-gray-100 uppercase tracking-wider">
                        Message
                      </th>
                      <th className="px-6 py-3 text-left text-xl font-medium text-gray-100 uppercase tracking-wider">
                        Created
                      </th>
                      <th className="px-6 py-3 text-left text-xl font-medium text-gray-100 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xl font-medium text-gray-100 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {alerts.map((alert) => (
                      <tr
                        key={alert._id}
                        className="hover:bg-gray-50 transition"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 rounded-full text-xl font-semibold ${
                              alert.bloodGroup.includes("+")
                                ? "bg-red-100 text-red-800"
                                : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {alert.bloodGroup}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-xl text-gray-800 line-clamp-1">
                            {alert.message.substring(0, 30)}...
                          </p>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-xl text-gray-500">
                          {new Date(alert.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 rounded-full text-xl font-semibold ${
                              alert.status
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {alert.status ? "Active" : "Inactive"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-xl font-medium flex space-x-2">
                          <Link
                            to={`/alert/${alert._id}`}
                            className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                            title="View details"
                          >
                            <Eye className="w-8 h-8" />
                          </Link>
                          <button
                            onClick={() =>
                              handleToggle(alert._id, alert.status)
                            }
                            className="text-gray-600 hover:text-gray-900 p-1 rounded hover:bg-gray-50"
                            title={alert.status ? "Deactivate" : "Activate"}
                          >
                            {alert.status ? (
                              <MdToggleOn className="w-8 h-8 text-green-500" />
                            ) : (
                              <MdToggleOff className="w-8 h-8 text-gray-400" />
                            )}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Alert;
