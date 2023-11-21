import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./page/login-register/UserSlice";
import postReducer from "./page/home/PostSlice";
export default configureStore({
  reducer: {
    user: userReducer,
    post: postReducer,
  },
});
