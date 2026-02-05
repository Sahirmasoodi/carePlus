import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BACKEND_BASE_URL } from "../../../env";

export const myAppointments = createAsyncThunk(
  "appointment",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BACKEND_BASE_URL}/appointments/my`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  },
);
