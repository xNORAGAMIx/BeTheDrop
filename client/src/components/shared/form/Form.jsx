import { useState } from "react";
import { Link } from "react-router-dom";
import InputType from "./InputType";

import { handleLogin, handleRegister } from "../../../services/authService";

const Form = ({ formType, submitBtn, formTitle }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("donor");
  const [name, setName] = useState("");
  const [organisationName, setOrganisationName] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [website, setWebsite] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  return (
    <>
      <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
        <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
          <form
            className="p-16 flex flex-col space-y-6"
            onSubmit={(e) => {
              if (formType === "login") {
                return handleLogin(e, role, email, password);
              } else if (formType === "register") {
                return handleRegister(
                  e,
                  name,
                  role,
                  email,
                  password,
                  phone,
                  organisationName,
                  address,
                  hospitalName,
                  website
                );
              }
            }}
          >
            <div>
              <img
                src="https://storage.googleapis.com/devitary-image-host.appspot.com/15846435184459982716-LogoMakr_7POjrN.png"
                className="w-32 mx-auto"
              />
            </div>
            <h1 className="text-2xl xl:text-3xl font-extrabold text-center">
              {formTitle}
            </h1>

            <hr className="mb-4 border-black" />

            <div className="flex space-x-4 mb-6">
              <div className="form-check">
                <input
                  type="radio"
                  className="form-radio text-blue-500"
                  name="role"
                  id="donorRadio"
                  value={"donor"}
                  onChange={(e) => setRole(e.target.value)}
                  defaultChecked
                />
                <label htmlFor="donorRadio" className="ml-2 text-gray-700">
                  Donor
                </label>
              </div>
              <div className="form-check">
                <input
                  type="radio"
                  className="form-radio text-blue-500"
                  name="role"
                  id="adminRadio"
                  value={"admin"}
                  onChange={(e) => setRole(e.target.value)}
                />
                <label htmlFor="adminRadio" className="ml-2 text-gray-700">
                  Admin
                </label>
              </div>
              <div className="form-check">
                <input
                  type="radio"
                  className="form-radio text-blue-500"
                  name="role"
                  id="hospitalRadio"
                  value={"hospital"}
                  onChange={(e) => setRole(e.target.value)}
                />
                <label htmlFor="hospitalRadio" className="ml-2 text-gray-700">
                  Hospital
                </label>
              </div>
              <div className="form-check">
                <input
                  type="radio"
                  className="form-radio text-blue-500"
                  name="role"
                  id="organisationRadio"
                  value={"organisation"}
                  onChange={(e) => setRole(e.target.value)}
                />
                <label
                  htmlFor="organisationRadio"
                  className="ml-2 text-gray-700"
                >
                  Organisation
                </label>
              </div>
            </div>

            {/* switch statement */}
            {(() => {
              switch (true) {
                case formType === "login": {
                  return (
                    <>
                      <InputType
                        labelText={"Email"}
                        labelFor={"forEmail"}
                        type={"email"}
                        name={"email"}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <InputType
                        labelText={"Password"}
                        labelFor={"forPassword"}
                        type={"password"}
                        name={"password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </>
                  );
                }
                case formType === "register": {
                  return (
                    <>
                      {(role === "admin" || role === "donor") && (
                        <InputType
                          labelText={"Name"}
                          labelFor={"forName"}
                          type={"text"}
                          name={"name"}
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      )}
                      {role === "organisation" && (
                        <InputType
                          labelText={"Organisation Name"}
                          labelFor={"forOrganisationName"}
                          type={"text"}
                          name={"organisationName"}
                          value={organisationName}
                          onChange={(e) => setOrganisationName(e.target.value)}
                        />
                      )}
                      {role === "hospital" && (
                        <InputType
                          labelText={"Hospital Name"}
                          labelFor={"forHospitalName"}
                          type={"text"}
                          name={"hospitalName"}
                          value={hospitalName}
                          onChange={(e) => setHospitalName(e.target.value)}
                        />
                      )}

                      <InputType
                        labelText={"Email"}
                        labelFor={"forEmail"}
                        type={"email"}
                        name={"email"}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <InputType
                        labelText={"Password"}
                        labelFor={"forPassword"}
                        type={"password"}
                        name={"password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <InputType
                        labelText={"Website"}
                        labelFor={"forWebsite"}
                        type={"text"}
                        name={"website"}
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                      />
                      <InputType
                        labelText={"Address"}
                        labelFor={"forAddress"}
                        type={"text"}
                        name={"address"}
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                      <InputType
                        labelText={"Phone"}
                        labelFor={"forPhone"}
                        type={"text"}
                        name={"phone"}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </>
                  );
                }
              }
            })()}

            <div className="flex justify-between items-center">
              <button
                className="tracking-wide cursor-pointer font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                type="submit"
              >
                <svg
                  className="w-6 h-6 -ml-2"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                  <circle cx="8.5" cy="7" r="4" />
                  <path d="M20 8v6M23 11h-6" />
                </svg>
                <span className="ml-3">{submitBtn}</span>
              </button>
            </div>
            {formType === "login" ? (
              <p className="text-sm text-gray-600">
                Not registered yet?{" "}
                <Link to="/register" className="text-blue-500">
                  Register Here!
                </Link>
              </p>
            ) : (
              <p className="text-sm text-gray-600">
                Already a user?{" "}
                <Link to="/login" className="text-blue-500">
                  Login Here!
                </Link>
              </p>
            )}
          </form>

          <div className="flex-1 bg-indigo-100 text-center hidden lg:flex ">
            <div
              className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
              style={{
                backgroundImage:
                  "url('https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg')",
              }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Form;
