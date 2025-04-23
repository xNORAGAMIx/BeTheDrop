import React, { useEffect, useState } from "react";
import Layout from "../../components/shared/Layout/Layout";
import API from "../../services/API";
import { motion } from "framer-motion";
import { Hospital, Mail, Phone, MapPin, Globe } from "lucide-react";

const Hospitals = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getHospital = async () => {
    try {
      const { data } = await API.get("/public/hospitals");
      if (data?.status) {
        setData(data?.hospitals);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getHospital();
  }, []);

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
            <Hospital className="w-8 h-8 text-blue-600 mr-3" />
            Affiliated Hospitals
          </h1>
          <p className="text-gray-600">
            List of partner hospitals and their contact information
          </p>
        </motion.div>

        {/* Content */}
        {loading ? (
          <motion.div
            className="flex justify-center items-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
          </motion.div>
        ) : data.length === 0 ? (
          <motion.div
            className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-gray-500">No hospital records found yet.</p>
            <p className="text-gray-400 mt-2">
              Relevant hospital details will appear here
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
                        <Hospital className="w-4 h-4 mr-2" /> Name
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-xl font-medium text-white uppercase tracking-wider">
                      <div className="flex items-center">
                        <Mail className="w-4 h-4 mr-2" /> Email
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-xl font-medium text-white uppercase tracking-wider">
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 mr-2" /> Phone
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-xl font-medium text-white uppercase tracking-wider">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2" /> Address
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-xl font-medium text-white uppercase tracking-wider">
                      <div className="flex items-center">
                        <Globe className="w-4 h-4 mr-2" /> Website
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
                      <td className="px-6 py-4 whitespace-nowrap text-xl text-gray-900">
                        {record.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-xl text-gray-700">
                        {record.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-xl text-gray-700">
                        {record.contact}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-xl text-gray-700">
                        {record.address}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-xl text-blue-600 underline">
                        <a
                          href={record.website}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {record.website}
                        </a>
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

export default Hospitals;
