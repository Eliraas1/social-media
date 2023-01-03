import { Request, Response } from "express";
import User from "../models/User.model";

/* READ */
export const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json({ success: true, data: user });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getUserFriends = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).populate("friends");

    const friends = user?.friends;
    res.status(200).json({ success: false, data: friends });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const addRemoveFriend = async (req: Request, res: Response) => {
  try {
    const { friendId } = req.params;
    const user = req.user;
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "unauthorized user" });

    const isContainsFriend = user?.friends?.includes(friendId as any);
    const query = isContainsFriend
      ? { $pull: { friends: friendId } }
      : { $push: { friends: friendId } };

    const updatedUser = await user.updateOne(query);
    return res.status(200).json({ success: true, data: updatedUser });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};
