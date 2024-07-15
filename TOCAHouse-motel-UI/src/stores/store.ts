import { combineReducers, configureStore } from "@reduxjs/toolkit";
import commonSlice from "./slices/commonSlice";
// ...

const reducer = combineReducers({
  common: commonSlice,
});

const store = configureStore({
  reducer,
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
