import React, { useState, useEffect } from "react";
import { useTrivia, TriviaQuestion } from "../../hooks/useTrivia";
import { Question, Timer, Result } from "../../components/Quiz";

const Quiz: React.FC = () => {
  const { triviaQuestions } = useTrivia();
  console.log(triviaQuestions);
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1C1F33] to-[#283046] flex flex-col justify-center items-center">
      <div className="bg-[#F4F4F8] text-[#1C1F33] rounded-xl shadow-lg p-8 max-w-md w-full md:max-w-lg"></div>
      <div className="absolute bottom-0 left-0 right-0 h-24 md:h-12 bg-gradient-to-t from-[#1C1F33] to-transparent"></div>
    </div>
  );
};

export default Quiz;
