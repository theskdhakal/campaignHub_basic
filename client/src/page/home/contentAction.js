import { toast } from "react-toastify";
import { postContent } from "../../helper/axiosHelper";

export const addContentAction = (postData) => async (dispatch) => {
  try {
    const { status, message } = await postContent(postData);

    toast[status](message);
  } catch (error) {
    console.log("abcd");
    console.log(error);
  }
};
