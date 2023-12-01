import express from "express";
import {
  addContent,
  getAllContent,
  getContent,
} from "../models/content/ContentModel.js";

const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    console.log(req.body);
    const result = await addContent(req.body);

    result?._id
      ? res.json({
          status: "success",
          message: "successfullt added content",
        })
      : res.json({
          status: "error",
          message: "unable to add content",
        });
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const allContents = await getAllContent();

    res.json({
      status: "success",
      messgae: "All contents are shown below:",
      allContents,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:userId", async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    const filter = {
      userId: authorization,
    };

    const contents = await getContent(filter);

    res.json({
      status: "success",
      messgae: "User specific contents are shown below:",
      contents,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
