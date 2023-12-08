import axios from "axios";
import { useSelector } from "react-redux";

const rootUrl = "http://localhost:8000";

const userEP = rootUrl + "/api/v1/user";
const contentEP = rootUrl + "/api/v1/content";
const reactionEP = contentEP + "/reaction";

// user api

export const postNewUser = async (obj) => {
  try {
    const response = await axios.post(userEP, obj);

    console.log(response);
    return response.data;
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};

export const loginUser = async (obj) => {
  try {
    const response = await axios.post(userEP + "/login", obj);

    return response.data;
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};

// ================================= content Api ========================

export const postContent = async ({ userId, ...obj }) => {
  console.log(obj);
  try {
    const response = await axios.post(
      contentEP,
      { userId, ...obj },
      {
        headers: {
          authorization: userId,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};

export const getAllContent = async () => {
  try {
    const response = await axios.get(contentEP);

    return response.data;
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};

export const getUserSpecificContent = async (userId) => {
  try {
    const response = await axios.get(contentEP + "/" + userId, {
      headers: {
        authorization: userId,
      },
    });

    return response.data;
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};

export const postReaction = async ({ contentId, userId }) => {
  try {
    const response = await axios.patch(
      contentEP + "/" + contentId,
      {
        contentId,

        reaction: 1,
      },
      {
        headers: {
          authorization: userId,
        },
      }
    );

    console.log(response.data);
    return response.data;
  } catch (error) {
    return {
      status: "error",
      messgae: error.message,
    };
  }
};

export const postComment = async ({
  contentId,
  userId,
  userName,
  feedback,
}) => {
  try {
    const response = await axios.patch(
      contentEP + "/comment/" + contentId,
      {
        contentId,
        userName,
        feedback,
      },
      {
        headers: {
          authorization: userId,
        },
      }
    );

    return response.data;
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};

//delete content

export const deleteContent = async ({ contentId, userId }) => {
  console.log(userId);
  try {
    const response = await axios.delete(
      contentEP + "/" + contentId,

      {
        headers: {
          authorization: userId,
        },
      }
    );

    return response.data;
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};

//delete comment
export const deleteComment = async ({ commentId, userId }) => {
  try {
    const response = await axios.delete(contentEP + "/comment/" + commentId, {
      headers: {
        authorization: userId,
      },
    });

    return response.data;
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};
