import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Quiz from "./components/Quiz";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
        <h1>Quizz Brainrots Italien</h1>
        <Quiz totalQuestions={10} />
      </div>
    </>
  );
}

export default App;
