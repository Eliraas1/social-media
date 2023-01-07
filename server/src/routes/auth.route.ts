import { Router } from "express";
import { login, register } from "../controllers/auth.controller";
import { upload } from "../middleware/multer.middleware";

const authRouter = Router();

authRouter.post("/login", login);
authRouter.post("/register", upload.single("picture"), register);

export default authRouter;
