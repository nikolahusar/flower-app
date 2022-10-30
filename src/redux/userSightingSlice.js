import { createSlice } from "@reduxjs/toolkit";

export const userSightingSlice = createSlice({
  name: "sighting",
  initialState: {
    pending: false,
    error: false,
    sighting: [],
  },
  reducers: {
    userSightingRequest: (state) => {
      state.pending = true;
      state.error = false;
    },
    userSightingSuccess: (state, actions) => {
      state.pending = false;
      state.sighting = actions.payload;
      state.error = false;
    },
    userSightingError: (state) => {
      state.error = true;
    },
  },
});

export const { userSightingRequest, userSightingSuccess, userSightingError } =
  userSightingSlice.actions;

export default userSightingSlice.reducer;
