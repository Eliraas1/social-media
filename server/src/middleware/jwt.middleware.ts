import { NextFunction, Request, Response } from "express";
import {
  JwtPayload,
  sign,
  TokenExpiredError,
  verify,
  VerifyErrors,
} from "jsonwebtoken";
import { getUserById } from "../services/auth.service";

export const authenticateAccessToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = req.cookies["accessToken"] || "";
  if (!accessToken) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized user",
    });
  }

  verify(
    accessToken,
    process.env.ACCESS_TOKEN_SECRET as string,
    async (err: any, decoded: any) => {
      const message =
        err instanceof TokenExpiredError
          ? "Token expired"
          : "Unauthorized user";
      if (err) {
        return res.status(403).json({
          success: false,
          message,
        });
      }

      const user = await getUserById(decoded.id as string);

      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized user",
        });
      }

      req.user = user;
      next();
    }
  );
};
