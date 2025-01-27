import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../Store/Store";
import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { toggleHabit } from "../Store/habitSlice";
const HabitList: React.FC = () => {
  const { habits } = useSelector((state: RootState) => state.habits);
  const today = new Date().toISOString().split("T")[0];
  const dispatch = useDispatch<AppDispatch>();
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 4 }}>
      {habits.length === 0 ? (
        <Typography variant="h6">No habits found</Typography>
      ) : (
        habits.map((habit) => (
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
                <Box
                  sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}
                >
                  <Button
                    variant="outlined"
                    color={
                      habit.completedDates.includes(today)
                        ? "success"
                        : "primary"
                    }
                    startIcon={<CheckCircleOutlineIcon />}
                    onClick={() => {
                      dispatch(toggleHabit({ id: habit.id, date: today }));
                    }}
                  >
                    {habit.completedDates.includes(today)
                      ? "Completed"
                      : "Mark Complete"}
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    startIcon={<DeleteOutlineIcon />}
                  >
                    Remove
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        ))
      )}
    </Box>
  );
};

export default HabitList;
