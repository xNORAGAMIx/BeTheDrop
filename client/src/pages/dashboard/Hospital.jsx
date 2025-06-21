/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Layout from "../../components/shared/Layout/Layout";
import API from "../../services/API";
import { motion } from "framer-motion";
import {
  Hospital,
  Mail,
  Phone,
  MapPin,
  Globe,
  Search,
  Trash,
} from "lucide-react";

const Hospitals = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const { user } = useSelector((state) => state.auth);

  const getHospital = async () => {
    try {
      const { data } = await API.get("/public/hospitals");
      if (data?.status) {
        setData(data?.hospitals);
        setFilteredData(data?.hospitals);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const { data } = await API.delete("/admin/delete-hospital", {
        data: { id },
      });
      if (data.status) {
        toast.success("Hospital deleted successfully.");
        getHospital();
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getHospital();
  }, []);

  useEffect(() => {
    const filtered = data.filter(
      (hospital) =>
        hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hospital.address.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchTerm, data]);

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

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg outline-0"
              placeholder="Search by hospital name or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <svg
                  className="h-5 w-5 text-gray-400 hover:text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
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
        ) : filteredData.length === 0 ? (
          <motion.div
            className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-gray-500">
              {searchTerm
                ? "No hospitals match your search criteria"
                : "No hospital records found yet."}
            </p>
            <p className="text-gray-400 mt-2">
              {searchTerm
                ? "Try a different search term"
                : "Relevant hospital details will appear here"}
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
                    {user && user.role === "admin" && (
                      <th className="px-6 py-4 text-left text-xl font-medium text-white uppercase tracking-wider">
                        <div className="flex items-center">
                          <Globe className="w-4 h-4 mr-2" /> Action
                        </div>
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredData.map((record, index) => (
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
                          href={`https://${record.website}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {record.website}
                        </a>
                      </td>
                      {user && user.role === "admin" && (
                        <td className="px-6 py-4 whitespace-nowrap text-xl text-gray-700">
                          <Trash onClick={() => handleDelete(record._id)} />
                        </td>
                      )}
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
