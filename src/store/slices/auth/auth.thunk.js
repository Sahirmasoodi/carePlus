import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BACKEND_BASE_URL } from "../../../env";

export const loginUser = createAsyncThunk(
  "login/user",
  async (body, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BACKEND_BASE_URL}/login`, body, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  },
);

export const signupUser = createAsyncThunk(
  "signup/user",
  async (body, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BACKEND_BASE_URL}/signup`, body);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  },
);

export const logoutUser = createAsyncThunk(
  "logout/user",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BACKEND_BASE_URL}/logout`,
        {},
        { withCredentials: true },
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  },
);
