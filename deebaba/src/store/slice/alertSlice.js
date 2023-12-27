import { createSlice } from "@reduxjs/toolkit";
import { setAlert } from "../thunks/setAlert";
import { removeAlert } from "../thunks/removeAlert";

const alertSlice = createSlice({
  name: "alert",
  initialState: {
    data: [],
  },

  extraReducers(builder) {
    builder.addCase(setAlert.fulfilled, (state, action) => {
      state.data.push(action.payload);
    });

    builder.addCase(removeAlert.fulfilled, (state, action) => {
      state.data = state.data.filter((alert) => alert.id !== action.payload);
    });
  },
});

export const alertReducer = alertSlice.reducer;
