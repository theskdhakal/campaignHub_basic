import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
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
  },
});

export const { addPost, setPost } = PostSlice.actions;
export default PostSlice.reducer;
