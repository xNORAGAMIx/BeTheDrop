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
            <p className="text-gray-400 mt-2">Responses will appear here as donors reply</p>
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
                <thead className="bg-gradient-to-r from-red-600 to-red-500">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                      <div className="flex items-center">
                        <span className="mr-2">#</span>
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-2" /> Donor
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 mr-2" /> Contact
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                      <div className="flex items-center">
                        <Check className="w-4 h-4 mr-2" /> Response
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                      <div className="flex items-center">
                        <Droplet className="w-4 h-4 mr-2" /> Blood Group
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                      <div className="flex items-center">
                        <Mail className="w-4 h-4 mr-2" /> Message
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" /> Date
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredData.map((res, index) => (
                    <motion.tr
                      key={res._id}
                      className="hover:bg-gray-50 transition-colors"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{res.donorId.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {res.donorId.contact}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            res.response === "Yes"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {res.response === "Yes" ? (
                            <span className="flex items-center">
                              <Check className="w-3 h-3 mr-1" /> Yes
                            </span>
                          ) : (
                            <span className="flex items-center">
                              <X className="w-3 h-3 mr-1" /> No
                            </span>
                          )}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {res.alertId.bloodGroup}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                        {res.alertId.message}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(res.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
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

export default AlertResponses;