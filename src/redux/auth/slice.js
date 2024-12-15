import { createSlice } from "@reduxjs/toolkit";
import { register, login, logout, refreshUser } from "./operations";

const initialState = {
  user: {
    name: null,
    email: null,
  },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
};

const slice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(register.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isRefreshing = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.isRefreshing = false;
        state.error = action.error.message;
      })
      // Login
      .addCase(login.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isRefreshing = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.isRefreshing = false;
        state.error = action.error.message;
      })
      // Logout
      .addCase(logout.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isRefreshing = false;
        state.user = { name: null, email: null };
        state.token = null;
        state.isLoggedIn = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.isRefreshing = false;
        state.error = action.error.message;
      })
      // Refresh User
      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.isRefreshing = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(refreshUser.rejected, (state, action) => {
        state.isRefreshing = false;
        state.user = { name: null, email: null };
        state.token = null;
        state.isLoggedIn = false;
        state.error = action.error.message;
      });
  },
});

export default slice.reducer;
