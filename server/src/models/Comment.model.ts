import { Schema, model, Document } from "mongoose";
import { IPost } from "./Post.model";
import { IUser } from "./User.model";

export interface IComment extends Document {
  user: IUser;
  post: IPost;
  content: string;
}

const commentSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    post: { type: Schema.Types.ObjectId, ref: "Post" },
  },
  { timestamps: true }
);

const Comment = model<IComment>("Comment", commentSchema);

export default Comment;
