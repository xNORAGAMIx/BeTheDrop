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
      <div className="w-full max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
        <form
          onSubmit={(e) => {
            if (formType === "login") {
              return handleLogin(e, email, password, role);
            } else if (formType === "register") {
              return handleRegister(
                e,
                email,
                password,
                role,
                name,
                organisationName,
                hospitalName,
                website,
                address,
                phone
              );
            }
          }}
        >
          <h1 className="text-center text-2xl font-semibold text-gray-800 mb-4">
            {formTitle}
          </h1>
          <hr className="mb-4 border-gray-300" />

          <div className="flex space-x-4 mb-4">
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
              <label htmlFor="organisationRadio" className="ml-2 text-gray-700">
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

          <div className="flex justify-between items-center mt-4">
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
            <button
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
              type="submit"
            >
              {submitBtn}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Form;
