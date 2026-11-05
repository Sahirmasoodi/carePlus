import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BACKEND_BASE_URL } from "../../../env";

const getAuthConfig = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
  withCredentials: true,
});

export const createAppointmentThunk = createAsyncThunk(
  "appointments/create",
  async ({ data, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BACKEND_BASE_URL}/appointment/create`,
        data,
        getAuthConfig(token),
      );

      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to create appointment",
      );
    }
  },
);

export const updateAppointmentThunk = createAsyncThunk(
  "appointments/update",
  async ({ id, data, token }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${BACKEND_BASE_URL}/appointment/update/${id}`,
        data,
        getAuthConfig(token),
      );

      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to update appointment",
      );
    }
  },
);

export const deleteAppointmentThunk = createAsyncThunk(
  "appointments/delete",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      await axios.delete(
        `${BACKEND_BASE_URL}/appointment/delete/${id}`,
        getAuthConfig(token),
      );

      return id;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to delete appointment",
      );
    }
  },
);

export const fetchMyAppointmentsThunk = createAsyncThunk(
  "appointments/my",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BACKEND_BASE_URL}/appointments/my`,
        getAuthConfig(token),
      );

      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to fetch appointments",
      );
    }
  },
);

export const fetchAllAppointmentsThunk = createAsyncThunk(
  "appointments/all",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BACKEND_BASE_URL}/appointments/all`,
        getAuthConfig(token),
      );

      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to fetch all appointments",
      );
    }
  },
);
