import { Schema, model, Document } from "mongoose";
import { IComment } from "./Comment.model";
import { IUser } from "./User.model";

export interface IPost extends Document {
  owner: IUser;
  location?: string;
  description?: string;
  picturePath?: string;
  likes?: IUser[];
  comments?: IComment[];
}

const postSchema = new Schema(
  {
    owner: { type: Schema.Types.ObjectId, ref: "User" },
    location: String,
    description: String,
    picturePath: String,
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  },
  { timestamps: true }
);

const Post = model("Post", postSchema);

export default Post;
