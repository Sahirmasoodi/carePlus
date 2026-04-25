import { createSlice } from "@reduxjs/toolkit";
import { fetchProfile, updateProfileThunk, changePasswordThunk } from "./profile.thunk";

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    profile: null,
    loading: false,
    error: null,
    updateLoading: false,
    updateError: null,
    updateSuccess: false,
    passwordLoading: false,
    passwordError: null,
    passwordSuccess: false,
  },
  reducers: {
    resetUpdateStatus: (state) => {
      state.updateError = null;
      state.updateSuccess = false;
    },
    resetPasswordStatus: (state) => {
      state.passwordError = null;
      state.passwordSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetch
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload.data;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.profile = null;
        state.error = action.payload;
      })

      // update profile
      .addCase(updateProfileThunk.pending, (state) => {
        state.updateLoading = true;
        state.updateError = null;
        state.updateSuccess = false;
      })
      .addCase(updateProfileThunk.fulfilled, (state, action) => {
        state.updateLoading = false;
        state.updateSuccess = true;
        state.profile = action.payload.data;
      })
      .addCase(updateProfileThunk.rejected, (state, action) => {
        state.updateLoading = false;
        state.updateError = action.payload?.message || "Update failed";
      })

      // change password
      .addCase(changePasswordThunk.pending, (state) => {
        state.passwordLoading = true;
        state.passwordError = null;
        state.passwordSuccess = false;
      })
      .addCase(changePasswordThunk.fulfilled, (state) => {
        state.passwordLoading = false;
        state.passwordSuccess = true;
      })
      .addCase(changePasswordThunk.rejected, (state, action) => {
        state.passwordLoading = false;
        state.passwordError = action.payload?.message || "Password change failed";
      });
  },
});

export const { resetUpdateStatus, resetPasswordStatus } = profileSlice.actions;
export default profileSlice.reducer;