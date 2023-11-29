import express from "express";
import { insertUser } from "../models/user/UserModel.js";

const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const result = await insertUser(req.body);

    result?._id
      ? res.json({
          status: "success",
          message:
            "Your account has been created successfully, please go to login page and login with your email:" +
            result.email,
          user: result,
        })
      : res.json({
          status: "error",
          message: "Unable to register, please try again",
        });
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error collection")) {
      error.status = 200;
      error.message = "There is another user already exist with this email";
    }
    next(error);
  }
});

export default router;
