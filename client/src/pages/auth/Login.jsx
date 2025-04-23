import Form from "../../components/shared/form/Form";

const Login = () => {
  return (
    <>
      <div className="py-16">
        <Form formType={"login"} formTitle={"Login Page"} submitBtn={"Login"}/>
      </div>
    </>
  );
};

export default Login;
