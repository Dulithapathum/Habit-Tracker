import React, { useState } from "react"; // React and useState hook
import { useDispatch } from "react-redux"; // Hook to dispatch actions
import { AppDispatch } from "../Store/Store"; // Type for dispatch
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material"; // Material UI components
import { addHabit } from "../Store/habitSlice";

const AddHabitForm: React.FC = () => {
  const [name, setName] = useState<string>(""); // State for habit name
  const [frequency, setFrequency] = useState<"daily" | "weekly">("daily"); // State for frequency
  const dispatch = useDispatch<AppDispatch>(); // Dispatch function

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevents default form submission
    if (name.trim()) {
      dispatch(addHabit({ name, frequency })); // Dispatches addHabit action
      setName(""); // Resets the name input
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {" "}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          label="Habit Name"
          value={name}
          onChange={(e) => setName(e.target.value)} // Updates name state
          placeholder="Enter Habit Name"
          fullWidth
        />
        <FormControl fullWidth>
          <InputLabel>Frequency</InputLabel>
          <Select
            value={frequency}
            onChange={(e) => setFrequency(e.target.value as "daily" | "weekly")} // Updates frequency state
          >
            <MenuItem value="daily">Daily</MenuItem>
            <MenuItem value="weekly">Weekly</MenuItem>
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Add Habit
        </Button>
      </Box>
    </form>
  );
};

export default AddHabitForm; // Exports the AddHabitForm component
