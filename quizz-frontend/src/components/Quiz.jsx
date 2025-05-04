import React, { useState, useEffect } from "react";
import { fetchQuestions } from "../services/api";
import QuestionCard from "./QuestionCard";
import Timer from "./Timer";

export default function Quiz({ totalQuestions }) {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    fetchQuestions(totalQuestions).then(setQuestions);
  }, [totalQuestions]);

  const handleAnswer = (isCorrect) => {
    if (isCorrect) setScore((prev) => prev + 1);
    if (current + 1 < totalQuestions) {
      setCurrent((prev) => prev + 1);
    } else {
      setFinished(true);
    }
  };

  if (!questions.length) return <p>Chargement...</p>;

  return (
    <div>
      {!finished ? (
        <>
          <Timer onTick={setTime} />
          <QuestionCard question={questions[current]} onAnswer={handleAnswer} />
        </>
      ) : (
        <div>
          <h2>Quiz terminé</h2>
          <p>
            Score : {score} / {totalQuestions}
          </p>
          <p>Temps total : {time.toFixed(2)} s</p>
        </div>
      )}
    </div>
  );
}
