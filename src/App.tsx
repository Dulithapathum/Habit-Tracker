// src/App.tsx
import { Provider } from "react-redux"; // Provides the Redux store to the app
import Store from "./Store/Store"; // Imports the Redux store
import { Container, Typography } from "@mui/material"; // Material UI components
import AddHabitForm from "./Components/AddHabitForm"; // Component to add new habits
import HabitList from "./Components/HabitList"; // Component to display the list of habits
import HabitsStats from "./Components/HabitsStats"; // Component to show statistics about habits


const App = () => {
  return (
    <Provider store={Store}>
      <Container maxWidth="md">
        <Typography component="h1" variant="h2" align="center" sx={{ mb: 4 }}>
          Habit Tracker
        </Typography>
        <AddHabitForm />
        <HabitList />
        <HabitsStats />
      </Container>
    </Provider>
  );
};

export default App; // Exports the App component
