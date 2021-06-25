import PathfindingVisualizer from "./components/PathfindingVisualizer";
import "./App.css";

function App() {
  return (
    <>
      <div className="App">
        <PathfindingVisualizer />
      </div>
      <div className="overlay">
        <span>This app is only supported in displays with width greater than 1200px</span>
      </div>
    </>
  );
}

export default App;