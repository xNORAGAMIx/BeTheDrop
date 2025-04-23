import moment from "moment";
import React, { useEffect, useState } from "react";
import Layout from "../components/shared/Layout/Layout";
import API from "../services/API";
import { motion } from "framer-motion";
import { Droplet, Activity, Hospital, User, Calendar } from "lucide-react";

const Donation = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getDonars = async () => {
    try {
      const { data } = await API.get("/user/donation-history");
      if (data?.status) {
        setData(data?.donationHistory);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
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
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center justify-center">
            <Droplet className="w-8 h-8 text-red-500 mr-3" />
            My Donation History
          </h1>
          <p className="text-gray-600">
            Records of your life-saving contributions
          </p>
        </motion.div>

        {/* Content */}
        {loading ? (
          <motion.div
            className="flex justify-center items-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
          </motion.div>
        ) : data?.length === 0 ? (
          <motion.div
            className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-gray-500">No donation records found yet.</p>
            <p className="text-gray-400 mt-2">
              Your future donations will appear here
            </p>
          </motion.div>
        ) : (
          <motion.div
            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-black">
                  <tr>
                    <th className="px-6 py-4 text-left text-xl font-medium text-white uppercase tracking-wider">
                      <div className="flex items-center">
                        <Droplet className="w-4 h-4 mr-2" /> Blood
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-xl font-medium text-white uppercase tracking-wider">
                      <div className="flex items-center">
                        <Hospital className="w-4 h-4 mr-2" /> Hospital
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-xl font-medium text-white uppercase tracking-wider">
                      <div className="flex items-center">
                        <Activity className="w-4 h-4 mr-2" /> Quantity
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-xl font-medium text-white uppercase tracking-wider">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-2" /> Recorded By
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-xl font-medium text-white uppercase tracking-wider">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" /> Date
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {data.map((record, index) => (
                    <motion.tr
                      key={record._id}
                      className="hover:bg-gray-50 transition-colors"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-3 py-1 rounded-full text-xl font-semibold ${getBloodGroupColor(
                            record.bloodGroup
                          )}`}
                        >
                          {record.bloodGroup}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-xl text-gray-900">
                        {record.hospital?.name || "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-xl text-gray-900">
                        {record.quantityInML} mL
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-xl text-gray-900">
                        {record.recordedBy?.name || "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-xl text-gray-500">
                        {moment(record.donationDate).format(
                          "MMM D, YYYY h:mm A"
                        )}
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

export default Donation;
