import { createSlice } from "@reduxjs/toolkit";

export const favoriteSlice = createSlice({
  name: "favorite",
  initialState: {
    pending: false,
    error: false,
    favoriteList: [],
    favoriteId: [],
  },
  reducers: {
    favoriteListRequest: (state) => {
      state.pending = true;
      state.error = false;
    },
    favoriteListSuccess: (state, actions) => {
      state.pending = false;
      state.favoriteList = actions.payload;
      state.error = false;
    },
    favoriteListError: (state) => {
      state.error = true;
    },
    favoriteId: (state, actions) => {
      state.favoriteId = actions.payload;
    },
    favListRemove: (state) => {
      state.favoriteList = null;
      state.favoriteId = null;
    },
  },
});

export const {
  favoriteListError,
  favoriteListRequest,
  favoriteListSuccess,
  favoriteId,
  favListRemove,
} = favoriteSlice.actions;

export default favoriteSlice.reducer;
