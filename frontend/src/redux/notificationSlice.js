import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    likeNotification: [],
  },
  reducers: {
    setLikeNotification: (state, action) => {
      if (action.payload.type === "like")
        state.likeNotification.push(action.payload);
      else
        state.likeNotification = state.likeNotification.filter(
          (item) => item.userId !== action.payload.userId
        );
    },
  },
});

export const { setLikeNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
