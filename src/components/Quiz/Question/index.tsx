import React from "react";
import { TriviaQuestion } from "../../../hooks/useTrivia";

interface QuestionProps {
  question: TriviaQuestion;
  handleAnswer: (answer: boolean) => void;
}

const Question: React.FC<QuestionProps> = ({ question, handleAnswer }) => {
  const shuffledAnswers = [
    ...question.incorrect_answers,
    question.correct_answer,
  ].sort();

  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold mb-4">{question.question}</h3>
      {shuffledAnswers.map((answer, idx) => (
        <button
          key={idx}
          onClick={() => handleAnswer(answer === question.correct_answer)}
          className="w-full bg-[#F4D03F] text-[#1C1F33] font-semibold py-3 mb-2 rounded-full shadow-md hover:bg-[#eac92b] transition-all duration-300"
        >
          {answer}
        </button>
      ))}
    </div>
  );
};

export default Question;
