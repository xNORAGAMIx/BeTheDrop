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
        <div className="bg-white rounded-lg shadow-lg w-full md:w-1/3">
          <div className="flex justify-between items-center p-4 border-b">
            <h1 className="text-lg font-semibold">
              Manage Blood Record
            </h1>
            <button
              type="button"
              className="text-gray-600 hover:text-gray-800"
              onClick={toggleModal}
            >
              <IoIosCloseCircle className="text-2xl" />
            </button>
          </div>
          <div className="p-4">
            <div className="flex mb-4">
              <span className="mr-2">Blood Type:</span>
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
              className="form-select w-full p-2 mb-4 border border-gray-300 rounded-md"
              onChange={(e) => setBloodGroup(e.target.value)}
            >
              <option defaultValue="Open this select menu">
                Open this select menu
              </option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
            </select>
            <InputType
              labelText={"Donor Email"}
              labelFor={"donarEmail"}
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
          <div className="flex justify-end items-center p-4 border-t">
            <button
              type="button"
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
              onClick={toggleModal}
            >
              Close
            </button>
            <button
              type="button"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 ml-3"
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
