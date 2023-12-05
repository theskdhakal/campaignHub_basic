import axios from "axios";
import { useSelector } from "react-redux";

const rootUrl = "http://localhost:8000";

const userEP = rootUrl + "/api/v1/user";
const contentEP = rootUrl + "/api/v1/content";

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
