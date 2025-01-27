import { configureStore } from "@reduxjs/toolkit";
import habitsReducer from "./habitSlice";
export default configureStore({
  reducer: {
    habits: habitsReducer,
  },
});
