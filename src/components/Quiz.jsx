import { useState } from "react";
import QUESTIONS from "../question";
import quizComplete from "../assets/quiz-complete.png";

export default function Quiz() {
  const [userAnswser, setUserAnswser] = useState([]);

  function handleAnswser(selectedAnswser) {
    setUserAnswser((prevUserAnswser) => {
      return [...prevUserAnswser, selectedAnswser];
    });
  }

  const activeQuestionIndex = userAnswser.length;
  const isQuizCompleted = activeQuestionIndex === QUESTIONS.length;

  if (isQuizCompleted) {
    return (
      <div id="summary">
        <img src={quizComplete} alt="Quiz Complete" />
        <h2>Quiz Completed</h2>
      </div>
    );
  }

  const shuffleAnswser = [...QUESTIONS[activeQuestionIndex].answers];
  shuffleAnswser.sort(() => Math.random() - 0.5);

  return (
    <div id="quiz">
      <div id="question">
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <ul id="answers">
          {shuffleAnswser.map((answser) => (
            <li key={answser} className="answer">
              <button onClick={() => handleAnswser(answser)}>{answser}</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
