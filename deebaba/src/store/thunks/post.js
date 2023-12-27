import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { postError } from "../slice/postSlice";
import { setAlert } from "./setAlert";

// Get posts
export const getPosts = createAsyncThunk(
  "post/getPosts",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get("/api/posts");
      return res.data;
    } catch (err) {
      thunkAPI.dispatch(
        postError({
          msg: err.response.statusText,
          status: err.response.status,
        })
      );
    }
  }
);

// Add like
export const addLike = createAsyncThunk(
  "post/addLike",
  async (id, thunkAPI) => {
    try {
      const res = await axios.put(`/api/posts/like/${id}`);
      return { id, likes: res.data };
    } catch (err) {
      thunkAPI.dispatch(
        postError({
          msg: err.response.statusText,
          status: err.response.status,
        })
      );
    }
  }
);

// Remove like
export const removeLike = createAsyncThunk(
  "post/removeLike",
  async (id, thunkAPI) => {
    try {
      const res = await axios.put(`/api/posts/unlike/${id}`);
      return { id, likes: res.data };
    } catch (err) {
      thunkAPI.dispatch(
        postError({
          msg: err.response.statusText,
          status: err.response.status,
        })
      );
    }
  }
);

//Delete post
export const deletePost = createAsyncThunk(
  "post/deletePost",
  async (id, thunkAPI) => {
    try {
      await axios.delete(`api/posts/${id}`);
      thunkAPI.dispatch(
        setAlert({ msg: "Post Removed", alertType: "success" })
      );
      return id;
    } catch (err) {
      thunkAPI.dispatch(
        postError({
          msg: err.response.statusText,
          status: err.response.status,
        })
      );
    }
  }
);

//Add post
export const addPost = createAsyncThunk(
  "post/addPost",
  async (formData, thunkAPI) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post("api/posts", formData, config);
      thunkAPI.dispatch(
        setAlert({ msg: "Post Created", alertType: "success" })
      );
      return res.data;
    } catch (err) {
      thunkAPI.dispatch(
        postError({
          msg: err.response.statusText,
          status: err.response.status,
        })
      );
    }
  }
);

// Get post
export const getPost = createAsyncThunk(
  "post/getPost",
  async (id, thunkAPI) => {
    try {
      const res = await axios.get(`/api/posts/${id}`);
      return res.data;
    } catch (err) {
      thunkAPI.dispatch(
        postError({
          msg: err.response.statusText,
          status: err.response.status,
        })
      );
    }
  }
);

//Add comment
export const addComment = createAsyncThunk(
  "post/addComment",
  async (res, thunkAPI) => {
    const { id, text } = res;
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post(
        `/api/posts/comment/${id}`,
        { text },
        config
      );
      thunkAPI.dispatch(
        setAlert({ msg: "Post Created", alertType: "success" })
      );
      console.log(res.data);
      return res.data;
    } catch (err) {
      thunkAPI.dispatch(
        postError({
          msg: err.response.statusText,
          status: err.response.status,
        })
      );
    }
  }
);

//Delete comment
export const deleteComment = createAsyncThunk(
  "post/deleteComment",
  async (res, thunkAPI) => {
    const { postId, _id } = res;
    try {
      await axios.delete(`/api/posts/comment/${postId}/${_id}`);
      thunkAPI.dispatch(
        setAlert({ msg: "Comment Removed", alertType: "danger" })
      );
      return _id;
    } catch (err) {
      thunkAPI.dispatch(
        postError({
          msg: err.response.statusText,
          status: err.response.status,
        })
      );
    }
  }
);
