import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/auth/authSlice";
import donationSlice from "./features/donation/donationSlice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    donation: donationSlice.reducer,
    
  },
});

export default store;
