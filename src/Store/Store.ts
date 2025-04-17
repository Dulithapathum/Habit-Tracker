// src/Store/Store.ts
import { configureStore } from "@reduxjs/toolkit"; // Redux Toolkit import
import habitsReducer from "./habitSlice"; // Reducer for habits

const store = configureStore({ // Configures the Redux store
  reducer: {
    habits: habitsReducer, // Adds habits reducer
  },
});

export type RootState = ReturnType<typeof store.getState>; // Type for root state
export type AppDispatch = typeof store.dispatch; // Type for dispatch

export default store; // Exports the store