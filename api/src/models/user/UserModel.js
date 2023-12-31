import UserSchema from "./UserSchema.js";

export const insertUser = (obj) => {
  return UserSchema(obj).save();
};

//to get object from db
export const getOneUser = (filter) => {
  return UserSchema.findOne(filter);
};

// update the user
export const updateUser = (filter, update) => {
  return UserSchema.findOneAndUpdate(filter, update, { new: true });
};
