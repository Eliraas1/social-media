import { Router } from "express";
import {
  getUser,
  getUserFriends,
  addRemoveFriend,
} from "../controllers/user.controller";

const userRouter = Router();

/* READ */
userRouter.get("/:id", getUser);
userRouter.get("/:id/friends", getUserFriends);

/* UPDATE */
userRouter.patch("/:friendId", addRemoveFriend);

export default userRouter;
