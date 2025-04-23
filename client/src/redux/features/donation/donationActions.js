import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../services/API";

export const getDonationsHospital = createAsyncThunk(
  "hopital/donations",
  async (_, {rejectWithValue }) => {
    try {
      console.log("data ");

      const { data } = await API.get("/hospital/donations");
      if (data.status) {
        console.log(data.message);
      }
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
