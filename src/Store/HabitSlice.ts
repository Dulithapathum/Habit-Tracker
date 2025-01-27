import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
  reducers: {
    addHabit: (
      state,
      actions: PayloadAction<{ name: string; frequency: "daily" | "weekly" }>
    ) => {
      const newHabit: Habit = {
        id: Date.now().toString(),
        name: actions.payload.name,
        frequency: actions.payload.frequency,
        completedDates: [],
        createdAt: new Date().toISOString(),
      };
      state.habits.push(newHabit);
    },
    toggleHabit: (
      state,
      actions: PayloadAction<{ id: string; date: string }>
    ) => {
      const habit = state.habits.find((h) => h.id === actions.payload.id);
      if (habit) {
        const index = habit.completedDates.indexOf(actions.payload.date);
        if (index > -1) {
          habit.completedDates.splice(index, 1);
        } else {
          habit.completedDates.push(actions.payload.date);
        }
      }
    },
  },
});

export const { addHabit, toggleHabit } = HabitSlice.actions;
export default HabitSlice.reducer;
