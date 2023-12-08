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

//find contnet  by filter and  update
export const updateContent = (filter, update) => {
  return ContentSchema.findOneAndUpdate(filter, update, { new: true });
};

//delete content
export const deleteContent = (filter) => {
  return ContentSchema.findOneAndDelete(filter);
};
