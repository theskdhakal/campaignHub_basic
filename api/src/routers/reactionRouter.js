import express from "express";
import { addReaction, getReactions } from "../models/reaction/ReactionModel.js";

const reactionRouter = express.Router();

reactionRouter.post("/", async (req, res, next) => {
  try {
    const { contentId, userId } = req.body;
    if (!contentId || !userId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Add reaction
    const reaction = await addReaction({ contentId, userId });
    res.status(201).json({ reaction });
  } catch (error) {
    next(error);
  }
});

reactionRouter.get("/:contentId", async (req, res, next) => {
  try {
    const contentId = req.params.contentId;

    console.log(contentId);

    const filter = { contentId };

    // Get reactions for a specific content
    const reactions = await getReactions(filter);

    res.status(200).json({ reactions });
  } catch (error) {
    console.error("Error getting reactions:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default reactionRouter;
