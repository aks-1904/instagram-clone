import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "post",
  initialState: {
    messages: [],
  },
  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
  },
});

export const { setMessages } = chatSlice.actions;
export default chatSlice.reducer;
