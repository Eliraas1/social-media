import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit/dist/createAction";
import { IUser } from "./userSlice";

export interface IPost {
  _id?: string;
  owner?: IUser;
  location?: string;
  description?: string;
  picturePath?: string;
  likes?: IUser[];
  comments?: string[];
}

const initialState: IPost = {
  _id: undefined,
  owner: undefined,
  location: "",
  description: "",
  picturePath: "",
  likes: undefined,
  comments: undefined,
};

export const PostSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setPost: (state: IPost, action: PayloadAction<IPost>) => {
      state = action.payload;
      return state;
    },
    resetPost: () => {
      return initialState;
    },
  },
});

export default PostSlice.reducer;
export const { setPost, resetPost } = PostSlice.actions;
