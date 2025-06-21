import { useState, useEffect } from "react";
import Layout from "../../components/shared/Layout/Layout";
import API from "../../services/API";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Phone, Check, X, Droplet, Mail, Calendar } from "lucide-react";

const AlertResponses = () => {
  const { id } = useParams();
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredData, setFilteredData] = useState([]);
  const [responseFilter, setResponseFilter] = useState("All");
  const [sortOption, setSortOption] = useState("");

  useEffect(() => {
    const fetchResponses = async () => {
      try {
        const { data } = await API.get(`/response/alert/${id}`);
        if (data.status) {
          setResponses(data.responses);
          setFilteredData(data.responses);
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error("Error fetching responses:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchResponses();
  }, [id]);

  useEffect(() => {
    let data = [...responses];

    if (responseFilter !== "All") {
      data = data.filter((record) => record.response === responseFilter);
    }

    if (sortOption === "dateAsc") {
      data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (sortOption === "dateDesc") {
      data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    setFilteredData(data);
  }, [responses, responseFilter, sortOption]);

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
            <Check className="w-8 h-8 text-green-500 mr-3" />
            Alert Responses
          </h1>
          <p className="text-gray-600">Donor responses to your blood request</p>
        </motion.div>

        {/* Filter and Sort Controls */}
        <div className="flex flex-wrap justify-center items-end gap-8 mb-8">
          <div className="flex flex-col">
            <label className="mb-2 text-lg font-semibold text-gray-700">
              Filter by Response
            </label>
            <select
              value={responseFilter}
              onChange={(e) => setResponseFilter(e.target.value)}
              className="px-4 py-2 text-lg border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 ease-in-out"
            >
              <option value="All">All Responses</option>
              <option value="Yes">Positive Responses</option>
              <option value="No">Negative Responses</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="mb-2 text-lg font-semibold text-gray-700">
              Sort by
            </label>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="px-4 py-2 text-lg border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 ease-in-out"
            >
              <option value="">-- Select --</option>
              <option value="dateAsc">Date ↑ (Oldest)</option>
              <option value="dateDesc">Date ↓ (Newest)</option>
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
        ) : filteredData.length === 0 ? (
          <motion.div
            className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-gray-500">No responses found yet.</p>
            <p className="text-gray-400 mt-2">
              Responses will appear here as donors reply
            </p>
          </motion.div>
        ) : (
          <motion.div
            className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="overflow-x-auto max-h-[600px] overflow-y-auto custom-scrollbar">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gradient-to-r from-red-600 to-red-700 sticky top-0">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                      <div className="flex items-center">
                        <span className="mr-2">#</span>
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-2" />
                        <span>Donor</span>
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 mr-2" />
                        <span>Contact</span>
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                      <div className="flex items-center">
                        <Check className="w-4 h-4 mr-2" />
                        <span>Status</span>
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                      <div className="flex items-center">
                        <Droplet className="w-4 h-4 mr-2" />
                        <span>Blood Group</span>
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                      <div className="flex items-center">
                        <Mail className="w-4 h-4 mr-2" />
                        <span>Message</span>
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>Date & Time</span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {filteredData.map((res, index) => (
                    <motion.tr
                      key={res._id}
                      className="hover:bg-red-50 transition-colors duration-150"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.03 }}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-red-100 flex items-center justify-center mr-3">
                            <User className="h-5 w-5 text-red-600" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-gray-900">
                              {res.donorId.name}
                            </div>
                            <div className="text-xs text-gray-500">
                              {res.donorId.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          <a
                            href={`tel:${res.donorId.contact}`}
                            className="hover:text-red-600 hover:underline"
                          >
                            {res.donorId.contact}
                          </a>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            res.response === "Yes"
                              ? "bg-green-100 text-green-800"
                              : res.response === "No"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {res.response === "Yes" ? (
                            <>
                              <Check className="w-3 h-3 mr-1" /> Confirmed
                            </>
                          ) : res.response === "No" ? (
                            <>
                              <X className="w-3 h-3 mr-1" /> Declined
                            </>
                          ) : (
                            <>
                              <Clock className="w-3 h-3 mr-1" /> Pending
                            </>
                          )}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                          {res.alertId.bloodGroup}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 max-w-xs">
                        <div
                          className="line-clamp-2"
                          title={res.alertId.message}
                        >
                          {res.alertId.message}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex flex-col">
                          <span>
                            {new Date(res.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              }
                            )}
                          </span>
                          <span className="text-xs text-gray-400">
                            {new Date(res.createdAt).toLocaleTimeString(
                              "en-US",
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                          </span>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>

              {filteredData.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="p-8 text-center"
                >
                  <Inbox className="w-12 h-12 mx-auto text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">
                    No records found
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    There are currently no responses to display.
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </Layout>
  );
};

export default AlertResponses;
