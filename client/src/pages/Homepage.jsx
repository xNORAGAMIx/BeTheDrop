import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/shared/Spinner";
import Layout from "../components/shared/Layout/Layout";
import Modal from "../components/shared/modal/Modal";
import API from "../services/API";
import moment from "moment";
import { FaPlus, FaSort, FaTimesCircle } from "react-icons/fa";

const Homepage = () => {
  const { loading, user } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState("asc");
  
  const navigate = useNavigate();
  console.log(user);
  console.log(loading);
  
  

  // Fetch Blood Records
  const getBloodRecords = async () => {
    try {
      const { data } = await API.get("/inventory/get-inventory");
      if (data?.status) {
        setData(data?.inventory);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Toggle Modal
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Sort by Quantity
  const sortRecords = () => {
    const sorted = [...data].sort((a, b) => {
      return sortOrder === "asc"
        ? a.quantity - b.quantity
        : b.quantity - a.quantity;
    });
    setData(sorted);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  useEffect(() => {
     getBloodRecords();
  }, []);

  return (
    <Layout>
      {user?.role === "admin" && navigate("/admin")}
      
      {loading ? (
        <Spinner />
      ) : (
        <div className="container mx-auto px-6 py-12">
          
          {/* Header Section */}
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-4xl font-extrabold text-gray-800 tracking-tight">
              Blood Inventory
            </h2>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={sortRecords}
                className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium px-4 py-2 rounded-lg shadow-md transition-all"
              >
                <FaSort />
                Sort by Quantity
              </button>

              <button
                onClick={toggleModal}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 rounded-lg shadow-md transition-all"
              >
                <FaPlus />
                Add Inventory
              </button>
            </div>
          </div>

          {/* Table Section */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead className="bg-gray-100 text-gray-600">
                  <tr>
                    <th className="px-6 py-4 text-left font-medium">Blood Group</th>
                    <th className="px-6 py-4 text-left font-medium">Inventory Type</th>
                    <th className="px-6 py-4 text-left font-medium">Quantity</th>
                    <th className="px-6 py-4 text-left font-medium">Donor Email</th>
                    <th className="px-6 py-4 text-left font-medium">Time & Date</th>
                  </tr>
                </thead>
                <tbody>
                  {data.length > 0 ? (
                    data.map((record) => (
                      <tr key={record._id} className="border-b hover:bg-gray-50 transition">
                        <td className="px-6 py-4 text-gray-700 font-medium">{record.bloodGroup}</td>
                        <td className="px-6 py-4">{record.inventoryType}</td>
                        <td className="px-6 py-4 font-bold text-blue-500">{record.quantity} mL</td>
                        <td className="px-6 py-4">{record.email}</td>
                        <td className="px-6 py-4">
                          {moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center py-6 text-gray-500">
                        <FaTimesCircle className="inline-block text-4xl mb-2" />
                        <p>No blood records found</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Modal */}
          <Modal isOpen={isModalOpen} toggleModal={toggleModal} />
        </div>
      )}
    </Layout>
  );
};

export default Homepage;
