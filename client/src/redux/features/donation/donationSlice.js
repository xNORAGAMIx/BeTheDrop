import { createSlice } from "@reduxjs/toolkit";
import { getDonationsHospital } from "./donationActions";

const initialState = {
    loading: false,
    donation: [],
    error: null,
}

const donationSlice = createSlice({
    name: "donation",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        // GET DONATIONS
        builder.addCase(getDonationsHospital.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(getDonationsHospital.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.donation = payload.donations;
        });
        builder.addCase(getDonationsHospital.rejected, (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        });
    },
})

export default donationSlice;
