import "./App.css";
import AppRouter from "./AppRouter";
import { MyProvider } from "./MyContext";

function App() {
  return (
    <MyProvider>
      <div className="App">
        <AppRouter />
      </div>
    </MyProvider>
  );
}

export default App;
