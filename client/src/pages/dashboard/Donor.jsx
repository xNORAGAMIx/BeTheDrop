import React, { useState, useRef } from "react";
import Layout from "../../components/shared/Layout/Layout";
import API from "../../services/API";
import {
  Droplet,
  User,
  Clock,
  Award,
  Activity,
  Calendar,
  Home,
  Printer,
  Share2,
  RefreshCw,
  Mail,
  ChevronDown,
  CheckCircle,
  Info
} from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

import {
  PDFDownloadLink,
  Document,
  Page,
  View,
  Text,
  StyleSheet,
} from "@react-pdf/renderer";

const Donor = () => {
  // eslint-disable-next-line no-unused-vars
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [quantityInML, setQuantityInML] = useState("");
  const [downloadReady, setDownloadReady] = useState(false);
  const pdfLinkRef = useRef(null);

  const { user } = useSelector((state) => state.auth);

  const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];
  const hospital = user?.hospitalId?.name || "City General Hospital";

  const refreshData = () => {
    setData(null);
    setEmail("");
    setBloodGroup("");
    setQuantityInML("");
    setDownloadReady(false);
    setLoading(false);
  };

  // State for generating PDF
  const [isGenerating, setIsGenerating] = useState(false);

  // Create donation record
  const createDonation = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await API.post("/hospital/create-donation", {
        email,
        bloodGroup,
        quantityInML,
      });
      if (data?.status) {
        setData(data.donation);
        setDownloadReady(true);

        // Trigger the download after a small delay to ensure state updates
        setTimeout(() => {
          if (pdfLinkRef.current) {
            pdfLinkRef.current.click();
          }
        }, 100);
      }
    } catch (error) {
      console.error("Error creating donation:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row gap-8"
        >
          {/* Donation Form */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4, delay: 0.2 }}
  className="w-full md:w-1/2"
>
  <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
    {/* Header Section */}
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
      <div className="flex items-center">
        <div className="p-3 rounded-full bg-red-50 mr-4">
          <Droplet className="w-6 h-6 text-red-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Record Blood Donation
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Register new blood donations in the system
          </p>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={refreshData}
        className="flex items-center space-x-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 transition-all shadow-sm"
      >
        <RefreshCw className="w-4 h-4" />
        <span>Refresh Data</span>
      </motion.button>
    </div>

    <form onSubmit={createDonation} className="space-y-6">
      {/* Donor Email Field */}
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Donor Email <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-transparent transition"
            placeholder="donor@example.com"
            required
          />
        </div>
      </div>

      {/* Blood Group Field */}
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Blood Group <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Droplet className="h-5 w-5 text-gray-400" />
          </div>
          <select
            value={bloodGroup}
            onChange={(e) => setBloodGroup(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-transparent appearance-none bg-white transition"
            required
          >
            <option value="">Select Blood Group</option>
            {bloodGroups.map((group) => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <ChevronDown className="h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Quantity Field */}
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Quantity (mL) <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Activity className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="number"
            min="1"
            value={quantityInML}
            onChange={(e) => setQuantityInML(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-transparent transition"
            placeholder="e.g. 450"
            required
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <span className="text-gray-500">mL</span>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={loading}
        className={`w-full py-3.5 px-4 rounded-lg font-semibold text-white ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
        } transition-all shadow-md flex items-center justify-center gap-2`}
      >
        {loading ? (
          <>
            <Clock className="animate-spin w-5 h-5" />
            <span>Processing...</span>
          </>
        ) : (
          <>
            <CheckCircle className="w-5 h-5" />
            <span>Record Donation</span>
          </>
        )}
      </motion.button>
    </form>

    {/* Additional Info */}
    <div className="mt-6 pt-6 border-t border-gray-100">
      <div className="flex items-start text-sm text-gray-500">
        <Info className="w-4 h-4 mt-0.5 mr-2 flex-shrink-0 text-gray-400" />
        <p>All fields marked with <span className="text-red-500">*</span> are required. Please ensure donor details are accurate.</p>
      </div>
    </div>
  </div>
</motion.div>

          {/* Certificate Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="w-full md:w-1/2"
          >
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 h-full">
              <div className="flex items-center mb-6">
                <Award className="w-8 h-8 text-red-500 mr-2" />
                <h2 className="text-2xl font-bold text-gray-800">
                  Donation Certificate
                </h2>
              </div>

              <div className="border-2 border-red-200 rounded-lg p-6 bg-gradient-to-br from-red-50 to-white relative overflow-hidden">
                {/* Watermark */}
                <div className="absolute inset-0 flex items-center justify-center opacity-10 z-0">
                  <Droplet className="w-64 h-64 text-red-300" />
                </div>

                <div className="relative z-10">
                  {/* Certificate Header */}
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-red-600 uppercase tracking-wide">
                      Certificate of Appreciation
                    </h3>
                    <p className="text-gray-600 mt-2 italic">
                      Presented in recognition of your life-saving blood
                      donation
                    </p>
                    <div className="w-24 h-1 bg-red-300 mx-auto mt-3 rounded-full"></div>
                  </div>

                  {/* Certificate Body */}
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between border-b border-gray-200 pb-2">
                      <span className="font-medium text-gray-700 flex items-center">
                        <User className="w-4 h-4 mr-2" /> Donor:
                      </span>
                      <span className="text-gray-900 font-medium">
                        {email || "N/A"}
                      </span>
                    </div>

                    <div className="flex justify-between border-b border-gray-200 pb-2">
                      <span className="font-medium text-gray-700 flex items-center">
                        <Droplet className="w-4 h-4 mr-2" /> Blood Group:
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          bloodGroup.includes("+")
                            ? "bg-red-100 text-red-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {bloodGroup || "N/A"}
                      </span>
                    </div>

                    <div className="flex justify-between border-b border-gray-200 pb-2">
                      <span className="font-medium text-gray-700 flex items-center">
                        <Activity className="w-4 h-4 mr-2" /> Quantity:
                      </span>
                      <span className="text-gray-900 font-medium">
                        {quantityInML ? `${quantityInML} ml` : "N/A"}
                      </span>
                    </div>

                    <div className="flex justify-between border-b border-gray-200 pb-2">
                      <span className="font-medium text-gray-700 flex items-center">
                        <Calendar className="w-4 h-4 mr-2" /> Date:
                      </span>
                      <span className="text-gray-900 font-medium">
                        {new Date().toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>

                    <div className="flex justify-between border-b border-gray-200 pb-2">
                      <span className="font-medium text-gray-700 flex items-center">
                        <Home className="w-4 h-4 mr-2" /> Hospital:
                      </span>
                      <span className="text-gray-900 font-medium">
                        {hospital}
                      </span>
                    </div>
                  </div>

                  {/* Certificate Footer */}
                  <div className="mt-8 text-center">
                    <p className="text-sm text-gray-500 italic mb-4">
                      "Your generous donation has the power to save up to three
                      lives."
                    </p>

                    <div className="mt-6 pt-4 border-t border-dashed border-gray-300">
                      <div className="inline-block px-8">
                        <p className="text-xs text-gray-500 mb-1">
                          Authorized Signature
                        </p>
                        <div className="h-0.5 w-24 bg-gray-400 mx-auto mb-1"></div>
                        <p className="text-xs text-gray-600">
                          Blood Bank Director
                        </p>
                      </div>
                    </div>

                    {downloadReady && data && (
                      <div className="mt-6 flex justify-center space-x-4">
                        <PDFDownloadLink
                          document={
                            <CertificatePDF
                              email={email}
                              bloodGroup={bloodGroup}
                              quantityInML={quantityInML}
                              hospital={hospital}
                            />
                          }
                          fileName="blood-donation-certificate.pdf"
                          onClick={() => setIsGenerating(true)}
                          className="flex items-center text-sm bg-white border border-red-300 text-red-600 px-4 py-2 rounded-lg hover:bg-red-50 transition"
                        >
                          {({ loading }) => (
                            <>
                              <Printer className="w-4 h-4 mr-2" />
                              {loading || isGenerating
                                ? "Generating..."
                                : "Print Certificate"}
                            </>
                          )}
                        </PDFDownloadLink>
                        <button className="flex items-center text-sm bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition">
                          <Share2 className="w-4 h-4 mr-2" /> Share
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default Donor;

// PDF Styles
const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: "#fff",
  },
  container: {
    border: "2px solid #fecaca",
    borderRadius: 8,
    padding: 30,
    position: "relative",
    backgroundColor: "#fff5f5",
  },
  watermark: {
    position: "absolute",
    opacity: 0.1,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  header: {
    textAlign: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#dc2626",
    textTransform: "uppercase",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#4b5563",
    fontStyle: "italic",
    marginBottom: 12,
  },
  divider: {
    width: 96,
    height: 2,
    backgroundColor: "#fca5a5",
    marginHorizontal: "auto",
    borderRadius: 2,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottom: "1px solid #e5e7eb",
    paddingVertical: 8,
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: "medium",
    color: "#374151",
    flexDirection: "row",
    alignItems: "center",
  },
  value: {
    fontSize: 14,
    fontWeight: "medium",
    color: "#111827",
  },
  bloodGroup: {
    fontSize: 12,
    fontWeight: "semibold",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  quote: {
    fontSize: 12,
    color: "#6b7280",
    fontStyle: "italic",
    textAlign: "center",
    marginBottom: 16,
  },
  signature: {
    borderTop: "1px dashed #d1d5db",
    paddingTop: 16,
    marginTop: 32,
  },
  signatureText: {
    fontSize: 10,
    color: "#6b7280",
    marginBottom: 4,
  },
  signatureLine: {
    width: 96,
    height: 1,
    backgroundColor: "#9ca3af",
    marginHorizontal: "auto",
    marginBottom: 4,
  },
});

// PDF Document Component
const CertificatePDF = ({ email, bloodGroup, quantityInML, hospital }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.container}>
        {/* Watermark - Note: You'll need to provide a base64 encoded image */}
        <View style={styles.watermark}>
          <Text style={{ fontSize: 40, color: "#fca5a5" }}>{hospital}</Text>

          {/* <Image src="" style={{ width: 256, height: 256 }} /> */}
        </View>

        <View style={styles.header}>
          <Text style={styles.title}>Certificate of Appreciation</Text>
          <Text style={styles.subtitle}>
            Presented in recognition of your life-saving blood donation
          </Text>
          <View style={styles.divider} />
        </View>

        <View>
          <View style={styles.row}>
            <View style={styles.label}>
              <Text>Donor:</Text>
            </View>
            <Text style={styles.value}>{email || "N/A"}</Text>
          </View>

          <View style={styles.row}>
            <View style={styles.label}>
              <Text>Blood Group:</Text>
            </View>
            <Text
              style={[
                styles.value,
                styles.bloodGroup,
                bloodGroup.includes("+")
                  ? { backgroundColor: "#fee2e2", color: "#991b1b" }
                  : { backgroundColor: "#dbeafe", color: "#1e40af" },
              ]}
            >
              {bloodGroup || "N/A"}
            </Text>
          </View>

          <View style={styles.row}>
            <View style={styles.label}>
              <Text>Quantity:</Text>
            </View>
            <Text style={styles.value}>
              {quantityInML ? `${quantityInML} ml` : "N/A"}
            </Text>
          </View>

          <View style={styles.row}>
            <View style={styles.label}>
              <Text>Date:</Text>
            </View>
            <Text style={styles.value}>
              {new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </Text>
          </View>

          <View style={styles.row}>
            <View style={styles.label}>
              <Text>Hospital:</Text>
            </View>
            <Text style={styles.value}>{hospital}</Text>
          </View>
        </View>

        <View>
          <Text style={styles.quote}>
            "Your generous donation has the power to save up to three lives."
          </Text>

          <View style={styles.signature}>
            <View style={{ textAlign: "center" }}>
              <Text style={styles.signatureText}>Authorized Signature</Text>
              <View style={styles.signatureLine} />
              <Text style={styles.signatureText}>Blood Bank Director</Text>
            </View>
          </View>
        </View>
      </View>
    </Page>
  </Document>
);
