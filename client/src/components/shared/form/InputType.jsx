/* eslint-disable no-unused-vars */
import React from "react";

const InputType = ({ labelFor, labelText, value, onChange, name, type }) => {
  return (
    <>
      <div className="mb-4 flex flex-col space-y-2">
        <label htmlFor={labelFor} className="text-sm font-medium text-gray-700 uppercase">
          {labelText}
        </label>
        <input
          type={type}
          className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
          name={name}
          value={value}
          onChange={onChange}
        />
      </div>
    </>
  );
};

export default InputType;
