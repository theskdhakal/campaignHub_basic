import express from "express";
import { upload } from "../middleware/multerMiddleware.js";
import {
  addContent,
  deleteContent,
  getAllContent,
  getContent,
  updateContent,
} from "../models/content/ContentModel.js";

import uploadFile from "../utils/s3Bucket.js";
import reactionRouter from "./reactionRouter.js";
import ContentSchema from "../models/content/ContentSchema.js";

const router = express.Router();

// router.use("/reaction", reactionRouter);

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

    const contentWithTotalReactions = allContents.map((content) => ({
      ...content.toObject(),
      totalReactions: content.reactions.reduce(
        (sum, item) => sum + item.reaction,
        0
      ),
    }));

    res.json({
      status: "success",
      message: "All contents are shown below:", // Fixed typo in the message
      contentWithTotalReactions,
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

//   try {
//     const { authorization } = req.headers;
//     const { _id } = req.params;

//     // Assume req.body.reaction is sent from the frontend to indicate the reaction action
//     const { reaction } = req.body;

//     if (!authorization || !_id || reaction === undefined) {
//       return res.status(400).json({ error: "Missing required fields" });
//     }

//     // Check if the user has already reacted to the post
//     const content = await ContentSchema.findOne({ _id });

//     if (!content) {
//       return res.status(404).json({ error: "Content not found" });
//     }

//     // Check if the user has already reacted to the post
//     if (content.userId.toString() === authorization) {
//       // User is the owner of the content
//       // You can add additional logic here based on the user's action
//       if (reaction === content.reaction) {
//         // Reset reactions if the user clicked on the same reaction
//         content.reaction = 0;
//       } else {
//         // Decrement or set reactions based on the user's action
//         content.reaction = reaction;
//       }
//     } else {
//       // User is not the owner, increment reactions
//       content.reaction += 1;
//     }

//     // Save the updated content
//     const data = await content.save();

//     res.status(200).json({ status: "success", data });
//   } catch (error) {
//     console.error("Error updating content:", error);
//     res.status(500).json({ error: error.message });
//   }
// });

router.patch("/:_id", async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const { _id } = req.params;

    // Assume req.body.reaction is sent from the frontend to indicate the reaction action
    const { reaction } = req.body;

    if (!authorization || !_id || reaction === undefined) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Check if the user has already reacted to the post
    const content = await ContentSchema.findOne({ _id });

    if (!content) {
      return res.status(404).json({ error: "Content not found" });
    }

    // Check if the user has already reacted to the post
    if (content.userId.toString() === authorization) {
      // User is the owner of the content
      // You can add additional logic here based on the user's action
      const userReaction = content.reactions.find(
        (r) => r.userId.toString() === authorization
      );

      if (userReaction) {
        // User clicked on the same reaction, reset
        userReaction.reaction = userReaction.reaction === 1 ? 0 : 1;
      } else {
        // User is reacting for the first time, set to 1
        content.reactions.push({ userId: authorization, reaction: 1 });
      }
    } else {
      // User is not the owner, check if the user has already reacted
      const userReaction = content.reactions.find(
        (r) => r.userId.toString() === authorization
      );

      if (userReaction) {
        // User has already reacted, update the existing reaction
        userReaction.reaction = userReaction.reaction === 1 ? 0 : 1;
      } else {
        // User is reacting for the first time, push a new reaction
        content.reactions.push({ userId: authorization, reaction: 1 });
      }
    }

    // Update the total number of reactions
    content.totalReactions = content.reactions.reduce(
      (sum, item) => sum + item.reaction,
      0
    );

    // Save the updated content
    const data = await content.save();

    res.status(200).json({
      status: "success",
      data,
      totalReactions: content.totalReactions,
    });
  } catch (error) {
    console.error("Error updating content:", error);
    res.status(500).json({ error: error.message });
  }
});

router.patch("/comment/:_id", async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const { _id } = req.params;

    // Assume req.body.reaction is sent from the frontend to indicate the reaction action
    const { feedback, userName } = req.body;

    if (!authorization || !_id || !feedback) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    console.log(authorization);

    // Update the content with the new comment
    const updatedContent = await updateContent(
      { _id },
      {
        $push: {
          comments: {
            comments: feedback,
            userName: userName,
            userId: authorization,
          },
        },
      }
    );

    if (!updatedContent) {
      return res.status(404).json({ error: "Content not found" });
    }

    return res.status(200).json(updatedContent);
  } catch (error) {
    next(error);
  }
});

router.patch("/approve/:_id", async (req, res, next) => {
  try {
    const { _id } = req.params;
    const { isApproved } = req.body;

    console.log(req.params);

    const updatedContent = await updateContent(
      { _id },
      { $set: { isApproved: isApproved } }
    );

    if (!updatedContent) {
      return res.status(404).json({ error: "Content not found" });
    }

    return res.status(200).json({
      status: "success",
      message: "The post status has been updated",
      updatedContent,
    });
  } catch (error) {
    next(error);
  }
});
//deleting content
router.delete("/:_id", async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    const { _id } = req.params;
    console.log(_id);

    const userId = authorization;

    if (userId && _id) {
      const filter = {
        _id,
        userId,
      };

      const result = await deleteContent(filter);

      if (result?._id) {
        return res.json({
          status: "success",
          message: "The post has been deleted",
        });
      }
    }

    res.json({
      status: "error",
      message: "Invalid request",
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/comment/:_id", async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    const { _id } = req.params;
    console.log(_id);

    if (authorization && _id) {
      // Find the content with the matching comment
      const content = await ContentSchema.findOne({
        "comments._id": _id,
      });

      if (!content) {
        return res.status(404).json({ error: "Content not found" });
      }

      // Find the comment within the content
      const comment = content.comments.find((c) => c._id.toString() === _id);

      if (!comment) {
        return res.status(404).json({ error: "Comment not found" });
      }

      // Check if the user who made the comment is the one trying to delete it
      if (comment.userId.toString() === authorization) {
        // User has the right to delete the comment
        // Remove the comment from the content
        content.comments.pull({ _id: comment._id });

        // Save the updated content
        await content.save();

        return res.json({
          status: "success",
          message: "Comment deleted successfully",
        });
      } else {
        return res.status(200).json({
          status: "error",
          message:
            "Unauthorized: You do not have permission to delete this comment",
        });
      }
    }

    return res.status(400).json({ error: "Invalid request" });
  } catch (error) {
    next(error);
  }
});

export default router;
