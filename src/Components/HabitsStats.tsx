import React, { useEffect } from "react"; // React and useEffect hook
import { useDispatch, useSelector } from "react-redux"; // Hooks for state and dispatch
import { AppDispatch, RootState } from "../Store/Store"; // Types for dispatch and state
import { LinearProgress, Paper, Typography } from "@mui/material"; // Material UI components
import { fetchHabits } from "../Store/HabitSlice";

const HabitsStats: React.FC = () => {
  const { habits, isLoading, error } = useSelector(
    (state: RootState) => state.habits // Selects habits and loading/error states
  );
  const dispatch = useDispatch<AppDispatch>(); // Dispatch function

  useEffect(() => {
    dispatch(fetchHabits()); // Fetches habits on component mount
  }, [dispatch]);

  const getCompletedToday = () => {
    // Function to count habits completed today
    const today = new Date().toISOString().split("T")[0];
    return habits.filter((habit) => habit.completedDates.includes(today))
      .length; // Returns count of completed habits
  };

  const getLongestStreak = () => {
    // Function to calculate longest streak
    let longestStreak = 0;
    habits.forEach((habit) => {
      let streak = 0;
      const currentDate = new Date();
      while (true) {
        const dateString = currentDate.toISOString().split("T")[0];
        if (habit.completedDates.includes(dateString)) {
          streak++;
          currentDate.setDate(currentDate.getDate() - 1);
        } else {
          break;
        }
      }
      longestStreak = Math.max(longestStreak, streak); // Updates longest streak
    });
    return longestStreak; // Returns longest streak
  };

  if (isLoading) {
    return <LinearProgress />; // Shows loading indicator
  }
  if (error) {
    return <Typography color="error">{error}</Typography>; // Displays error message
  }
  return (
    <Paper elevation={2} sx={{ p: 2, mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Habits Stats
      </Typography>
      <Typography variant="body1">Total Habits: {habits.length}</Typography>
      <Typography variant="body1">
        Habits Completed Today: {getCompletedToday()}
      </Typography>
      <Typography variant="body1">
        Longest Streak: {getLongestStreak()} Days
      </Typography>
    </Paper>
  );
};

export default HabitsStats; // Exports the HabitsStats component
