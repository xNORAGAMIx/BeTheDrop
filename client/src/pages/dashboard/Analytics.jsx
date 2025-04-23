import React, { useEffect, useState } from "react";
import API from "../../services/API";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
} from "chart.js";
import Layout from "../../components/shared/Layout/Layout";
import { Activity, Droplet, AlertTriangle, ArrowUpRight, User } from "lucide-react";
import { motion } from "framer-motion";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip
);

const HospitalAnalytics = () => {
  const [analyticsData, setAnalyticsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const { data } = await API.get("/analytics/hospital");
        if (data?.status) {
          setAnalyticsData(data.analytics);
        }
      } catch (error) {
        console.error("Failed to fetch hospital analytics:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  const months = analyticsData.map((item) => item.month);

  const data = {
    labels: months,
    datasets: [
      {
        label: "Received Blood (ml)",
        data: analyticsData.map((item) => item.receivedML),
        borderColor: "#10b981", // green-500
        backgroundColor: "#10b981",
        borderWidth: 2,
        pointBackgroundColor: "#fff",
        pointBorderColor: "#10b981",
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        tension: 0.3,
      },
      {
        label: "Sent Blood (ml)",
        data: analyticsData.map((item) => item.sentML),
        borderColor: "#ef4444", // red-500
        backgroundColor: "#ef4444",
        borderWidth: 2,
        pointBackgroundColor: "#fff",
        pointBorderColor: "#ef4444",
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        tension: 0.3,
      },
      {
        label: "Total Donations",
        data: analyticsData.map((item) => item.totalDonations),
        borderColor: "#3b82f6", // blue-500
        backgroundColor: "#3b82f6",
        borderWidth: 2,
        pointBackgroundColor: "#fff",
        pointBorderColor: "#3b82f6",
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        tension: 0.3,
      },
      {
        label: "Total Alerts",
        data: analyticsData.map((item) => item.totalAlerts),
        borderColor: "#f59e0b", // amber-500
        backgroundColor: "#f59e0b",
        borderWidth: 2,
        pointBackgroundColor: "#fff",
        pointBorderColor: "#f59e0b",
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#4b5563", // gray-600
          font: {
            family: "'Inter', sans-serif",
            size: 12,
            weight: "500",
          },
          padding: 20,
          usePointStyle: true,
          pointStyle: "circle",
        },
      },
      tooltip: {
        mode: "index",
        intersect: false,
        backgroundColor: "#1f2937", // gray-800
        titleColor: "#f9fafb", // gray-50
        bodyColor: "#e5e7eb", // gray-200
        titleFont: {
          family: "'Inter', sans-serif",
          size: 14,
          weight: "600",
        },
        bodyFont: {
          family: "'Inter', sans-serif",
          size: 12,
        },
        padding: 12,
        cornerRadius: 8,
        displayColors: true,
        borderColor: "#374151", // gray-700
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#6b7280", // gray-500
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: "#e5e7eb", // gray-200
        },
        ticks: {
          color: "#6b7280", // gray-500
          stepSize: 10,
        },
      },
    },
  };

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
      <div className="max-w-7xl mx-auto px-4 py-8">
        <motion.div
          className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-red-600 to-red-700 p-6 text-white">
            <div className="flex items-center">
              <Activity className="w-8 h-8 mr-3" />
              <div>
                <h1 className="text-2xl font-bold">HOSPITAL ANALYTICS</h1>
                <p className="text-red-100">
                  Monthly blood management statistics
                </p>
              </div>
            </div>
          </div>

          {/* Analytics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-6">
            <div className="bg-green-50 p-4 rounded-lg border border-green-100">
              <div className="flex items-center mb-2">
                <Droplet className="w-6 h-6 text-green-600 mr-2" />
                <h3 className="text-lg font-semibold text-gray-800">
                  Avg. Blood Received
                </h3>
              </div>
              <p className="text-2xl font-bold text-green-600">
                {analyticsData.reduce((acc, curr) => acc + curr.receivedML, 0) /
                  analyticsData.length || 0}
                ml
              </p>
            </div>

            <div className="bg-red-50 p-4 rounded-lg border border-red-100">
              <div className="flex items-center mb-2">
                <Droplet className="w-6 h-6 text-red-600 mr-2" />
                <h3 className="text-lg font-semibold text-gray-800">
                  Avg. Blood Sent
                </h3>
              </div>
              <p className="text-2xl font-bold text-red-600">
                {analyticsData.reduce((acc, curr) => acc + curr.sentML, 0) /
                  analyticsData.length || 0}
                ml
              </p>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <div className="flex items-center mb-2">
                <User className="w-6 h-6 text-blue-600 mr-2" />
                <h3 className="text-lg font-semibold text-gray-800">
                  Total Donations
                </h3>
              </div>
              <p className="text-2xl font-bold text-blue-600">
                {analyticsData.reduce(
                  (acc, curr) => acc + curr.totalDonations,
                  0
                )}
              </p>
            </div>

            <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
              <div className="flex items-center mb-2">
                <AlertTriangle className="w-6 h-6 text-amber-600 mr-2" />
                <h3 className="text-lg font-semibold text-gray-800">
                  Total Alerts
                </h3>
              </div>
              <p className="text-2xl font-bold text-amber-600">
                {analyticsData.reduce((acc, curr) => acc + curr.totalAlerts, 0)}
              </p>
            </div>
          </div>

          {/* Chart */}
          <div className="p-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                  <ArrowUpRight className="w-5 h-5 mr-2 text-red-600" />
                  Monthly Trends
                </h3>
              </div>
              <div className="h-96">
                <Line data={data} options={options} />
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="bg-gray-50 p-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Key Insights
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <p className="text-sm text-gray-500 mb-1">Peak Month</p>
                <p className="font-medium">
                  {analyticsData.length > 0
                    ? analyticsData.reduce((prev, current) =>
                        prev.receivedML > current.receivedML ? prev : current
                      ).month
                    : "N/A"}
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <p className="text-sm text-gray-500 mb-1">Most Alerts</p>
                <p className="font-medium">
                  {analyticsData.length > 0
                    ? analyticsData.reduce((prev, current) =>
                        prev.totalAlerts > current.totalAlerts ? prev : current
                      ).month
                    : "N/A"}
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <p className="text-sm text-gray-500 mb-1">Highest Donations</p>
                <p className="font-medium">
                  {analyticsData.length > 0
                    ? analyticsData.reduce((prev, current) =>
                        prev.totalDonations > current.totalDonations
                          ? prev
                          : current
                      ).month
                    : "N/A"}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default HospitalAnalytics;