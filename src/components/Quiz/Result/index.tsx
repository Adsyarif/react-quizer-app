import React from "react";

interface ResultProps {
  answers: boolean[];
  questions: { length: number };
}

const Result: React.FC<ResultProps> = ({ answers, questions }) => {
  const correctAnswers = answers.filter((answer) => answer).length;
  const wrongAnswers = answers.length - correctAnswers;

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-4">Quiz Complete!</h2>
      <p>Total Questions: {questions.length}</p>
      <p>Correct: {correctAnswers}</p>
      <p>Wrong: {wrongAnswers}</p>
      <p>Attempted: {answers.length}</p>
    </div>
  );
};

export default Result;
