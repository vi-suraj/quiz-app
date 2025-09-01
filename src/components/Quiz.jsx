import { useCallback, useState } from "react";
import quizComplete from "../assets/quiz-complete.png";
import QUESTIONS from "../questions.js";
import QuestionTimer from "./QuestionTimer.jsx";

export default function Quiz() {
  const [answerStatus, setAnswerStatus] = useState("");
  const [userAnswer, setUserAnswer] = useState([]);
  const activeQuestionIndex = answerStatus === "" ? userAnswer.length : userAnswer.length - 1;
  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  const handleAnswer = useCallback(
    function handleAnswer(selectedAnswer) {
      setAnswerStatus("answered");
      setUserAnswer((prevAnswer) => {
        return [...prevAnswer, selectedAnswer];
      });

      setTimeout(() => {
        if (selectedAnswer === QUESTIONS[activeQuestionIndex].answers) {
          setAnswerStatus("correct");
        } else {
          setAnswerStatus("wrong");
        }
        setTimeout(() => {
          setAnswerStatus("");
        }, 2000);
      }, 1000);
    },
    [activeQuestionIndex]
  );

  const handleSkipAnswer = useCallback(() => handleAnswer(null), [handleAnswer]);

  if (quizIsComplete) {
    return (
      <div id="summary">
        <img src={quizComplete} alt="Quiz Complete" />
        <h2>Quiz Completes</h2>
      </div>
    );
  }

  const shuffledAnswer = [...QUESTIONS[activeQuestionIndex].answers];
  shuffledAnswer.sort(() => Math.random() - 0.5);

  return (
    <div id="quiz">
      <div id="question">
        <QuestionTimer key={activeQuestionIndex} timeout={10000} timerExpiered={handleSkipAnswer} />
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <ul id="answers">
          {shuffledAnswer.map((answers) => {
            const isSelected = userAnswer[userAnswer.length - 1] === answers;
            let cssClass;

            if (isSelected && answerStatus === "answered") {
              cssClass = "selected";
            }

            if ((answerStatus === "correct" || answerStatus === "wrong") && isSelected) {
              cssClass = answerStatus;
            }

            return (
              <li className="answer" key={answers}>
                <button className={cssClass} onClick={() => handleAnswer(answers)}>
                  {answers}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
