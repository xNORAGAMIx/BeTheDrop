import { useEffect, useState } from "react";
import Layout from "../../components/shared/Layout/Layout";
import API from "../../services/API";
import moment from "moment";
import { Droplet, RefreshCw, AlertTriangle } from "lucide-react";

const ALL_BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const Inventory = () => {
  const [summaryData, setSummaryData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);

  // Gradient colors with better contrast
  const bloodGroupColors = {
    "A+": "from-red-500 to-red-400",
    "A-": "from-red-600 to-red-500",
    "B+": "from-blue-500 to-blue-400",
    "B-": "from-blue-600 to-blue-500",
    "AB+": "from-purple-500 to-purple-400",
    "AB-": "from-purple-600 to-purple-500",
    "O+": "from-orange-500 to-orange-400",
    "O-": "from-orange-600 to-orange-500",
  };

  const getBloodSummary = async () => {
    setIsLoading(true);
    try {
      const { data } = await API.get("/hospital/blood-summary");
      if (data?.status) {
        const fetched = data.bloodSummary;
        const summaryMap = {};
        fetched.forEach((item) => {
          summaryMap[item.bloodGroup] = item;
        });

        const mergedData = ALL_BLOOD_GROUPS.map((group) => {
          return (
            summaryMap[group] || {
              bloodGroup: group,
              totalQuantity: 0,
              lastUpdated: new Date(),
            }
          );
        });

        setSummaryData(mergedData);
        setLastUpdated(new Date());
      }
    } catch (error) {
      console.log("Error fetching blood summary:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getBloodSummary();
  }, []);

  const getQuantityLevel = (quantity) => {
    if (quantity === 0) return "critical";
    if (quantity < 500) return "low";
    if (quantity < 1000) return "medium";
    return "good";
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">
            Blood Inventory
          </h1>
          <div className="flex items-center space-x-4">
            {lastUpdated && (
              <p className="text-sm text-gray-500">
                Last refresh: {moment(lastUpdated).format("h:mm A")}
              </p>
            )}
            <button
              onClick={getBloodSummary}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
              disabled={isLoading}
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-pulse text-gray-500">Loading inventory...</div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {summaryData.map((item) => {
                const level = getQuantityLevel(item.totalQuantity);
                const levelColors = {
                  critical: "bg-red-100 text-red-800",
                  low: "bg-yellow-100 text-yellow-800",
                  medium: "bg-blue-100 text-blue-800",
                  good: "bg-green-100 text-green-800",
                };

                return (
                  <div
                    key={item.bloodGroup}
                    className={`bg-gradient-to-br ${bloodGroupColors[item.bloodGroup]} text-white p-6 rounded-xl shadow-md transition hover:shadow-lg`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h2 className="text-2xl font-bold">{item.bloodGroup}</h2>
                        <span className={`text-xs px-2 py-1 rounded-full ${levelColors[level]} mt-2 inline-block`}>
                          {level.toUpperCase()}
                        </span>
                      </div>
                      <Droplet className="w-6 h-6 opacity-90" />
                    </div>

                    <div className="mt-6">
                      <div className="flex justify-between items-end">
                        <div>
                          <p className="text-sm opacity-80">Available</p>
                          <p className="text-3xl font-bold mt-1">
                            {item.totalQuantity} <span className="text-xl">ml</span>
                          </p>
                        </div>
                        {level === "critical" && (
                          <AlertTriangle className="w-6 h-6 text-red-200" />
                        )}
                      </div>
                    </div>

                    <p className="mt-4 text-xs opacity-80">
                      Updated: {moment(item.lastUpdated).format("MMM D, h:mm A")}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Critical Stock Warning */}
            {summaryData.some(item => getQuantityLevel(item.totalQuantity) === "critical") && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8">
                <div className="flex items-center">
                  <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
                  <p className="text-red-700 font-medium">
                    Critical blood levels detected! Please arrange for donations immediately.
                  </p>
                </div>
              </div>
            )}

            {/* Summary Statistics */}
            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="text-lg font-semibold mb-4">Inventory Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-600">Total Blood Available</p>
                  <p className="text-2xl font-bold mt-1">
                    {summaryData.reduce((sum, item) => sum + item.totalQuantity, 0)} ml
                  </p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-green-600">Highest Stock</p>
                  <p className="text-2xl font-bold mt-1">
                    {summaryData.reduce((max, item) => 
                      item.totalQuantity > max.totalQuantity ? item : max, 
                      {bloodGroup: "", totalQuantity: 0}
                    ).bloodGroup}
                  </p>
                </div>
                <div className="bg-red-50 p-4 rounded-lg">
                  <p className="text-sm text-red-600">Lowest Stock</p>
                  <p className="text-2xl font-bold mt-1">
                    {summaryData.reduce((min, item) => 
                      item.totalQuantity < min.totalQuantity ? item : min, 
                      {bloodGroup: "", totalQuantity: Infinity}
                    ).bloodGroup}
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Inventory;