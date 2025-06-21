import { userLogin, userRegister } from "../redux/features/auth/authActions";
import store from "../redux/store";

export const handleLogin = (e, role, email, password) => {
  e.preventDefault();
  try {
    if (!role || !email || !password) {
      return alert("Please Provide All Feilds");
    }
    store.dispatch(userLogin({ role, email, password }));
  } catch (error) {
    console.log(error.message);
  }
};

export const handleRegister = (
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
) => {
  e.preventDefault();
  try {
    store.dispatch(
      userRegister({
        name,
        age,
        gender,
        bloodGroup,
        role,
        email,
        password,
        address,
        contact,
        hospitalId,
      })
    );
  } catch (error) {
    console.log(error);
  }
};
