import { createSlice } from "@reduxjs/toolkit";
import {
  addComment,
  addLike,
  addPost,
  deleteComment,
  deletePost,
  getPost,
  getPosts,
  removeLike,
} from "../thunks/post";

const postSlice = createSlice({
  name: "post",
  initialState: {
    posts: [],
    post: null,
    loading: true,
    error: {},
  },
  reducers: {
    postError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
  extraReducers(builder) {
    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.loading = false;
    });
    builder.addCase(getPost.fulfilled, (state, action) => {
      state.post = action.payload;
      state.loading = false;
    });
    builder.addCase(addPost.fulfilled, (state, action) => {
      state.posts = [action.payload, ...state.posts];
      state.loading = false;
    });
    builder.addCase(addComment.fulfilled, (state, action) => {
      state.post = { ...state.post, comments: action.payload };
      state.loading = false;
    });
    builder.addCase(addLike.fulfilled, (state, action) => {
      state.posts = state.posts.map((post) =>
        post._id === (action.payload ? action.payload.id : "")
          ? { ...post, likes: action.payload.likes }
          : post
      );
      state.loading = false;
    });
    builder.addCase(removeLike.fulfilled, (state, action) => {
      state.posts = state.posts.map((post) =>
        post._id === (action.payload ? action.payload.id : "")
          ? { ...post, likes: action.payload.likes }
          : post
      );
      state.loading = false;
    });
    builder.addCase(deletePost.fulfilled, (state, action) => {
      state.posts = state.posts.filter((post) => post._id !== action.payload);
      state.loading = false;
    });
    builder.addCase(deleteComment.fulfilled, (state, action) => {
      state.post = {
        ...state.post,
        comments: state.post.comments.filter(
          (comment) => comment._id !== action.payload
        ),
      };
      state.loading = false;
    });
  },
});

export const postReducer = postSlice.reducer;
export const { postError } = postSlice.actions;
