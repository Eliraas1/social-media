import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/exports";
import { TypedUseSelectorHook } from "react-redux/es/types";
import { AppSlice } from "./features/appSlice";
import userSlice, { UserSlice } from "./features/userSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PostSlice } from "./features/postSlice";

const userPersistConfig = { key: "user", storage, version: 1 };
const appPersistConfig = { key: "app", storage, version: 1 };
const postPersistConfig = { key: "post", storage, version: 1 };
const rootReducer = combineReducers({
  user: persistReducer(userPersistConfig, UserSlice.reducer),
  app: persistReducer(appPersistConfig, AppSlice.reducer),
  // posts: persistReducer(postPersistConfig, PostsSlice.reducer),
});
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;
useDispatch;
