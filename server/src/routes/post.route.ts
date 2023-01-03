import express from "express";
import {
  getFeedPosts,
  getUserPosts,
  likePost,
} from "../controllers/post.controller";

const postRouter = express.Router();

/* READ */
postRouter.get("/", getFeedPosts);
postRouter.get("/:userId/posts", getUserPosts);

/* UPDATE */
postRouter.patch("/:id/like", likePost);

export default postRouter;
