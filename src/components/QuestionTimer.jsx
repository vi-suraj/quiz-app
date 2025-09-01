import { useEffect, useState } from "react";

export default function QuestionTimer({ timeout, timerExpiered }) {
  const [timeRemaining, setTimeRemaining] = useState(timeout);

  useEffect(() => {
    console.log("SET TIMEOUT");
    const timer = setTimeout(timerExpiered, timeout);
    return () => {
      clearTimeout(timer);
    };
  }, [timeout, timerExpiered]);

  useEffect(() => {
    console.log("SET INTERVAL");
    const interval = setInterval(() => {
      setTimeRemaining((prevTimeRemaining) => prevTimeRemaining - 100);
    }, 100);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return <progress max={timeout} value={timeRemaining} id="question-time" />;
}
