import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

const Quiz: React.FC = () => {
  const { selectedQuiz } = useContext(AppContext);
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(300);
  const [score, setScore] = useState({ correct: 0, incorrect: 0, total: 0 });
  const [shuffledAnswers, setShuffledAnswers] = useState<string[]>([]);
  const navigate = useNavigate();

  const shuffleArray = (array: string[]) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  useEffect(() => {
    if (selectedQuiz) {
      setQuestions(selectedQuiz);
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          showResults({
            correct: score.correct,
            incorrect: score.incorrect,
            total: questions.length,
          });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (questions.length > 0) {
      const currentQuestion = questions[currentQuestionIndex];
      const answers = shuffleArray([
        currentQuestion.correct_answer,
        ...currentQuestion.incorrect_answers,
      ]);
      setShuffledAnswers(answers);
    }
  }, [currentQuestionIndex, questions]);

  const handleAnswer = (isCorrect: boolean) => {
    setScore((prevScore) => ({
      correct: prevScore.correct + (isCorrect ? 1 : 0),
      incorrect: prevScore.incorrect + (!isCorrect ? 1 : 0),
      total: prevScore.total + 1,
    }));

    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      const finalScore = {
        correct: score.correct + (isCorrect ? 1 : 0),
        incorrect: score.incorrect + (!isCorrect ? 1 : 0),
        total: questions.length,
      };
      showResults(finalScore);
    }
  };

  const showResults = (finalScore: {
    correct: number;
    incorrect: number;
    total: number;
  }) => {
    alert(
      `Quiz finished! Correct: ${finalScore.correct}, Incorrect: ${finalScore.incorrect}, Total: ${finalScore.total}`
    );
    navigate("/dashboard");
  };

  if (questions.length === 0)
    return <div className="text-center text-white">Loading questions...</div>;

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1C1F33] to-[#283046] flex flex-col items-center justify-center">
      <div className="bg-[#F4F4F8] text-[#1C1F33] rounded-lg shadow-lg p-8 w-full max-w-lg">
        <h2 className="text-xl font-bold text-center mb-6">
          {currentQuestion.question}
        </h2>
        <div className="space-y-4">
          {shuffledAnswers.map((answer: string, index: number) => (
            <button
              key={index}
              onClick={() =>
                handleAnswer(answer === currentQuestion.correct_answer)
              }
              className="w-full bg-[#F4D03F] hover:bg-[#eac92b] text-[#1C1F33] rounded-lg px-4 py-3 shadow-md focus:outline-none transition-all"
            >
              {answer}
            </button>
          ))}
        </div>
        <div className="mt-6 text-sm text-center">
          <p>Time Left: {timeLeft} seconds</p>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
