import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

const Quiz: React.FC = () => {
  const { selectedQuiz, setQuizComplete } = useContext(AppContext);
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(5);
  const [score, setScore] = useState({
    correct: 0,
    incorrect: 0,
    total: 0,
  });
  const [shuffledAnswers, setShuffledAnswers] = useState<string[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswering, setIsAnswering] = useState<boolean>(false);
  const [waiting, setWaiting] = useState<boolean>(false);
  const [isTimeout, setIsTimeout] = useState<boolean>(false);
  const navigate = useNavigate();

  const decodeHTMLEntities = (text: string) => {
    const doc = new DOMParser().parseFromString(text, "text/html");
    return doc.documentElement.textContent;
  };

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
  }, [selectedQuiz]);

  const handleTimeout = () => {
    setIsTimeout(true);
    setWaiting(true);

    setScore((prevScore) => ({
      correct: prevScore.correct,
      incorrect: prevScore.incorrect + 1,
      total: prevScore.total + 1,
    }));

    setTimeout(() => {
      setIsTimeout(false);
      setWaiting(false);
      if (currentQuestionIndex + 1 < questions.length) {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      } else {
        showResults({
          correct: score.correct,
          incorrect: score.incorrect + 1,
          total: score.total + 1,
        });
      }
    }, 2000);
  };

  const handleAnswer = (answer: string) => {
    if (isAnswering || waiting || isTimeout) return;

    setSelectedAnswer(answer);
    setIsAnswering(true);
    setWaiting(true);
    setIsTimeout(false);

    const isCorrect = answer === questions[currentQuestionIndex].correct_answer;

    setScore((prevScore) => ({
      correct: prevScore.correct + (isCorrect ? 1 : 0),
      incorrect: prevScore.incorrect + (!isCorrect ? 1 : 0),
      total: prevScore.total + 1,
    }));

    setTimeout(() => {
      setWaiting(false);
      setIsAnswering(false);

      if (currentQuestionIndex + 1 < questions.length) {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      } else {
        showResults({
          correct: score.correct + (isCorrect ? 1 : 0),
          incorrect: score.incorrect + (!isCorrect ? 1 : 0),
          total: score.total + 1,
        });
      }

      setSelectedAnswer(null);
    }, 2000);
  };

  const showResults = (finalScore: {
    correct: number;
    incorrect: number;
    total: number;
  }) => {
    alert(
      `Quiz finished! Correct: ${finalScore.correct}, Incorrect: ${finalScore.incorrect}, Total: ${finalScore.total}`
    );
    setQuizComplete(true);
    navigate("/dashboard");
  };

  useEffect(() => {
    if (timeLeft > 0 && !selectedAnswer && !waiting && !isTimeout) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else if (timeLeft === 0 && !isTimeout && !waiting) {
      handleTimeout();
    }
  }, [timeLeft, selectedAnswer, waiting, isTimeout]);

  useEffect(() => {
    if (questions.length > 0) {
      const currentQuestion = questions[currentQuestionIndex];
      const answers = shuffleArray([
        currentQuestion.correct_answer,
        ...currentQuestion.incorrect_answers,
      ]);
      setShuffledAnswers(answers);
      setTimeLeft(5);
      setIsTimeout(false);
      setWaiting(false);
    }
  }, [currentQuestionIndex, questions]);

  if (questions.length === 0)
    return <div className="text-center text-white">Loading questions...</div>;

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1C1F33] to-[#283046] flex flex-col items-center justify-center">
      <div className="bg-[#F4F4F8] text-[#1C1F33] rounded-lg shadow-lg p-8 w-full max-w-lg">
        <div className="mb-4 w-full bg-gray-300 rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="text-center text-lg mb-4">
          <p>
            Question {currentQuestionIndex + 1} of {questions.length}
          </p>
        </div>
        <h2 className="text-xl font-bold text-center mb-6">
          {decodeHTMLEntities(currentQuestion.question)}
        </h2>
        <div className="space-y-4">
          {shuffledAnswers.map((answer: string, index: number) => (
            <button
              key={index}
              onClick={() => handleAnswer(answer)}
              className={`w-full rounded-lg px-4 py-3 shadow-md focus:outline-none transition-all ${
                selectedAnswer
                  ? answer === currentQuestion.correct_answer
                    ? "bg-green-500 text-white"
                    : answer === selectedAnswer
                    ? "bg-red-500 text-white"
                    : "bg-gray-300 text-black"
                  : "bg-[#F4D03F] hover:bg-[#eac92b] text-[#1C1F33]"
              }`}
              disabled={!!selectedAnswer || waiting || isTimeout}
            >
              {decodeHTMLEntities(answer)}
            </button>
          ))}
        </div>
        <div className="mt-6 text-sm text-center">
          {waiting ? (
            <p>Waiting for the next question...</p>
          ) : (
            <p>Time Left: {timeLeft} seconds</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
