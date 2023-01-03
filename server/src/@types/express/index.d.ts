import express from "express";
import { IUser } from "../../models/User.model";
// import { IUser } from "../models/User.model";
declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}
