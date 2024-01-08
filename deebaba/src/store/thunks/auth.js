import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setAlert } from "./setAlert";
import setAuthToken from "../../utils/setAuthToken";
import { authError, authSuccess } from "../slice/authSlice";
import { clearProfile } from "../slice/profileSlice";

// Load User
export const loadUser = createAsyncThunk(
  "auth/loadUser",
  async (_, thunkAPI) => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {
      const res = await axios.get(
        "https://developers-forum.onrender.com/api/auth"
      );
      thunkAPI.dispatch(authSuccess());
      return res.data;
    } catch (err) {
      thunkAPI.dispatch(authError());
    }
  }
);

// Register User
export const register = createAsyncThunk(
  "auth/register",
  async (res, thunkAPI) => {
    const { name, email, password } = res;

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ name, email, password });

    try {
      const response = await axios.post(
        "https://developers-forum.onrender.com/api/users",
        body,
        config
      );
      thunkAPI.dispatch(
        setAlert({ msg: "Registered successfully", alertType: "success" })
      );
      setTimeout(() => {
        thunkAPI.dispatch(loadUser());
        thunkAPI.dispatch(authSuccess());
      }, 2000);
      return response.data.token;
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) =>
          thunkAPI.dispatch(setAlert({ msg: error.msg, alertType: "danger" }))
        );
        thunkAPI.dispatch(authError());
      }
    }
  }
);

// Login User
export const login = createAsyncThunk("auth/login", async (res, thunkAPI) => {
  const { email, password } = res;

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const response = await axios.post(
      "https://developers-forum.onrender.com/api/auth",
      body,
      config
    );
    thunkAPI.dispatch(setAlert({ msg: "Logged in...", alertType: "success" }));
    setTimeout(() => {
      thunkAPI.dispatch(loadUser());
      thunkAPI.dispatch(authSuccess());
    }, 2000);
    return response.data.token;
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) =>
        thunkAPI.dispatch(setAlert({ msg: error.msg, alertType: "danger" }))
      );
      thunkAPI.dispatch(authError());
    }
  }
});

export const logout = createAsyncThunk("auth/logout", (_, thunkAPI) => {
  thunkAPI.dispatch(authError());
  return thunkAPI.dispatch(clearProfile());
});
