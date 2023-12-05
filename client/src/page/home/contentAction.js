import { toast } from "react-toastify";
import {
  getAllContent,
  getUserSpecificContent,
  postContent,
} from "../../helper/axiosHelper";
import { setPost, setUserPosts } from "./PostSlice";

export const addContentAction = (postData) => async (dispatch) => {
  console.log(postData);
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

export const getUserContentAction = (userId) => async (dispatch) => {
  const { status, contents } = await getUserSpecificContent(userId);

  if (status === "success") {
    dispatch(setUserPosts(contents));
  }
};
