import { configureStore } from "@reduxjs/toolkit";
import userSlices from "./userSlice";
export const store = configureStore({
  reducer: {
    user: userSlices,
  },
});
