import logo from "./logo.svg";
import "./App.css";
import Todo from "./components/todo";

function App() {
  return (
    <div
      className="container border border-primary rounded mt-5"
      style={{
        background: `url(https://img.freepik.com/free-photo/black-concrete-wall_53876-92805.jpg?w=360)`,
        backgroundSize: "cover",
      }}
    >
      <Todo />
    </div>
  );
}

export default App;
