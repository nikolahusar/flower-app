import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    pending: false,
    error: null,
    userLoggedIn: false,
    userInfo: null,
    token: "",
  },
  reducers: {
    loginStart: (state) => {
      state.pending = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.pending = false;
      state.user = action.payload;
    },
    userSuccess: (state, action) => {
      state.pending = false;
      state.userInfo = action.payload;
    },
    getToken: (state, action) => {
      state.token = action.payload;
    },
    loginError: (state, actions) => {
      state.error = actions.payload;
      state.pending = false;
    },
    userLoggedIn: (state) => {
      state.userLoggedIn = true;
    },
    logOut: (state) => {
      state.userLoggedIn = false;
      state.token = null;
    },
    err: (state) => {
      state.error = null;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginError,
  userLoggedIn,
  logOut,
  userSuccess,
  getToken,
  err,
} = userSlice.actions;
export default userSlice.reducer;
