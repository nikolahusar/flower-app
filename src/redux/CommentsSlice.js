import { createSlice } from "@reduxjs/toolkit";

const commentsSlice = createSlice({
  name: "commments",
  initialState: {
    pending: false,
    error: false,
    comments: [],
  },
  reducers: {
    commentsRequest: (state) => {
      state.pending = true;
      state.error = false;
    },
    commentsSuccess: (state, actions) => {
      state.pending = false;
      state.error = false;
      state.comments = actions.payload;
    },
    commentsFailed: (state) => {
      state.pending = false;
      state.error = true;
    },
  },
});

export const { commentsRequest, commentsSuccess, commentsFailed } =
  commentsSlice.actions;

export default commentsSlice.reducer;
