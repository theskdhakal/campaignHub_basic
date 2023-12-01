import { toast } from "react-toastify";
import { getAllContent, postContent } from "../../helper/axiosHelper";
import { setPost } from "./PostSlice";

export const addContentAction = (postData) => async (dispatch) => {
  try {
    const { status, message } = await postContent(postData);

    toast[status](message);

    if (status === "success") {
      dispatch(fetchContentAction());
    }
  } catch (error) {
    console.log("abcd");
    console.log(error);
  }
};

export const fetchContentAction = () => async (dispatch) => {
  const { status, message, allContents } = await getAllContent();

  if (status === "success") {
    dispatch(setPost(allContents));
  }
};
