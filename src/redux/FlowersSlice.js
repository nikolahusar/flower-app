import { createSlice } from "@reduxjs/toolkit";

export const flowersSlice = createSlice({
  name: "flowers",
  initialState: {
    pending: false,
    error: false,
    flowers: [],
  },
  reducers: {
    flowersRequest: (state) => {
      state.pending = true;
      state.error = false;
    },
    flowersSuccess: (state, actions) => {
      state.pending = false;
      state.flowers = actions.payload;
      state.error = false;
    },
    flowersError: (state) => {
      state.error = true;
    },
  },
});

export const { flowersSuccess, flowersRequest, flowersError } =
  flowersSlice.actions;

export default flowersSlice.reducer;
