import { createSlice } from "@reduxjs/toolkit";
import { myAppointments } from "./appointment.thunk";

const appointmentSlice = createSlice({
  name: "appointment",
  initialState: {
    appointments: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(myAppointments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(myAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments = action.payload?.data;
      })
      .addCase(myAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.data;
      });
  },
});

export default appointmentSlice.reducer;
