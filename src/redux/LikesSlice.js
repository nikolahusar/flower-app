import { createSlice } from "@reduxjs/toolkit";

const likesSlice = createSlice({
  name: "likes",
  initialState: {
    likes: [],
    pending: false,
    error: false,
  },
  reducers: {
    likesReq: (state) => {
      state.pending = true;
      state.error = false;
    },
    likesSuccess: (state, actions) => {
      state.pending = false;
      state.likes = actions.payload;
      state.error = false;
    },
    likesError: (state) => {
      state.error = true;
    },
  },
});

export const { likesError, likesSuccess, likesReq } = likesSlice.actions;

export default likesSlice.reducer;
