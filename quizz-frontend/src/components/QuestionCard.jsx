import React from "react";

export default function QuestionCard({ question, onAnswer }) {
  const getAPIbaseUrl = () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    return apiUrl;
  };

  return (
    <div style={{ marginBottom: 20 }}>
      <img
        src={`${getAPIbaseUrl()}${question.imageUrl}`}
        alt="Brainrot"
        style={{ width: "20rem", height: "20rem", marginBottom: "1rem" }}
      />
      <p>{question.text}</p>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {question.choices.map((c, i) => (
          <button
            key={i}
            onClick={() => onAnswer(c.isCorrect)}
            style={{ margin: "1rem", whiteSpace: "nowrap", padding: "1rem" }}
          >
            {c.text}
          </button>
        ))}
      </div>
    </div>
  );
}
