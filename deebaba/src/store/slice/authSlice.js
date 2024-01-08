import { createSlice } from "@reduxjs/toolkit";
import { loadUser, login, logout, register } from "../thunks/auth";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: false,
    user: null,
  },
  reducers: {
    authError: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
    },
    authSuccess: (state) => {
      state.token = localStorage.getItem("token");
      state.isAuthenticated = true;
    },
  },

  extraReducers(builder) {
    builder.addCase(login.pending, (state, action) => {
      state.loading = true;
    });
    
    builder.addCase(register.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(loadUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
    });

    builder.addCase(register.fulfilled, (state, action) => {
      localStorage.setItem("token", action.payload);
      state.loading = false;
    });

    builder.addCase(login.fulfilled, (state, action) => {
      localStorage.setItem("token", action.payload);
      state.loading = false;
    });

    builder.addCase(logout.fulfilled, (state, action) => {
      localStorage.removeItem("token");
      state.loading = false;
    });
  },
});

export const authReducer = authSlice.reducer;
export const { authError, authSuccess } = authSlice.actions;
