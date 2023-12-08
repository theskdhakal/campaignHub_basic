import express from "express";
import {
  getOneUser,
  insertUser,
  updateUser,
} from "../models/user/UserModel.js";

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

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await getOneUser({ email });

    if (user?.password === password) {
      user.password = undefined;

      return res.json({
        status: "success",
        message: "Logged in Successfully",
        user,
      });
    }
    res.json({
      status: "error",
      message: "Invalid login credentials",
    });
  } catch (error) {
    next(error);
  }
});

router.patch("/:_id", async (req, res, next) => {
  try {
    const { fName, lName } = req.body;

    const { _id } = req.params;

    if (!_id) {
      return res.status(400).json({ error: "NO user found" });
    }

    //update user detail with new details]

    const user = await updateUser(
      { _id },
      { $set: { fName: fName, lName: lName } }
    );

    if (!user) {
      return res.status(404).json({ error: "user not updated" });
    }

    return res.status(200).json({
      status: "success",
      message: "User Profile Updated",
      user,
    });
  } catch (error) {
    next();
  }
});

export default router;
