import {
  createAsyncThunk,
  createSlice,
  nanoid,
  PayloadAction,
} from "@reduxjs/toolkit";

import { loadHabits, saveHabits } from "../utils/localStorageUtils";

export interface Habit {
  id: string;
  name: string;
  frequency: "daily" | "weekly";
  completedDates: string[];
  createdAt: string;
}

interface HabitState {
  habits: Habit[];
  isLoading: boolean;
  error: null | string;
}

const initialState: HabitState = {
  habits: loadHabits(), // Load saved habits from localStorage
  isLoading: false,
  error: null,
};

export const fetchHabits = createAsyncThunk("habits/fetchHabits", async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulates API call
  const mockHabits: Habit[] = []; // Add your mock data here if needed
  return mockHabits;
});

const habitSlice = createSlice({
  name: "habits",
  initialState,
  reducers: {
    addHabit: (
      state,
      action: PayloadAction<{ name: string; frequency: "daily" | "weekly" }>
    ) => {
      const newHabit: Habit = {
        id: nanoid(),
        name: action.payload.name,
        frequency: action.payload.frequency,
        completedDates: [],
        createdAt: new Date().toISOString(),
      };
      state.habits.push(newHabit);
      saveHabits(state.habits); // Save after adding
    },
    toggleHabit: (
      state,
      action: PayloadAction<{ id: string; date: string }>
    ) => {
      const habit = state.habits.find((h) => h.id === action.payload.id);
      if (habit) {
        const index = habit.completedDates.indexOf(action.payload.date);
        if (index > -1) {
          habit.completedDates.splice(index, 1);
        } else {
          habit.completedDates.push(action.payload.date);
        }
        saveHabits(state.habits); // Save after toggle
      }
    },
    removeHabit: (state, action: PayloadAction<string>) => {
      state.habits = state.habits.filter(
        (habit) => habit.id !== action.payload
      );
      saveHabits(state.habits); // Save after remove
    },
    clearAllHabits: (state) => {
      state.habits = [];
      saveHabits(state.habits); // Clear localStorage too
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHabits.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchHabits.fulfilled, (state, action) => {
        state.isLoading = false;
        state.habits = [...state.habits, ...action.payload];
        saveHabits(state.habits); // Save after fetching
      })
      .addCase(fetchHabits.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch habits";
      });
  },
});

export const { addHabit, toggleHabit, removeHabit, clearAllHabits } =
  habitSlice.actions;
export default habitSlice.reducer;
