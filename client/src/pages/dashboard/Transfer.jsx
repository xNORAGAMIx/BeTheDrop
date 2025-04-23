import { useState, useEffect } from "react";
import Layout from "../../components/shared/Layout/Layout";
import API from "../../services/API";
import { motion } from "framer-motion";

const Transfer = () => {
  const [data, setData] = useState([]);
  const [toHospitalEmail, setEmail] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [quantityInMl, setQuantity] = useState("");

  const [sentTransfers, setSentTransfers] = useState([]);
  const [receivedTransfers, setReceivedTransfers] = useState([]);

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  const transferBlood = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post("/hospital/blood-transfer", {
        toHospitalEmail,
        bloodGroup,
        quantityInMl,
      });
      if (data?.status) {
        setData(data);
        fetchSentTransfers();
        fetchReceivedTransfers();
        // Reset form fields
        setEmail("");
        setBloodGroup("");
        setQuantity("");
      }
    } catch (error) {
      console.error("Error transferring blood:", error);
    }
  };

  const fetchSentTransfers = async () => {
    try {
      const { data } = await API.get("/hospital/transfer/sent");
      if (data?.status) {
        setSentTransfers(data?.transfers);
      }
    } catch (error) {
      console.error("Error fetching sent transfers:", error);
    }
  };

  const fetchReceivedTransfers = async () => {
    try {
      const { data } = await API.get("/hospital/transfers/received");
      if (data?.status) {
        setReceivedTransfers(data?.transfers);
      }
    } catch (error) {
      console.error("Error fetching received transfers:", error);
    }
  };

  useEffect(() => {
    fetchSentTransfers();
    fetchReceivedTransfers();
  }, []);

  return (
    <Layout>
      <div className="mt-20 px-4 pb-12 flex flex-col items-center">
        {/* Form and Image Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-white max-w-4xl w-full rounded-xl shadow-lg border border-gray-200 overflow-hidden flex flex-col md:flex-row mb-12"
        >
          {/* Image Section */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
            className="md:w-1/2 hidden md:block bg-gradient-to-br from-red-50 to-red-100"
          >
            <img
              src="./transfer.jpg"
              alt="Blood Donation"
              className="h-full w-full object-cover"
            />
          </motion.div>

          {/* Form Section */}
          <div className="w-full md:w-1/2 p-8">
            <h2 className="text-3xl font-bold mb-6 text-center text-red-600">
              Blood Transfer Request
            </h2>
            <p className="text-gray-600 text-center mb-8">
              Request blood transfer to another hospital
            </p>

            <form onSubmit={transferBlood} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Recipient Hospital Email
                </label>
                <input
                  type="email"
                  name="toHospitalEmail"
                  value={toHospitalEmail}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
                  placeholder="Enter hospital email"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Blood Group
                </label>
                <select
                  name="bloodGroup"
                  value={bloodGroup}
                  onChange={(e) => setBloodGroup(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
                  required
                >
                  <option value="">Select Blood Group</option>
                  {bloodGroups.map((group) => (
                    <option key={group} value={group}>
                      {group}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity (mL)
                </label>
                <input
                  type="number"
                  name="quantityInMl"
                  value={quantityInMl}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="block w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
                  placeholder="Enter quantity in mL"
                  required
                  min={1}
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-3 rounded-lg font-semibold hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-md"
              >
                Initiate Transfer
              </motion.button>
            </form>
          </div>
        </motion.div>

        {/* Sent Transfers Section */}
        <div className="max-w-6xl w-full mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-2xl font-bold text-gray-800 mb-6 flex items-center"
          >
            <span className="bg-red-600 w-2 h-8 rounded-full mr-3"></span>
            Outgoing Transfers
          </motion.h2>

          {sentTransfers?.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 text-center"
            >
              <div className="text-gray-400 mb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 mx-auto"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <p className="text-gray-500">
                No outgoing transfer records found.
              </p>
              <p className="text-sm text-gray-400 mt-1">
                All outgoing transfer requests will appear here
              </p>
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
                  <thead className="bg-gradient-to-r from-red-600 to-red-700">
                    <tr>
                      {[
                        "Blood Group",
                        "Quantity (ml)",
                        "Recipient Hospital",
                        "Contact",
                        "Email",
                        "Transfer Date",
                        "Recorded By",
                      ].map((header) => (
                        <th
                          key={header}
                          className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {sentTransfers.map((transfer) => (
                      <motion.tr
                        key={transfer._id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 bg-red-100 text-red-800 text-sm font-medium rounded-full">
                            {transfer.bloodGroup}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {transfer.quantityInML} mL
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {transfer.toHospital.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {transfer.toHospital.contact}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <a
                            href={`mailto:${transfer.toHospital.email}`}
                            className="text-red-600 hover:underline"
                          >
                            {transfer.toHospital.email}
                          </a>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(transfer.transferDate).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <div className="font-medium">
                            {transfer.recordedBy.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {transfer.recordedBy.contact}
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </div>

        {/* Received Transfers Section */}
        <div className="max-w-6xl w-full">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-2xl font-bold text-gray-800 mb-6 flex items-center"
          >
            <span className="bg-green-600 w-2 h-8 rounded-full mr-3"></span>
            Incoming Transfers
          </motion.h2>

          {receivedTransfers?.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 text-center"
            >
              <div className="text-gray-400 mb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 mx-auto"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                  />
                </svg>
              </div>
              <p className="text-gray-500">
                No incoming transfer records found.
              </p>
              <p className="text-sm text-gray-400 mt-1">
                All incoming transfer requests will appear here
              </p>
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
                  <thead className="bg-gradient-to-r from-green-600 to-green-700">
                    <tr>
                      {[
                        "Blood Group",
                        "Quantity (ml)",
                        "Sending Hospital",
                        "Contact",
                        "Email",
                        "Transfer Date",
                        "Recorded By",
                      ].map((header) => (
                        <th
                          key={header}
                          className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {receivedTransfers.map((transfer) => (
                      <motion.tr
                        key={transfer._id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                            {transfer.bloodGroup}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {transfer.quantityInML} mL
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {transfer.toHospital.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {transfer.toHospital.contact}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <a
                            href={`mailto:${transfer.toHospital.email}`}
                            className="text-green-600 hover:underline"
                          >
                            {transfer.toHospital.email}
                          </a>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(transfer.transferDate).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <div className="font-medium">
                            {transfer.recordedBy.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {transfer.recordedBy.contact}
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Transfer;
