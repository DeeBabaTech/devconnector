import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { clearProfile, profileError } from "../slice/profileSlice";
import { setAlert } from "./setAlert";
import { authError } from "../slice/authSlice";

export const getCurrentProfile = createAsyncThunk(
  "profile/getCurrentProfile",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get("/api/profile/me");
      // thunkAPI.dispatch(loadUser());
      return res.data;
    } catch (err) {
      // thunkAPI.dispatch(clearProfile());
      thunkAPI.dispatch(
        profileError({
          msg: err.response.statusText,
          status: err.response.status,
        })
      );
    }
  }
);

// Get all profiles
export const getProfiles = createAsyncThunk(
  "profile/getProfiles",
  async (_, thunkAPI) => {
    thunkAPI.dispatch(clearProfile());
    try {
      const res = await axios.get("/api/profile");
      return res.data;
    } catch (err) {
      // thunkAPI.dispatch(clearProfile());
      thunkAPI.dispatch(
        profileError({
          msg: err.response.statusText,
          status: err.response.status,
        })
      );
    }
  }
);

// Get profile by ID
export const getProfileById = createAsyncThunk(
  "profile/getProfileById",
  async (userID, thunkAPI) => {
    try {
      const res = await axios.get(`/api/profile/user/${userID}`);
      return res.data;
    } catch (err) {
      // thunkAPI.dispatch(clearProfile());
      thunkAPI.dispatch(
        profileError({
          msg: err.response.statusText,
          status: err.response.status,
        })
      );
    }
  }
);

// Get Github repos
export const getGithubRepos = createAsyncThunk(
  "profile/getGithubRepos",
  async (username, thunkAPI) => {
    try {
      const res = await axios.get(`/api/profile/github/${username}`);
      return res.data;
    } catch (err) {
      thunkAPI.dispatch(
        profileError({
          msg: err.response.statusText,
          status: err.response.status,
        })
      );
    }
  }
);

// Create or update profile
export const createProfile = createAsyncThunk(
  "profile/createProfile",
  async (res, thunkAPI) => {
    const { formData, navigate, edit = false } = res;
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await axios.post("/api/profile", formData, config);

      thunkAPI.dispatch(
        setAlert(
          edit
            ? { msg: "Profile Updated", alertType: "success" }
            : { msg: "Profile Created", alertType: "success" }
        )
      );

      if (!edit) {
        navigate("/dashboard");
      }

      return response.data;
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) =>
          thunkAPI.dispatch(setAlert({ msg: error.msg, alertType: "danger" }))
        );
      }

      thunkAPI.dispatch(
        profileError({
          msg: err.response.statusText,
          status: err.response.status,
        })
      );
    }
  }
);

// Add experience
export const addExperience = createAsyncThunk(
  "profile/addExperience",
  async (res, thunkAPI) => {
    const { formData, navigate } = res;
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await axios.put(
        "/api/profile/experience",
        formData,
        config
      );

      thunkAPI.dispatch(
        setAlert({ msg: "Experience Added", alertType: "success" })
      );

      navigate("/dashboard");

      return response.data;
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) =>
          thunkAPI.dispatch(setAlert({ msg: error.msg, alertType: "danger" }))
        );
      }

      thunkAPI.dispatch(
        profileError({
          msg: err.response.statusText,
          status: err.response.status,
        })
      );
    }
  }
);

// Add education
export const addEducation = createAsyncThunk(
  "profile/addEducation",
  async (res, thunkAPI) => {
    const { formData, navigate } = res;
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await axios.put(
        "/api/profile/education",
        formData,
        config
      );

      thunkAPI.dispatch(
        setAlert({ msg: "Education Added", alertType: "success" })
      );

      navigate("/dashboard");

      return response.data;
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) =>
          thunkAPI.dispatch(setAlert({ msg: error.msg, alertType: "danger" }))
        );
      }

      thunkAPI.dispatch(
        profileError({
          msg: err.response.statusText,
          status: err.response.status,
        })
      );
    }
  }
);

// Delete experience
export const deleteExperience = createAsyncThunk(
  "profile/deleteExperience",
  async (id, thunkAPI) => {
    try {
      const res = await axios.delete(`/api/profile/experience/${id}`);
      thunkAPI.dispatch(
        setAlert({ msg: "Experience Removed", alertType: "success" })
      );
      return res.data;
    } catch (err) {
      thunkAPI.dispatch(
        profileError({
          msg: err.response.statusText,
          status: err.response.status,
        })
      );
    }
  }
);

// Delete education
export const deleteEducation = createAsyncThunk(
  "profile/deleteEducation",
  async (id, thunkAPI) => {
    try {
      const res = await axios.delete(`/api/profile/education/${id}`);
      thunkAPI.dispatch(
        setAlert({ msg: "Education Removed", alertType: "success" })
      );
      return res.data;
    } catch (err) {
      thunkAPI.dispatch(
        profileError({
          msg: err.response.statusText,
          status: err.response.status,
        })
      );
    }
  }
);

// Delete account and profile
export const deleteAccount = createAsyncThunk(
  "profile/deleteAccount",
  async (_, thunkAPI) => {
    if (window.confirm("Are you sure? This can NOT be undone"))
      try {
        const res = await axios.delete("/api/profile");
        thunkAPI.dispatch(clearProfile());
        thunkAPI.dispatch(authError());
        thunkAPI.dispatch(
          setAlert({
            msg: "Your account has been permanently deleted",
            alertType: "success",
          })
        );
        return res.data;
      } catch (err) {
        thunkAPI.dispatch(
          profileError({
            msg: err.response.statusText,
            status: err.response.status,
          })
        );
      }
  }
);
