import { UserModel } from "./UserSchema.js";

export const insertUser = (obj) => {
  const newUser = new UserModel(obj);
  return newUser.save();
};
