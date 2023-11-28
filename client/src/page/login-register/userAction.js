import { toast } from "react-toastify";
import { postNewUser } from "../../helper/axiosHelper";
import { setUser } from "./UserSlice";

export const registerUserAction = (form) => async (dispatch) => {
  try {
    const { confirmPassword, ...rest } = form;

    if (rest.password === confirmPassword) {
      const { status, message } = await postNewUser(rest);

      toast[status](message);
    } else {
      return alert("password do not match");
    }
  } catch (error) {
    console.log(error.message);
  }
};
