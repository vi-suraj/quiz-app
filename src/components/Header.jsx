import QuizLogo from "../assets/quiz-logo.png";

export default function Header() {
  return (
    <header>
      <img src={QuizLogo} alt="Quiz Logo" />
      <h1>React quiz</h1>
    </header>
  );
}
