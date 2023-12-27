import { configureStore } from "@reduxjs/toolkit";
import { alertReducer } from "./slice/alertSlice";
import { authReducer } from "./slice/authSlice";
import { profileReducer } from "./slice/profileSlice";
import { postReducer } from "./slice/postSlice";

export const store = configureStore({
  reducer: {
    alert: alertReducer,
    auth: authReducer,
    profile: profileReducer,
    post: postReducer,
  },
});

export * from "./thunks/setAlert";
export * from "./thunks/removeAlert";
export * from "./thunks/auth";
export * from "./thunks/profile";
export * from "./thunks/post";
