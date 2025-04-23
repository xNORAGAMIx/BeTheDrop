import { userLogin, userRegister } from "../redux/features/auth/authActions";
import store from "../redux/store";

export const handleLogin = (e, role, email, password) => {
  e.preventDefault();
  try {
    if (!role || !email || !password) {
      return alert("Please Provide All Feilds");
    }
    console.log({email, password, role});
    
    store.dispatch(userLogin({ role, email, password }));
  } catch (error) {
    console.log(error);
  }
};

export const handleRegister = (
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
) => {
  e.preventDefault();
  try {
    console.log(
      {role,
      email,
      password,
      website,
      name,
      address,
      phone,
      organisationName,
      hospitalName}
    );

    store.dispatch(
      userRegister({
        role,
        email,
        password,
        website,
        name,
        address,
        phone,
        organisationName,
        hospitalName,
      })
    );
  } catch (error) {
    console.log(error);
  }
};
