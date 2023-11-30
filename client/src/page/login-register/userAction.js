import { toast } from "react-toastify";
import { loginUser } from "../../helper/axiosHelper";
import { setUser } from "./UserSlice";

export const loginUserAction = (form) => async (dispatch) => {
  const { status, message, user } = await loginUser(form);

  toast[status](message);

  if (status === "success") {
    dispatch(setUser(user));
  }
};
