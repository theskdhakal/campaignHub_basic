import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  userPosts: [],
};

const PostSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    addPost: (state, action) => {
      state.posts.push(action.payload);
    },

    setPost: (state, action) => {
      state.posts = action.payload;
    },

    setUserPosts: (state, action) => {
      state.userPosts = action.payload;
    },
  },
});

export const { addPost, setPost, setUserPosts } = PostSlice.actions;
export default PostSlice.reducer;
