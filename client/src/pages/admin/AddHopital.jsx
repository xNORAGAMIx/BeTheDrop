/* eslint-disable no-unused-vars */
import { useState } from "react";
import API from "../../services/API";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import Layout from "../../components/shared/Layout/Layout";
import { Building2 } from "lucide-react";

const AddHopital = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !address || !contact || !email || !website) {
      toast.error("Please fill in all required fields");
      return;
    }
    try {
      const { data } = await API.post("/admin/add-hospital", {
        name,
        address,
        contact,
        email,
        website,
      });

      toast.success(data.message);

      setName("");
      setAddress("");
      setContact("");
      setEmail("");
      setWebsite("");
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "An error occurred");
    }
  };

  return (
    <Layout>
      <div className="flex flex-col items-center px-4 py-8">
        {/* Page Heading */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-4xl mb-8 text-center"
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Register New Hospital
          </h1>
          <p className="text-gray-600">
            Add a new hospital to the blood donation network
          </p>
        </motion.div>

        {/* Hospital Details Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 mb-8"
        >
          <div className="md:flex">
            {/* Image Section */}
            <div className="md:w-2/5 hidden md:block bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
              <div className="p-8 text-center">
                <Building2 className="w-16 h-16 mx-auto text-blue-500 mb-4" />
                <h3 className="text-xl font-bold text-gray-800">
                  Hospital Registration
                </h3>
                <p className="text-gray-600 mt-2">
                  Complete all fields to add a new hospital
                </p>
              </div>
            </div>

            {/* Form Section */}
            <div className="md:w-3/5 p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-6 text-blue-600 flex items-center">
                <Building2 className="mr-2" /> Hospital Information
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hospital Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 outline-0"
                    required
                    placeholder="Enter hospital name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 outline-0"
                    required
                    placeholder="Enter complete address"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contact Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 outline-0"
                      required
                      placeholder="Phone number"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 outline-0"
                      required
                      placeholder="official@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Website URL
                  </label>
                  <input
                    type="url"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 outline-0"
                    placeholder="https://www.hospital.com"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-600 transition-all duration-300 shadow-md flex items-center justify-center cursor-pointer"
                >
                  Register Hospital
                </motion.button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default AddHopital;