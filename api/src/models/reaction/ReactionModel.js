import ReactionSchema from "./ReactionSchema.js";

export const addReaction = async ({ contentId, userId }) => {
  try {
    // Check if a reaction from the same user for the content already exists
    const existingReaction = await ReactionSchema.findOne({
      contentId,
      userId,
    });

    if (existingReaction) {
      // If exists, decrement the reactions count only if it's greater than 0
      if (existingReaction.reactions > 0) {
        existingReaction.reactions -= 1;
        await existingReaction.save();
      }
    } else {
      // If doesn't exist, create a new reaction instance with an increment of 1
      await ReactionSchema({ contentId, userId, reactions: 1 }).save();
    }

    // Fetch and return the total reactions for the content after the update
    const totalReactions = await ReactionSchema.aggregate([
      { $match: { contentId } },
      { $group: { _id: null, totalReactions: { $sum: "$reactions" } } },
    ]);

    return { reactions: totalReactions[0]?.totalReactions || 0 };
  } catch (error) {
    throw error;
  }
};

// Your getReactions function can remain the same.
export const getReactions = async (filter) => {
  return ReactionSchema.find(filter);
};
