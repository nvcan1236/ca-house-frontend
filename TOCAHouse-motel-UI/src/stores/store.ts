import { combineReducers, configureStore } from "@reduxjs/toolkit";
import commonSlice from "./slices/commonSlice";
import authSlice from "./slices/authSlice";
import createMotelSlice from "./slices/createMotelSlice";
import { motelApi } from "./api/motelApi";
import { userApi } from "./api/userApi";
import { postApi } from "./api/postApi";
import filterSlice from "./slices/filterSlice";

const reducer = combineReducers({
  common: commonSlice,
  auth: authSlice,
  createMotel: createMotelSlice,
  filter: filterSlice,
  [motelApi.reducerPath]: motelApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [postApi.reducerPath]: postApi.reducer,
});

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      motelApi.middleware,
      userApi.middleware,
      postApi.middleware,
    ]),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
