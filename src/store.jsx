import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./page/login-register/UserSlice";

export default configureStore({
  reducer: {
    user: userReducer,
  },
});
