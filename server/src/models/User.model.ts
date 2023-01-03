import { compare, genSalt, hash } from "bcrypt";
import { Schema, model, Document } from "mongoose";
import { IPost } from "./Post.model";

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  picturePath: string;
  friends?: IUser[];
  location?: string;
  occupation?: string;
  viewedProfile?: number;
  impressions?: number;
  posts?: IPost[];
  comparePassword(password: string): Promise<boolean>;
  _doc: any;
}

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    lastName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    picturePath: {
      type: String,
      default: "",
    },
    friends: [{ type: Schema.Types.ObjectId, ref: "User" }],
    location: String,
    occupation: String,
    viewedProfile: { type: Number, default: 0 },
    impressions: { type: Number, default: 0 },
    posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  },
  { timestamps: true }
);

UserSchema.pre("save", function (next) {
  const user = this;

  if (!user.isModified("password")) return next();

  genSalt(10, (err, salt) => {
    if (err) return next(err);

    hash(user.password, salt, (err, hash) => {
      if (err) return next(err);

      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return compare(candidatePassword, this.password);
};

const User = model<IUser>("User", UserSchema);
export default User;
