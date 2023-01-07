import express from "express";
import {
  createPost,
  getFeedPosts,
  getUserPosts,
  likePost,
} from "../controllers/post.controller";
import { upload } from "../middleware/multer.middleware";

const postRouter = express.Router();

/* READ */
postRouter.get("/", getFeedPosts);
postRouter.get("/:userId/posts", getUserPosts);
postRouter.post("/upload-posts", upload.single("picture"), createPost);

/* UPDATE */
postRouter.patch("/:id/like", likePost);

export default postRouter;
