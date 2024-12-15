import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createNewUser,
  refreshUser as refreshUserByToken,
  loginUser,
  logoutUser,
  setAuthHeader,
  removeAuthHeader,
} from "../../api/api";

export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      const newUser = await createNewUser(user);
      setAuthHeader(newUser.token);
      return newUser;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    const loggedUser = await loginUser(user);
    setAuthHeader(loggedUser.token);
    return loggedUser;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await logoutUser();
    removeAuthHeader();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    const persistedToken = thunkAPI.getState().auth.token;

    if (persistedToken === null) {
      return thunkAPI.rejectWithValue("Unable to fetch user");
    }
    try {
      setAuthHeader(thunkAPI.getState().auth.token);
      const user = await refreshUserByToken();
      return user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
