import { createSlice } from "@reduxjs/toolkit";
import {
  createAppointmentThunk,
  updateAppointmentThunk,
  deleteAppointmentThunk,
  fetchMyAppointmentsThunk,
  fetchAllAppointmentsThunk,
} from "./appointment.thunk";

const initialState = {
  appointments: [],
  loading: false,
  error: null,
};

const appointmentSlice = createSlice({
  name: "appointments",
  initialState,
  reducers: {
    clearAppointmentError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // CREATE
      .addCase(createAppointmentThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(createAppointmentThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments.unshift(action.payload);
      })
      .addCase(createAppointmentThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UPDATE
      .addCase(updateAppointmentThunk.fulfilled, (state, action) => {
        const index = state.appointments.findIndex(
          (a) => a._id === action.payload._id
        );
        if (index !== -1) {
          state.appointments[index] = action.payload;
        }
      })

      // DELETE
      .addCase(deleteAppointmentThunk.fulfilled, (state, action) => {
        state.appointments = state.appointments.filter(
          (a) => a._id !== action.payload
        );
      })

      // FETCH MY
      .addCase(fetchMyAppointmentsThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMyAppointmentsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments = action.payload;
      })
      .addCase(fetchMyAppointmentsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // FETCH ALL
      .addCase(fetchAllAppointmentsThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllAppointmentsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments = action.payload;
      })
      .addCase(fetchAllAppointmentsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearAppointmentError } = appointmentSlice.actions;
export default appointmentSlice.reducer;