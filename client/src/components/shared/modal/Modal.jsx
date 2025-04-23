import React, { useState } from "react";
import { useSelector } from "react-redux";
import InputType from "./../form/InputType";
import API from "./../../../services/API";

import { IoIosCloseCircle } from "react-icons/io";

const Modal = ({ isOpen, toggleModal }) => {
  const [inventoryType, setInventoryType] = useState("in");
  const [bloodGroup, setBloodGroup] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [email, setEmail] = useState("");
  const { user } = useSelector((state) => state.auth);
  // handle modal data
  const handleModalSubmit = async () => {
    try {
      if (!bloodGroup || !quantity) {
        return alert("Please Provide All Fields");
      }
      const { data } = await API.post("/inventory/create-inventory", {
        email,
        organisation: user?._id,
        inventoryType,
        bloodGroup,
        quantity,
      });
      if (data?.success) {
        alert("New Record Created");
        window.location.reload();
      }
    } catch (error) {
      alert(error.response.data.message);
      console.log(error);
      window.location.reload();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Modal */}
      <div className="fixed inset-0 bg-transparent bg-opacity-100 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-gray-300 py-6 px-4 shadow-lg w-full rounded-4xl md:w-1/3">
          <div className="flex justify-between items-center p-4">
            <h1 className="text-3xl font-semibold">Manage Blood Record</h1>
            <button
              type="button"
              className="text-gray-600 hover:text-red-600 cursor-pointer"
              onClick={toggleModal}
            >
              <IoIosCloseCircle className="text-4xl" />
            </button>
          </div>
          <div className="p-8">
            <div className="flex mb-4">
              <span className="mr-2 font-bold">Blood Type:</span>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="inRadio"
                    defaultChecked
                    value={"in"}
                    onChange={(e) => setInventoryType(e.target.value)}
                    className="form-radio text-red-500"
                  />
                  <label htmlFor="in" className="ml-2">
                    IN
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="inRadio"
                    value={"out"}
                    onChange={(e) => setInventoryType(e.target.value)}
                    className="form-radio text-red-500"
                  />
                  <label htmlFor="out" className="ml-2">
                    OUT
                  </label>
                </div>
              </div>
            </div>
            <select
              className="w-full p-3 mb-4 border border-gray-400 rounded-lg shadow-sm focus:outline-none transition duration-200 hover:border-gray-800 font-semibold cursor-pointer"
              onChange={(e) => setBloodGroup(e.target.value)}
            >
              <option defaultValue={"Select Blood Group"}>
                Select Blood Group
              </option>
              <option value={"O+"} className="p-2">
                O+
              </option>
              <option value={"O-"} className="p-2">
                O-
              </option>
              <option value={"AB+"} className="p-2">
                AB+
              </option>
              <option value={"AB-"} className="p-2">
                AB-
              </option>
              <option value={"A+"} className="p-2">
                A+
              </option>
              <option value={"A-"} className="p-2">
                A-
              </option>
              <option value={"B+"} className="p-2">
                B+
              </option>
              <option value={"B-"} className="p-2">
                B-
              </option>
            </select>

            <InputType
              labelText={"Donor Email"}
              labelFor={"donorEmail"}
              inputType={"email"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputType
              labelText={"Quantity (ML)"}
              labelFor={"quantity"}
              inputType={"number"}
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          <div className="flex justify-center items-center p-2 ">
            <button
              type="button"
              className="bg-blue-500 text-white font-bold text-2xl px-4 py-2 rounded-md hover:bg-blue-600 ml-3 cursor-pointer"
              onClick={handleModalSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
