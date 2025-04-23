import React from "react";
import Form from "../../components/shared/form/Form";
import { useSelector } from "react-redux";
import Spinner from "../../components/shared/Spinner";

const Register = () => {
  const { loading, error } = useSelector((state) => state.auth);
  return (
    <>
      {error && <span>{alert(error)}</span>}
      {loading ? (
        <Spinner />
      ) : (
        <div>
            <Form
              formTitle={"Register"}
              submitBtn={"Register"}
              formType={"register"}
            />
        </div>
      )}
    </>
  );
};

export default Register;
