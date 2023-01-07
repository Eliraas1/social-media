import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit/dist/createAction";
import { IPost } from "./postSlice";

export interface IApp {
  darkMode: boolean;
  posts: IPost[];
}

const initialState: IApp = {
  darkMode: false,
  posts: [],
};

export const AppSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    changeDarkMode: (state: IApp) => {
      state.darkMode = !state.darkMode;
      return state;
    },
    setAllPosts: (state: IApp, action: PayloadAction<IPost[]>) => {
      state.posts = action.payload;
      return state;
    },
    setPost: (state: IApp, action: PayloadAction<IPost>) => {
      const updatedPost = state.posts.map((post) => {
        return post._id === action.payload._id ? action.payload : post;
      });
      state.posts = updatedPost;
      return state;
    },
    resetAppState: () => {
      return initialState;
    },
  },
});

export default AppSlice.reducer;
export const { changeDarkMode, resetAppState, setPost, setAllPosts } =
  AppSlice.actions;
