import { createAsyncThunk } from "@reduxjs/toolkit";

export const removeAlert = createAsyncThunk("alert/remove", (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(id);
    }, 5000);
  });
});
