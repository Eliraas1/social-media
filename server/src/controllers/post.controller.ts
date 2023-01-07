import { Request, Response } from "express";
import Post from "../models/Post.model";

/* CREATE */
export const createPost = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    if (!user)
      return res.status(401).send({ success: false, message: "unauthorized" });
    const newPost = await Post.create({ ...req.body, owner: user._id });
    const posts = await Post.find();
    res.status(200).json({ success: true, data: posts });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* READ */
export const getFeedPosts = async (req: Request, res: Response) => {
  try {
    const post = await Post.find();
    res.status(200).json(post);
  } catch (err: any) {
    res.status(404).json({ success: false, message: err.message });
  }
};

export const getUserPosts = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ owner: userId });
    res.status(200).json({ success: true, data: post });
  } catch (err: any) {
    res.status(404).json({ success: false, message: err.message });
  }
};

/* UPDATE */
export const likePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = req.user;
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "unauthorized user" });

    //TODO: SPLIT CODE TO SERVICES
    const post = await Post.findById(id);

    const isLiked = post?.likes?.includes(user._id);

    const query = isLiked
      ? { $pull: { likes: user._id } }
      : { $push: { likes: user._id } };

    const updatedPost = await post?.updateOne(query);

    res.status(200).json({ success: true, data: updatedPost });
  } catch (err: any) {
    res.status(404).json({ success: false, message: err.message });
  }
};
