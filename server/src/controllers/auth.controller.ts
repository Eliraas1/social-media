import { Request, Response } from "express";
import { sign } from "jsonwebtoken";
import User from "../models/User.model";

export const register = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    if (!req.body)
      return res.status(400).json({
        success: false,
        message: "body is required",
      });

    const { email } = req.body;
    const isUserExist = await User.findOne({ email });
    if (isUserExist)
      return res
        .status(400)
        .json({ success: false, message: "user already exists" });
    const newUser = await User.create({ ...req.body });
    const { password, ...rest } = newUser._doc;
    return res.status(200).json({ success: true, user: rest });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ msg: "User does not exist. " });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });

    const token = sign(
      { id: user._id },
      process.env.ACCESS_TOKEN_SECRET as string
    );
    const { password: pass, ...rest } = user._doc;
    res
      .cookie("accessToken", token)
      .status(200)
      .json({ success: true, token, user: rest });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
};
