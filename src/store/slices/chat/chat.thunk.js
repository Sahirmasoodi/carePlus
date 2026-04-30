import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BACKEND_BASE_URL } from "../../../env";

export const fetchChats = createAsyncThunk(
  "get/chat",
  async (toUserid, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BACKEND_BASE_URL}/chat/${toUserid}`, {
        withCredentials: true,
      });

      return response?.data;
    } catch (error) {
      console.log(error?.message);

      // return rejectWithValue(
      //     error || "Failed to fetch chat",
      //   );
    }
  },
);
