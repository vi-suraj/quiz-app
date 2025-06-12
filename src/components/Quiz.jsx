import { useState } from "react";

export default function Quiz() {
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [userAnswers, setuserAnswers] = useState([]);

  return <p>current active question</p>;
}
