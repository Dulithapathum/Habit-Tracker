import { createSlice } from "@reduxjs/toolkit";

export interface Habit {
  id: string;
  name: string;
  frequency: "daily" | "weekly";
  completedDates: string[];
  createdAt: string;
}

interface HabitState {
  habits: Habit[];
}

const initialState: HabitState = {
  habits: [],
};

const HabitSlice = createSlice({
  name: "habits",
  initialState,
  reducers: { addHabit: () => {} },
});

export const { addHabit } = HabitSlice.actions;
export default HabitSlice.reducer;
