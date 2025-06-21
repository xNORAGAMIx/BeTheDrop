import React from "react";

const InputType = ({
  labelFor,
  labelText,
  value,
  onChange,
  name,
  type = "text",
  placeholder = "",
  required = false,
  disabled = false,
  error = null,
  icon = null,
  className = "",
}) => {
  return (
    <div className={`mb-6 ${className}`}>
      <div className="flex justify-between items-center mb-1">
        <label
          htmlFor={labelFor}
          className={`block text-sm font-medium ${
            disabled ? "text-gray-400" : "text-gray-700"
          }`}
        >
          {labelText}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        {error && (
          <span className="text-xs font-medium text-red-500">{error}</span>
        )}
      </div>

      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {React.cloneElement(icon, {
              className: `h-5 w-5 ${
                disabled ? "text-gray-400" : "text-gray-500"
              }`,
            })}
          </div>
        )}
        <input
          type={type}
          id={labelFor}
          className={`block w-full rounded-lg border transition-all duration-200 ${
            icon ? "pl-10 pr-4" : "px-4"
          } py-3 ${
            disabled
              ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          } ${error ? "border-red-500 focus:border-red-500 focus:ring-red-200" : ""}`}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${labelFor}-error` : undefined}
        />
      </div>
    </div>
  );
};

export default InputType;