import { toast } from "react-toastify";
import {
  approvePost,
  deleteContent,
  getAllContent,
  getUserSpecificContent,
  postContent,
} from "../../helper/axiosHelper";
import { setPost, setUserPosts } from "./PostSlice";
import { MdMessage } from "react-icons/md";

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
  const { status, message, contentWithTotalReactions } = await getAllContent();

  if (status === "success") {
    dispatch(setPost(contentWithTotalReactions));
  }
};

export const getUserContentAction = (userId) => async (dispatch) => {
  const { status, contents } = await getUserSpecificContent(userId);

  if (status === "success") {
    dispatch(setUserPosts(contents));
  }
};

export const deleteContentAction = (data) => async (dispatch) => {
  console.log(data);
  if (!window.confirm("Are you sure you want to delete it ?")) {
    return;
  }
  const { status, message } = await deleteContent(data);

  toast[status](message);

  if (status === "success") {
    dispatch(fetchContentAction());
  }
};

export const approvePostAction = (data) => async (dispatch) => {
  console.log(data);
  const { status, message } = await approvePost(data);

  toast[status](message);

  if (status === "success") {
    dispatch(fetchContentAction());
  }
};
