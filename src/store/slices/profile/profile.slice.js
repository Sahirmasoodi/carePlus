import { createSlice } from "@reduxjs/toolkit";
import { fetchProfile } from "./profile.thunk";

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    profile: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload.data;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.profile = null;
        state.error = action.payload.data;
      });
  },
});

export default profileSlice.reducer;
