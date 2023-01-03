import User from "../models/User.model";

export const getUserById = async (userId: string) => {
  const user = await User.findById(userId);
  return user;
};
