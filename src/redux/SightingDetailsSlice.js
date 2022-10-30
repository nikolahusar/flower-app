import { createSlice } from "@reduxjs/toolkit";

export const sightingDetailsSlice = createSlice({
  name: "sighting",
  initialState: {
    pending: false,
    error: false,
    sighting: [],
  },
  reducers: {
    sightingRequest: (state) => {
      state.pending = true;
      state.error = false;
    },
    sightingSuccess: (state, actions) => {
      state.pending = false;
      state.sighting = actions.payload;
      state.error = false;
    },
    sightingError: (state) => {
      state.error = true;
    },
  },
});

export const { sightingSuccess, sightingRequest, sightingError } =
  sightingDetailsSlice.actions;

export default sightingDetailsSlice.reducer;
