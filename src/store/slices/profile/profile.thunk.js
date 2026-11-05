import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BACKEND_BASE_URL } from "../../../env";

export const fetchProfile = createAsyncThunk(
  "fetch/profile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BACKEND_BASE_URL}/user/me`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

export const updateProfileThunk = createAsyncThunk(
  "update/profile",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`${BACKEND_BASE_URL}/user/update`, data, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

export const changePasswordThunk = createAsyncThunk(
  "change/password",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${BACKEND_BASE_URL}/user/change-password`,
        data,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);