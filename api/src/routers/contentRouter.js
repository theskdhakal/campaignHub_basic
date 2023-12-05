import express from "express";
import { upload } from "../middleware/multerMiddleware.js";
import {
  addContent,
  getAllContent,
  getContent,
} from "../models/content/ContentModel.js";

import uploadFile from "../utils/s3Bucket.js";

const router = express.Router();

router.post("/", upload.single("image"), async (req, res, next) => {
  console.log(req.body);
  try {
    if (req.file) {
      const { Location } = await uploadFile(req.file);
      req.body.image = Location;
    }

    const result = await addContent(req.body);

    result?._id
      ? res.json({
          status: "success",
          message: "successfully added content",
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
      message: "All contents are shown below:", // Fixed typo in the message
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
      message: "User-specific contents are shown below:", // Fixed typo in the message
      contents,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
