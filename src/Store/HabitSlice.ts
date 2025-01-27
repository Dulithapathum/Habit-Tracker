// src/Store/HabitSlice.ts
import {
  createAsyncThunk,
  createSlice,
  nanoid,
  PayloadAction,
} from "@reduxjs/toolkit"; // Redux Toolkit imports

export interface Habit { // Habit interface
  id: string;
  name: string;
  frequency: "daily" | "weekly";
  completedDates: string[];
  createdAt: string;
}

interface HabitState { // State interface for habits
  habits: Habit[];
  isLoading: boolean;
  error: null | string;
}

const initialState: HabitState = { // Initial state
  habits: [],
  isLoading: false,
  error: null,
};

export const fetchHabits = createAsyncThunk("habits/fetchHabits", async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulates API call
  const mockHabits: Habit[] = []; // Mock habits
  return mockHabits; // Returns mock habits
});

const habitSlice = createSlice({ // Creates the habit slice
  name: "habits",
  initialState,
  reducers: {
    addHabit: (state, action: PayloadAction<{ name: string; frequency: "daily" | "weekly" }>) => {
      const newHabit: Habit = { // Creates a new habit
        id: nanoid(),
        name: action.payload.name,
        frequency: action.payload.frequency,
        completedDates: [],
        createdAt: new Date().toISOString(),
      };
      state.habits.push(newHabit); // Adds new habit to state
    },
    toggleHabit: (state, action: PayloadAction<{ id: string; date: string }>) => {
      const habit = state.habits.find((h) => h.id === action.payload.id); // Finds the habit
      if (habit) {
        const index = habit.completedDates.indexOf(action.payload.date);
        if (index > -1) {
          habit.completedDates.splice(index, 1); // Removes date if habit was completed
        } else {
          habit.completedDates.push(action.payload.date); // Adds date if habit was not completed
        }
      }
    },
    removeHabit: (state, action: PayloadAction<string>) => {
      state.habits = state.habits.filter(
        (habit) => habit.id !== action.payload // Removes habit from state
      );
    },
  },
  extraReducers: (builder) => { // Handles async actions
    builder
      .addCase(fetchHabits.pending, (state) => {
        state.isLoading = true; // Sets loading state
      })
      .addCase(fetchHabits.fulfilled, (state, action) => {
        state.isLoading = false; // Resets loading state
        state.habits = [...state.habits, ...action.payload]; // Adds fetched habits to state
      })
      .addCase(fetchHabits.rejected, (state, action) => {
        state.isLoading = false; // Resets loading state
        state.error = action.error.message || "Failed to fetch habits"; // Sets error message
      });
  },
});

export const { addHabit, toggleHabit, removeHabit } = habitSlice.actions; // Exports actions
export default habitSlice.reducer; // Exports reducer