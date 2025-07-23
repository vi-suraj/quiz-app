import { useEffect, useState } from "react";

export default function QuizTimer({ timeout, handleTimeOut }) {
  const [timeRemaining, setTimeRemaining] = useState(timeout);

  useEffect(() => {
    const timer = setTimeout(handleTimeOut, timeout);

    return () => {
      clearTimeout(timer);
    };
  }, [timeout, handleTimeOut]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining((prevTimeRemaining) => prevTimeRemaining - 100);
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return <progress id="question" max={timeout} value={timeRemaining} />;
}
