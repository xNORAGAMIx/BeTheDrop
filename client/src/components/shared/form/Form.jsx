import { useState } from "react";
import { Link } from "react-router-dom";
import InputType from "./InputType";
import { handleLogin, handleRegister } from "../../../services/authService";
import {
  FiUser,
  FiMail,
  FiLock,
  FiHome,
  FiPhone,
  FiGlobe,
  FiChevronDown,
} from "react-icons/fi";

const Form = ({ formType, submitBtn, formTitle }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("donor");
  const [name, setName] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [hospitalId, setHospital] = useState();
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");

  const bloodGroupOptions = [
    { value: "", label: "Select Blood Group" },
    { value: "A+", label: "A+" },
    { value: "A-", label: "A-" },
    { value: "B+", label: "B+" },
    { value: "B-", label: "B-" },
    { value: "AB+", label: "AB+" },
    { value: "AB-", label: "AB-" },
    { value: "O+", label: "O+" },
    { value: "O-", label: "O-" },
  ];

  const genderOptions = [
    { value: "", label: "Select Gender" },
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
    { value: "Other", label: "Other" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col lg:flex-row">
        {/* Form Section */}
        <div className="w-full lg:w-1/2 p-8 md:p-12 lg:p-16">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">{formTitle}</h1>
            <p className="text-gray-600 mt-2">
              {formType === "login"
                ? "Welcome back! Please login to continue"
                : "Join our community to save lives"}
            </p>
          </div>

          <form
            onSubmit={(e) => {
              if (formType === "login") {
                return handleLogin(e, role, email, password);
              } else if (formType === "register") {
                return handleRegister(
                  e,
                  name,
                  age,
                  gender,
                  bloodGroup,
                  role,
                  email,
                  password,
                  address,
                  contact,
                  hospitalId
                );
              }
            }}
            className="space-y-6"
          >
            {/* Role Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Select Your Role
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {["donor", "admin", "hospital"].map((r) => (
                  <div key={r} className="flex items-center">
                    <input
                      type="radio"
                      id={`${r}Radio`}
                      name="role"
                      value={r}
                      checked={role === r}
                      onChange={(e) => setRole(e.target.value)}
                      className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300"
                    />
                    <label
                      htmlFor={`${r}Radio`}
                      className="ml-2 block text-sm text-gray-700 capitalize"
                    >
                      {r}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Form Fields */}
            {(() => {
              switch (true) {
                case formType === "login":
                  return (
                    <>
                      <InputType
                        labelText="Email"
                        labelFor="email"
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        icon={<FiMail className="text-gray-400" />}
                        placeholder="your@email.com"
                        required
                      />
                      <InputType
                        labelText="Password"
                        labelFor="password"
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        icon={<FiLock className="text-gray-400" />}
                        placeholder="••••••••"
                        required
                      />
                    </>
                  );
                case formType === "register":
                  return (
                    <>
                      {(role === "admin" || role === "donor") && (
                        <InputType
                          labelText="Full Name"
                          labelFor="name"
                          type="text"
                          name="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          icon={<FiUser className="text-gray-400" />}
                          placeholder="John Doe"
                          required
                        />
                      )}
                      {role === "hospital" && (
                        <InputType
                          labelText="Full Name"
                          labelFor="name"
                          type="text"
                          name="hospitalName"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          icon={<FiUser className="text-gray-400" />}
                          placeholder="Hospital Name"
                          required
                        />
                      )}
                      {/* Gender Select */}
                      <div className="mb-4">
                        <label
                          htmlFor="gender"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Gender
                        </label>
                        <div className="relative">
                          <select
                            id="gender"
                            name="gender"
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-700"
                          >
                            {genderOptions.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FiGlobe className="text-gray-400" />
                          </div>
                        </div>
                      </div>
                      <InputType
                        labelText="Email"
                        labelFor="email"
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        icon={<FiMail className="text-gray-400" />}
                        placeholder="your@email.com"
                        required
                      />
                      <InputType
                        labelText="Password"
                        labelFor="password"
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        icon={<FiLock className="text-gray-400" />}
                        placeholder="••••••••"
                        required
                      />
                      <InputType
                        labelText="Age"
                        labelFor="age"
                        type="text"
                        name="age"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        icon={<FiHome className="text-gray-400" />}
                        placeholder="15"
                        required
                      />
                      <InputType
                        labelText="Address"
                        labelFor="address"
                        type="text"
                        name="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        icon={<FiHome className="text-gray-400" />}
                        placeholder="123 Main St, City"
                        required
                      />
                      <InputType
                        labelText="Phone Number"
                        labelFor="phone"
                        type="tel"
                        name="phone"
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                        icon={<FiPhone className="text-gray-400" />}
                        placeholder="+1 234 567 890"
                        required
                      />
                      {/* Blood Group Select */}
                      <div className="mb-4">
                        <label
                          htmlFor="bloodGroup"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Blood Group
                        </label>
                        <div className="relative">
                          <select
                            id="bloodGroup"
                            name="bloodGroup"
                            value={bloodGroup}
                            onChange={(e) => setBloodGroup(e.target.value)}
                            className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-700"
                          >
                            {bloodGroupOptions.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FiGlobe className="text-gray-400" />
                          </div>
                        </div>
                      </div>
                      {/* <InputType
                        labelText="Blood Group"
                        labelFor="bloodGroup"
                        type="text"
                        name="bloodGroup"
                        value={bloodGroup}
                        onChange={(e) => setBloodGroup(e.target.value)}
                        icon={<FiGlobe className="text-gray-400" />}
                        placeholder="https://example.com"
                      /> */}
                      <InputType
                        labelText="Hospital"
                        labelFor="hospital"
                        type="text"
                        name="hospital"
                        value={hospitalId}
                        onChange={(e) => setHospital(e.target.value)}
                        icon={<FiGlobe className="text-gray-400" />}
                        placeholder="https://example.com"
                      />
                    </>
                  );
              }
            })()}

            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-3.5 px-4 rounded-lg font-semibold shadow-md transition-all duration-300 flex items-center justify-center hover:cursor-pointer"
              >
                <span className="mr-2">{submitBtn}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>

            <div className="text-center text-sm text-gray-600 pt-4">
              {formType === "login" ? (
                <>
                  Don't have an account?{" "}
                  <Link
                    to="/register"
                    className="font-medium text-red-600 hover:text-red-700"
                  >
                    Register here
                  </Link>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="font-medium text-red-600 hover:text-red-700"
                  >
                    Login here
                  </Link>
                </>
              )}
            </div>
          </form>
        </div>

        {/* Image Section */}
        <div
          className="hidden lg:flex lg:w-1/2 bg
        -gradient-to-br from-red-50 to-red-100 items-center justify-center p-12"
        >
          <div className="relative w-full h-full">
            <Link to="/">
              <img
                src="/logo.png"
                alt="Blood donation illustration"
                className="w-full h-full object-contain"
              />
            </Link>
            <div className="absolute bottom-8 left-0 right-0 text-center">
              <h3 className="text-xl font-bold text-gray-800">
                Save Lives With Us
              </h3>
              <p className="text-gray-600 mt-2">
                Every donation makes a difference
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
