import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit/dist/createAction";

export interface IApp {
  darkMode: boolean;
}

const initialState: IApp = {
  darkMode: false,
};

export const AppSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    changeDarkMode: (state: IApp) => {
      state.darkMode = !state.darkMode;
      return state;
    },
    resetAppState: () => {
      return initialState;
    },
  },
});

export default AppSlice.reducer;
export const { changeDarkMode, resetAppState } = AppSlice.actions;
