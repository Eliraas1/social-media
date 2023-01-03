import { Request, Response, Router } from "express";
import { authenticateAccessToken } from "../middleware/jwt.middleware";
import authRouter from "./auth.route";
import postRouter from "./post.route";
import userRouter from "./user.route";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.status(200).send("welcome to Eliran And Shay social media API");
});
router.use("/auth", authRouter);
router.use("/user", authenticateAccessToken, userRouter);
router.use("/post", authenticateAccessToken, postRouter);

export default router;
