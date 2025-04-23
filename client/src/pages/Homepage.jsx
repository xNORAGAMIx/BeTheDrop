import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/shared/Spinner";
import Layout from "../components/shared/Layout/Layout";
import Modal from "../components/shared/modal/Modal";
import API from "../services/API";
import moment from "moment";

const Homepage = () => {
  const { loading, error, user } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  //get function
  const getBloodRecords = async () => {
    try {
      const { data } = await API.get("/inventory/get-inventory");
      if (data?.success) {
        setData(data?.inventory);
        // console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    getBloodRecords();
  }, []);
  return (
    <Layout>
      {user?.role === "admin" && navigate("/admin")}
      {error && <span>{alert(error)}</span>}
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="container mx-auto p-4">
            <h4
              className="flex items-center ms-4 cursor-pointer text-lg font-semibold"
              onClick={toggleModal}
            >
              <i className="fa-solid fa-plus text-success py-4 mr-2"></i>
              Add Inventory
            </h4>
            <table className="min-w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th scope="col" className="px-4 py-2 border-b">
                    Blood Group
                  </th>
                  <th scope="col" className="px-4 py-2 border-b">
                    Inventory Type
                  </th>
                  <th scope="col" className="px-4 py-2 border-b">
                    Quantity
                  </th>
                  <th scope="col" className="px-4 py-2 border-b">
                    Donor Email
                  </th>
                  <th scope="col" className="px-4 py-2 border-b">
                    Time & Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.map((record) => (
                  <tr key={record._id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border-b">{record.bloodGroup}</td>
                    <td className="px-4 py-2 border-b">
                      {record.inventoryType}
                    </td>
                    <td className="px-4 py-2 border-b">
                      {record.quantity} (ML)
                    </td>
                    <td className="px-4 py-2 border-b">{record.email}</td>
                    <td className="px-4 py-2 border-b">
                      {moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <Modal isOpen={isModalOpen} toggleModal={toggleModal} />
          </div>
        </>
      )}
    </Layout>
  );
};

export default Homepage;
