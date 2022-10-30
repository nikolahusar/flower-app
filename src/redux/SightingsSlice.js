import { createSlice } from "@reduxjs/toolkit";

export const sightingsSlice = createSlice({
  name: "sightings",
  initialState: {
    pending: false,
    error: false,
    sightings: [],
  },
  reducers: {
    sightingsRequest: (state) => {
      state.pending = true;
      state.error = false;
    },
    sightingsSuccess: (state, actions) => {
      state.pending = false;
      state.sightings = actions.payload;
      state.error = false;
    },
    sightingsError: (state) => {
      state.error = true;
    },
  },
});

export const { sightingsSuccess, sightingsRequest, sightingsError } =
  sightingsSlice.actions;

export default sightingsSlice.reducer;
