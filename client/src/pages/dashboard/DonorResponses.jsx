import { useState, useEffect } from "react";
import Layout from "../../components/shared/Layout/Layout";
import API from "../../services/API";
import { motion } from "framer-motion";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import {
  Droplet,
  ToggleRight,
  ToggleLeft,
  Activity,
  User,
  Calendar,
  AlertTriangle,
  ChevronRight,
  SquareArrowOutUpRight,
  Filter,
  X,
  ArrowUp,
  ArrowDown,
} from "lucide-react";

const DonorResponses = () => {
  const [responses, setResponses] = useState([]);
  const [filteredResponses, setFilteredResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedRow, setExpandedRow] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    bloodGroup: "",
    responseStatus: "",
  });
  const [sortConfig, setSortConfig] = useState({
    key: "createdAt",
    direction: "desc",
  });
  const navigate = useNavigate();

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const responseOptions = ["Yes", "No"];

  const fetchResponses = async () => {
    try {
      const { data } = await API.get("/response/donor-responses");
      if (data?.status) {
        const sortedData = sortData(data.responses, sortConfig);
        setResponses(sortedData);
        setFilteredResponses(sortedData);
      }
    } catch (error) {
      console.error("Error fetching responses:", error);
    } finally {
      setLoading(false);
    }
  };

  const sortData = (data, config) => {
    return [...data].sort((a, b) => {
      if (a[config.key] < b[config.key]) {
        return config.direction === "asc" ? -1 : 1;
      }
      if (a[config.key] > b[config.key]) {
        return config.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  };

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    const newSortConfig = { key, direction };
    setSortConfig(newSortConfig);

    const sortedResponses = sortData(filteredResponses, newSortConfig);
    setFilteredResponses(sortedResponses);
  };

  const handleRedirect = (responseId) => {
    navigate(`/donor-alerts/${responseId}`);
  };

  const handleToggleResponse = async (responseId) => {
    try {
      const { data } = await API.post("/response/toggle-response", {
        responseId,
      });
      if (data?.status) {
        fetchResponses();
      }
    } catch (error) {
      console.error("Error toggling response:", error);
    }
  };

  const applyFilters = () => {
    let result = [...responses];

    if (filters.bloodGroup) {
      result = result.filter(
        (response) => response.alertId?.bloodGroup === filters.bloodGroup
      );
    }

    if (filters.responseStatus) {
      result = result.filter(
        (response) => response.response === filters.responseStatus
      );
    }

    const sortedResult = sortData(result, sortConfig);
    setFilteredResponses(sortedResult);
    setShowFilters(false);
  };

  const resetFilters = () => {
    setFilters({
      bloodGroup: "",
      responseStatus: "",
    });
    const sortedResponses = sortData(responses, sortConfig);
    setFilteredResponses(sortedResponses);
    setShowFilters(false);
  };

  useEffect(() => {
    fetchResponses();
  }, []);

  const toggleRowExpand = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <motion.div
          className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-red-600 to-red-700 p-6 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Activity className="w-8 h-8 mr-3" />
                <div>
                  <h1 className="text-2xl font-bold">YOUR RESPONSE HISTORY</h1>
                  <p className="text-red-100">
                    View all your past alert responses
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center px-4 py-2 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition  text-red-600 font-extrabold"
              >
                <Filter className="w-5 h-5 mr-2" />
                Filters
              </button>
            </div>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="bg-gray-50 p-4 border-b border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {/* Blood Group Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Blood Group
                  </label>
                  <select
                    value={filters.bloodGroup}
                    onChange={(e) =>
                      setFilters({ ...filters, bloodGroup: e.target.value })
                    }
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                  >
                    <option value="">All Blood Groups</option>
                    {bloodGroups.map((group) => (
                      <option key={group} value={group}>
                        {group}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Response Status Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Response Status
                  </label>
                  <select
                    value={filters.responseStatus}
                    onChange={(e) =>
                      setFilters({ ...filters, responseStatus: e.target.value })
                    }
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                  >
                    <option value="">All Responses</option>
                    {responseOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition"
                >
                  Reset
                </button>
                <button
                  onClick={applyFilters}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          )}

          {/* Active Filters Display */}
          {(filters.bloodGroup || filters.responseStatus) && (
            <div className="bg-gray-100 px-6 py-3 border-b border-gray-200 flex items-center">
              <span className="text-sm font-medium text-gray-700 mr-3">
                Active Filters:
              </span>
              {filters.bloodGroup && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mr-2">
                  Blood Group: {filters.bloodGroup}
                  <button
                    onClick={() => setFilters({ ...filters, bloodGroup: "" })}
                    className="ml-1 text-blue-600 hover:text-blue-800"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {filters.responseStatus && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Response: {filters.responseStatus}
                  <button
                    onClick={() =>
                      setFilters({ ...filters, responseStatus: "" })
                    }
                    className="ml-1 text-green-600 hover:text-green-800"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
            </div>
          )}

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
                  >
                    <div className="flex items-center">
                      <Droplet className="w-4 h-4 mr-2 text-red-600" />
                      Response
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
                  >
                    <div className="flex items-center">
                      <Droplet className="w-4 h-4 mr-2 text-red-600" />
                      Blood Group
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
                  >
                    <div className="flex items-center">
                      <AlertTriangle className="w-4 h-4 mr-2 text-yellow-600" />
                      Status
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => requestSort("createdAt")}
                  >
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-gray-600" />
                      Date
                      {sortConfig.key === "createdAt" && (
                        <span className="ml-1">
                          {sortConfig.direction === "asc" ? (
                            <ArrowUp className="w-4 h-4" />
                          ) : (
                            <ArrowDown className="w-4 h-4" />
                          )}
                        </span>
                      )}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-right text-sm font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Details
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredResponses.length > 0 ? (
                  filteredResponses.map((record, index) => (
                    <motion.tr
                      key={record._id}
                      className="hover:bg-gray-50 transition-colors"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            record.response === "Yes"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {record.response}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {record.alertId?.bloodGroup || "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            record.alertId?.status === "active"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {record.alertId?.status || "N/A"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {moment(record.createdAt).format("MMM D, YYYY")}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => toggleRowExpand(record._id)}
                          className="text-red-600 hover:text-red-800 flex items-center justify-end"
                        >
                          Details
                          <ChevronRight
                            className={`w-4 h-4 ml-1 transition-transform ${
                              expandedRow === record._id ? "rotate-90" : ""
                            }`}
                          />
                        </button>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-6 py-4 text-center text-sm text-gray-500"
                    >
                      No matching responses found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Expanded Details */}
          {expandedRow &&
            filteredResponses.find((r) => r._id === expandedRow) && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-gray-50 border-t border-gray-200"
              >
                {(() => {
                  const record = filteredResponses.find(
                    (r) => r._id === expandedRow
                  );
                  return (
                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Alert Details */}
                      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                          <AlertTriangle className="w-5 h-5 mr-2 text-red-600" />
                          Alert Information{" "}
                          <SquareArrowOutUpRight
                            onClick={() => handleRedirect(record.alertId._id)}
                            className="w-5 h-5 ml-1 text-blue-600 cursor-pointer hover:text-blue-800"
                          />
                        </h3>
                        <div className="space-y-3">
                          <div>
                            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Blood Group
                            </p>
                            <p className="text-lg font-bold text-red-600">
                              {record.alertId?.bloodGroup || "N/A"}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Toggle Response
                            </p>
                            <button
                              onClick={() => handleToggleResponse(record._id)}
                              className={`text-gray-800 font-medium ${
                                record.alertId?.status !== "active"
                                  ? "opacity-50 cursor-not-allowed"
                                  : "opacity-100 cursor-pointer"
                              }`}
                              disabled={record.alertId?.status !== "active"}
                            >
                              {record.response === "Yes" ? (
                                <ToggleLeft className="w-7 h-7 text-green-600 hover:text-green-800" />
                              ) : (
                                <ToggleRight className="w-7 h-7 text-red-600 hover:text-red-800" />
                              )}
                            </button>
                          </div>
                          <div>
                            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Message
                            </p>
                            <p className="text-gray-800">
                              {record.alertId?.message || "No message provided"}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Response Details */}
                      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                          <User className="w-5 h-5 mr-2 text-blue-600" />
                          Your Response
                        </h3>
                        <div className="space-y-3">
                          <div>
                            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Response
                            </p>
                            <p
                              className={`text-lg font-bold ${
                                record.response === "Yes"
                                  ? "text-green-600"
                                  : "text-gray-600"
                              }`}
                            >
                              {record.response}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Submitted On
                            </p>
                            <p className="text-gray-800">
                              {moment(record.createdAt).format(
                                "MMM D, YYYY h:mm A"
                              )}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Last Updated
                            </p>
                            <p className="text-gray-800">
                              {moment(record.updatedAt).format(
                                "MMM D, YYYY h:mm A"
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </motion.div>
            )}
        </motion.div>
      </div>
    </Layout>
  );
};

export default DonorResponses;
