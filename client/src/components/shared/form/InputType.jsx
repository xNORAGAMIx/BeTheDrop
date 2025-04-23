/* eslint-disable no-unused-vars */
import React from "react";

const InputType = ({ labelFor, labelText, value, onChange, name, type }) => {
  return (
    <>
      <div className="mb-4 flex flex-col space-y-2">
        <label htmlFor={labelFor} className="text-sm font-medium text-gray-700">
          {labelText}
        </label>
        <input
          type={type}
          className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          name={name}
          value={value}
          onChange={onChange}
        />
      </div>
    </>
  );
};

export default InputType;
