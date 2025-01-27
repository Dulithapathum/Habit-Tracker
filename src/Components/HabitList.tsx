import React from "react"; // React
import { useSelector, useDispatch } from "react-redux"; // Hooks for state and dispatch
import { AppDispatch, RootState } from "../Store/Store"; // Types for dispatch and state
import {
  Box,
  Button,
  Grid,
  Paper,
  Typography,
  LinearProgress,
} from "@mui/material"; // Material UI components
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline"; // Icon for completed habit
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"; // Icon for deleting habit
import { toggleHabit, removeHabit, Habit } from "../Store/habitSlice"; // Actions and types

const HabitList: React.FC = () => {
  const { habits } = useSelector((state: RootState) => state.habits); // Selects habits from state
  const dispatch = useDispatch<AppDispatch>(); // Dispatch function
  const today = new Date().toISOString().split("T")[0]; // Today's date

  const getStreak = (habit: Habit) => {
    // Function to calculate streak
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
    return streak; // Returns the streak count
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 4 }}>
      {habits.map((habit) => (
        <Paper key={habit.id} elevation={2} sx={{ p: 2 }}>
          <Grid container alignItems="center">
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">{habit.name}</Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ textTransform: "capitalize" }}
              >
                {habit.frequency}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
                <Button
                  variant="outlined"
                  color={
                    habit.completedDates.includes(today) ? "success" : "primary"
                  }
                  startIcon={<CheckCircleOutlineIcon />}
                  onClick={
                    () => dispatch(toggleHabit({ id: habit.id, date: today })) // Toggles habit completion
                  }
                >
                  {habit.completedDates.includes(today)
                    ? "Completed"
                    : "Mark Complete"}
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<DeleteOutlineIcon />}
                  onClick={() => dispatch(removeHabit(habit.id))} // Removes habit
                >
                  Remove
                </Button>
              </Box>
            </Grid>
          </Grid>
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2">
              Current Streak: {getStreak(habit)} Days
            </Typography>
            <LinearProgress
              variant="determinate"
              value={(getStreak(habit) / 30) * 100} // Progress bar for streak
              sx={{ mt: 1 }}
            />
          </Box>
        </Paper>
      ))}
    </Box>
  );
};

export default HabitList; // Exports the HabitList component
