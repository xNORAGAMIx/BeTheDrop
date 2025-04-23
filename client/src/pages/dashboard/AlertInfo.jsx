import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "../../components/shared/Layout/Layout";
import API from "../../services/API";
import {
  AlertTriangle,
  Clock,
  Droplet,
  Hospital,
  Calendar,
  User,
  Phone,
  MapPin,
  ChevronRight,
} from "lucide-react";
import { motion } from "framer-motion";

const AlertInfo = () => {
  const { id } = useParams();
  const [alert, setAlert] = useState({});
  const [loading, setLoading] = useState(true);
  const [hospitalDetails, setHospitalDetails] = useState({});
  const [showDetails, setShowDetails] = useState(false);
  const [responseStatus, setResponseStatus] = useState(null);
  const [response, setResponse] = useState({});
  const [responseLoading, setResponseLoading] = useState(false);

  const handleResponse = async (reply) => {
    if (!alert?._id) {
      console.error("Alert ID is missing.");
      return;
    }

    try {
      const res = await API.post("/response", {
        alertId: alert._id,
        response: reply,
      });

      if (res?.data?.status) {
        setResponseStatus(reply);
      } else {
        console.error("API responded without success status:", res?.data);
      }
    } catch (error) {
      if (error.response) {
        // Server responded with a status outside 2xx
        console.error("Server error:", error.response.data);
      } else if (error.request) {
        // Request was made but no response
        console.error("No response received:", error.request);
      } else {
        // Something else caused the error
        console.error("Error setting up request:", error.message);
      }
    }
  };

  const fetchAlert = async () => {
    try {
      const { data } = await API.get(`/alert/${id}`);
      if (data?.status) {
        setAlert(data.alert);
      }
    } catch (error) {
      console.error("Error fetching alert:", error);
    } finally {
      setLoading(false);
    }
  };

  const hospitalId = alert?.hospitalId?._id;

  const fetchHospitalDetails = async () => {
    if (!hospitalId) return;
    try {
      const { data } = await API.get(`/hospital/${hospitalId}`);
      if (data?.status) {
        setHospitalDetails(data.hospital);
        console.log("Data ", hospitalDetails);
      }
    } catch (error) {
      console.error("Error fetching hospital details:", error);
    }
  };

  const fetchResponse = async () => {
    setResponseLoading(true);
    try {
      const { data } = await API.post("/response/donor", {
        alertId: id,
      });
      if (data?.status) {
        setResponse(data.response);
        console.log("Response data: ", data.response);
      }
    } catch (error) {
      console.error("Error fetching response:", error);
    } finally {
      setResponseLoading(false);
    }
  };

  useEffect(() => {
    fetchAlert();
    fetchResponse();
  }, [id]);

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
      <div className="max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200"
        >
          {/* Alert Header */}
          <div className="bg-gradient-to-r from-red-600 to-red-700 p-6 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <AlertTriangle className="w-8 h-8 mr-3" />
                <div>
                  <h1 className="text-2xl font-bold">URGENT BLOOD NEED</h1>
                  <p className="text-red-100">Critical blood requirement</p>
                </div>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold flex items-center ${
                  alert.status === "active"
                    ? "bg-green-200 text-green-700"
                    : "bg-black text-gray-400"
                }`}
              >
                <Clock className="w-4 h-4 mr-1" />
                {alert.status?.toUpperCase()}
              </span>
            </div>
          </div>

          {/* Alert Details */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Blood Group Card */}
              <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                <div className="flex items-center mb-2">
                  <Droplet className="w-6 h-6 text-red-600 mr-2" />
                  <h3 className="text-lg font-semibold text-gray-800">
                    Blood Group Needed
                  </h3>
                </div>
                <div className="flex items-center justify-center">
                  <span className="text-4xl font-bold text-red-600 py-2 px-6 bg-white rounded-full shadow-inner">
                    {alert.bloodGroup || "N/A"}
                  </span>
                </div>
              </div>

              {/* Hospital Card */}
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <div className="flex items-center mb-2">
                  <Hospital className="w-6 h-6 text-blue-600 mr-2" />
                  <h3 className="text-lg font-semibold text-gray-800">
                    Requesting Hospital
                  </h3>
                </div>
                <p className="text-lg font-medium text-gray-800">
                  {alert.hospitalId?.name || "N/A"}
                </p>
                <button
                  onClick={() => {
                    setShowDetails((prev) => !prev);
                    if (Object.keys(hospitalDetails).length === 0) {
                      fetchHospitalDetails();
                    }
                  }}
                  className="mt-2 text-blue-600 hover:text-blue-800 text-sm flex items-center"
                >
                  {showDetails ? "Hide details" : "View hospital details"}
                  <ChevronRight
                    className={`w-4 h-4 ml-1 transition-transform ${
                      showDetails ? "rotate-90" : ""
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Emergency Message */}
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded-r-lg">
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertTriangle className="h-5 w-5 text-yellow-600" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">
                    Emergency Message
                  </h3>
                  <div className="mt-1 text-sm text-yellow-700">
                    <p>{alert.message || "No additional message provided"}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Hospital Details */}
            {showDetails && hospitalDetails && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.3 }}
                className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6"
              >
                <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                  <Hospital className="w-5 h-5 mr-2 text-blue-600" />
                  Hospital Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start">
                    <User className="w-5 h-5 mr-2 mt-1 text-gray-600 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-500">Mail</p>
                      <p className="font-medium">
                        {hospitalDetails.email || "N/A"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Phone className="w-5 h-5 mr-2 mt-1 text-gray-600 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-500">Emergency Contact</p>
                      <p className="font-medium">
                        {hospitalDetails.contact || "N/A"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start md:col-span-2">
                    <MapPin className="w-5 h-5 mr-2 mt-1 text-gray-600 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-500">Address</p>
                      <p className="font-medium">
                        {hospitalDetails.address || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Meta Information */}
            <div className="flex flex-wrap items-center justify-between text-sm text-gray-500 border-t pt-4">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                <span>
                  Posted:{" "}
                  {new Date(alert.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
              <div>
                {alert.updatedAt && (
                  <span className="flex items-center">
                    Last updated:{" "}
                    {new Date(alert.updatedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Response Section */}
          {responseLoading ? (
            <p>Loading...</p>
          ) : (
            <div className="bg-gray-100 px-6 py-4 border-t border-b">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Can you respond to this alert?
              </h3>
              <div className="flex space-x-4">
                <button
                  onClick={() => handleResponse("Yes")}
                  disabled={!!response.response}
                  className={`px-4 py-2 text-white rounded-lg transition ${
                    response.response
                      ? "bg-green-400 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                >
                  Yes, I can help
                </button>
                <button
                  onClick={() => handleResponse("No")}
                  disabled={!!response.response}
                  className={`px-4 py-2 rounded-lg transition ${
                    response.response
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                      : "bg-gray-300 text-gray-800 hover:bg-gray-400"
                  }`}
                >
                  No, I can't
                </button>
              </div>
              {responseStatus && (
                <p className="mt-2 text-sm text-gray-600">
                  Response submitted:{" "}
                  <span className="font-semibold capitalize">
                    {responseStatus}
                  </span>
                </p>
              )}
            </div>
          )}

          {/* Response Details Section */}
          <div className="bg-white rounded-xl shadow-sm p-6 mt-6 border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <User className="w-5 h-5 mr-2 text-red-600" />
              Your Response Details
            </h3>

            {responseLoading ? (
              <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-red-500"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Donor Information Card */}
                <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                  <h4 className="text-lg font-medium text-gray-700 mb-3 flex items-center">
                    <User className="w-5 h-5 mr-2 text-blue-600" />
                    Donor Information
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Blood Group
                      </p>
                      <p className="text-gray-800 font-medium">
                        {response?.donorId?.bloodGroup || "Not available"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Toggle
                      </p>
                      <p className="text-gray-800 font-medium">
                        {response?.donorId?.email || "Not available"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Alert Response Card */}
                <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                  <h4 className="text-lg font-medium text-gray-700 mb-3 flex items-center">
                    <AlertTriangle className="w-5 h-5 mr-2 text-red-600" />
                    Response Details
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Blood Group
                      </p>
                      <p className="text-gray-800 font-medium">
                        {response?.alertId?.bloodGroup || "N/A"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Your Response
                      </p>
                      <p
                        className={`font-medium ${
                          response?.response === "Yes"
                            ? "text-green-600"
                            : "text-gray-600"
                        }`}
                      >
                        {response?.response || "No response yet"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Response Date
                      </p>
                      <p className="text-gray-800 font-medium">
                        {response?.createdAt
                          ? new Date(response.createdAt).toLocaleDateString(
                              "en-GB",
                              {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              }
                            )
                          : "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="bg-gray-50 px-6 py-4 border-t flex justify-end space-x-3">
            <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
              Share Alert
            </button>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default AlertInfo;
