import userReducer from "./UserSlice";
import favoriteReducer from "./FavoriteSlice";
import flowersReducer from "./FlowersSlice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";
import sightingsReducer from "./SightingsSlice";
import commentsReducer from "./CommentsSlice";
import likesReducer from "./LikesSlice";
import userSightingsReducer from "./userSightingSlice";
import sighingDetailsReducer from "./SightingDetailsSlice";
const persistConfig = {
  key: "main-root",
  storage,
  blacklist: ["user"],
};

const userConfig = {
  key: "user",
  storage,
  blacklist: ["error"],
};
const rootReducer = combineReducers({
  user: persistReducer(userConfig, userReducer),
  favoriteList: favoriteReducer,
  flowers: flowersReducer,
  comments: commentsReducer,
  sightings: sightingsReducer,
  likes: likesReducer,
  sightingDetails: sighingDetailsReducer,
  mySightings: userSightingsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});

export const persistor = persistStore(store);
