import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BACKEND_BASE_URL } from "../../../env";

export const fetchDoctorsForHomeThunk = createAsyncThunk(
  "doctors/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BACKEND_BASE_URL}/public/doctors/home`,
      );

      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to fetch doctors",
      );
    }
  },
);
