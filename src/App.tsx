import { Provider } from "react-redux";
import Store from "./Store/Store";
import { Container, Typography } from "@mui/material";
import AddHabitForm from "./Components/AddHabitForm";
import HabitList from "./Components/HabitList";

const App = () => {
  return (
    <Provider store={Store}>
      <Container maxWidth="md">
        <Typography component="h1" variant="h2" align="center">
          Habit Tracker
        </Typography>
        <AddHabitForm />
        <HabitList />
      </Container>
    </Provider>
  );
};

export default App;
