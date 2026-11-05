

import { createSlice } from "@reduxjs/toolkit";
import { fetchChats } from "./chat.thunk";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chat: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChats.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchChats.fulfilled, (state, action) => {
        state.loading = false;
        state.chat = action.payload;
      })
      .addCase(fetchChats.rejected, (state) => {
        state.error = { error: "error while fetching chats " };
      });
  },
});

export default chatSlice.reducer;
