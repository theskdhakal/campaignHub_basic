import axios from "axios";

const rootUrl = "http://localhost:8000";

const userEP = rootUrl + "/api/v1/user";

// user api

export const postNewUser = async (obj) => {
  try {
    const response = await axios.post(userEP, obj);

    return response.data;
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};
