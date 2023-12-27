import { createAsyncThunk } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";
import { removeAlert } from "./removeAlert";

export const setAlert = createAsyncThunk("alert/set", async (res, thunkAPI) => {
  const id = uuid();
  thunkAPI.dispatch(removeAlert(id));
  return { res, id };
});
