import { createSlice } from "@reduxjs/toolkit";
import { fetchDoctorsForHomeThunk } from "./public.thunk";

const initialState = {
  loading: false,
  doctors: [],
  error: null,
};

const doctorsSlice = createSlice({
  name: "doctors",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchDoctorsForHomeThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDoctorsForHomeThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.doctors = action.payload;
      })
      .addCase(fetchDoctorsForHomeThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default doctorsSlice.reducer;