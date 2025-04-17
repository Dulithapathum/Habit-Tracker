import { Habit } from "../Store/HabitSlice";

const HABITS_KEY = "habits";

export const loadHabits = (): Habit[] => {
  try {
    const stored = localStorage.getItem(HABITS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Failed to load habits from localStorage:", error);
    return [];
  }
};

export const saveHabits = (habits: Habit[]) => {
  try {
    const data = JSON.stringify(habits);
    localStorage.setItem(HABITS_KEY, data);
  } catch (error) {
    console.error("Failed to save habits to localStorage:", error);
  }
};
