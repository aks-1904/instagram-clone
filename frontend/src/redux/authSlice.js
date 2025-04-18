import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    suggestedUsers: [],
    selectedUser: null,
    chatUser: null,
    onlineUsers: [],
  },
  reducers: {
    setAuthUser: (state, action) => {
      state.user = action.payload;
    },
    setSuggestedUsers: (state, action) => {
      state.suggestedUsers = action.payload;
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    setChatUser: (state, action) => {
      state.chatUser = action.payload;
    },
    setOnlineUsers: (state,action)=>{
      state.onlineUsers = action.payload;
    }
  },
});

export const { setAuthUser, setSuggestedUsers, setSelectedUser, setChatUser, setOnlineUsers } =
  authSlice.actions;
export default authSlice.reducer;
