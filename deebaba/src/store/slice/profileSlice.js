import { createSlice } from "@reduxjs/toolkit";
import {
  addEducation,
  addExperience,
  createProfile,
  deleteAccount,
  deleteEducation,
  deleteExperience,
  getCurrentProfile,
  getGithubRepos,
  getProfileById,
  getProfiles,
} from "../thunks/profile";

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    profile: null,
    profiles: [],
    repos: [],
    loading: true,
    error: {},
  },
  reducers: {
    profileError: (state, action) => {
      state.error = action.payload;
      state.profile = null;
    },
    clearProfile: (state) => {
      state.profile = null;
      state.repos = [];
      state.loading = false;
    },
  },

  extraReducers(builder) {
    builder.addCase(
      getCurrentProfile.pending || createProfile.pending,
      (state, action) => {
        state.loading = true;
      }
    );
    builder.addCase(getCurrentProfile.fulfilled, (state, action) => {
      state.profile = action.payload;
      state.loading = false;
    });
    builder.addCase(createProfile.fulfilled, (state, action) => {
      state.profile = action.payload;
      state.loading = false;
    });
    builder.addCase(addEducation.fulfilled, (state, action) => {
      state.profile = action.payload;
      state.loading = false;
    });
    builder.addCase(addExperience.fulfilled, (state, action) => {
      state.profile = action.payload;
      state.loading = false;
    });
    builder.addCase(deleteExperience.fulfilled, (state, action) => {
      state.profile = action.payload;
      state.loading = false;
    });
    builder.addCase(deleteEducation.fulfilled, (state, action) => {
      state.profile = action.payload;
      state.loading = false;
    });
    builder.addCase(deleteAccount.fulfilled, (state, action) => {
      localStorage.removeItem("token");
      state.token = null;
      state.loading = false;
    });
    builder.addCase(getProfiles.fulfilled, (state, action) => {
      state.profiles = action.payload;
      state.loading = false;
    });
    builder.addCase(getProfileById.fulfilled, (state, action) => {
      state.profile = action.payload;
      state.loading = false;
    });
    builder.addCase(getGithubRepos.fulfilled, (state, action) => {
      state.repos = action.payload;
      state.loading = false;
    });
  },
});

export const profileReducer = profileSlice.reducer;
export const { profileError, clearProfile } = profileSlice.actions;
