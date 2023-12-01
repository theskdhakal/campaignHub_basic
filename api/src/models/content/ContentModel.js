import ContentSchema from "./ContentSchema.js";

export const addContent = (obj) => {
  return ContentSchema(obj).save();
};

//filter is an object // get user specific content based ob used id===filter

export const getContent = (filter) => {
  return ContentSchema.find(filter);
};

//get all contents
export const getAllContent = () => {
  return ContentSchema.find({});
};
