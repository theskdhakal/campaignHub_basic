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
  },
});

export const { addPost } = PostSlice.actions;
export default PostSlice.reducer;
