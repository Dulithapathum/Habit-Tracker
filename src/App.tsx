import { Provider } from "react-redux";
import Store from "./Store/Store";

const App = () => {
  return (
    <Provider store={Store}>
      <div>App</div>
    </Provider>
  );
};

export default App;
