import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit/dist/createAction";

export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  picturePath?: string;
  friends?: IUser[];
  location?: string;
  occupation?: string;
  viewedProfile?: number;
  impressions?: number;
  token?: string;
  // posts?: IPost[];
}

const initialState: IUser = {
  _id: "",
  firstName: "",
  lastName: "",
  email: "",
};

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state: IUser, action: PayloadAction<IUser>) => {
      // state = action.payload;
      return action.payload;
    },
    resetUser: () => {
      return initialState;
    },
    setUserToken: (state: IUser, action: PayloadAction<string>) => {
      state.token = action.payload;
      return state;
    },
  },
});

export default UserSlice.reducer;
export const { setUser, resetUser, setUserToken } = UserSlice.actions;
