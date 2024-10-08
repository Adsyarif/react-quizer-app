import React, { useState, useEffect, useContext } from "react";
import { useTrivia, TriviaType } from "../../hooks/useTrivia";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/ApPContext";

const Dashboard: any = () => {
  const { selectedQuiz } = useContext(AppContext);
  const { triviaQuestions, error, loading, fetchTriviaQuestions } = useTrivia();
  const [questionType, setQuestionsType] = useState<TriviaType>({
    category: 9,
    amount: 10,
    difficulty: "easy",
    type: "multiple",
  });

  const navigate = useNavigate();
  const { currentUser } = useContext(AppContext);

  const startTrivia = async () => {
    const triviaConfig: TriviaType = {
      category: questionType.category,
      amount: questionType.amount,
      difficulty: questionType.difficulty,
      type: questionType.type,
    };

    await fetchTriviaQuestions(triviaConfig);
  };

  useEffect(() => {
    if (triviaQuestions.length > 0) {
      navigate("/quiz");
    }
  }, [selectedQuiz]);

  return currentUser ? (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#1C1F33] to-[#283046]">
      <div className="bg-[#F4F4F8] text-[#1C1F33] rounded-xl shadow-lg p-8 w-full max-w-lg">
        <h1 className="text-2xl font-bold text-center mb-6">
          Trivia Challenge
        </h1>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Category:</label>
            <select
              value={questionType.category}
              onChange={(e) =>
                setQuestionsType((prev) => ({
                  ...prev,
                  category: Number(e.target.value),
                }))
              }
              className="w-full bg-[#F4F4F8] text-[#1C1F33] rounded-lg px-4 py-2 shadow-sm focus:outline-none"
            >
              <option value={9}>General Knowledge</option>
              <option value={18}>Science: Computers</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Amount:</label>
            <input
              type="number"
              value={questionType.amount}
              onChange={(e) =>
                setQuestionsType((prev) => ({
                  ...prev,
                  amount: Number(e.target.value),
                }))
              }
              className="w-full bg-[#F4F4F8] text-[#1C1F33] rounded-lg px-4 py-2 shadow-sm focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Difficulty:
            </label>
            <select
              value={questionType.difficulty}
              onChange={(e) =>
                setQuestionsType((prev) => ({
                  ...prev,
                  difficulty: e.target.value,
                }))
              }
              className="w-full bg-[#F4F4F8] text-[#1C1F33] rounded-lg px-4 py-2 shadow-sm focus:outline-none"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Type:</label>
            <select
              value={questionType.type}
              onChange={(e) =>
                setQuestionsType((prev) => ({
                  ...prev,
                  type: e.target.value,
                }))
              }
              className="w-full bg-[#F4F4F8] text-[#1C1F33] rounded-lg px-4 py-2 shadow-sm focus:outline-none"
            >
              <option value="multiple">Multiple Choice</option>
              <option value="boolean">True/False</option>
            </select>
          </div>
          <button
            onClick={startTrivia}
            disabled={loading}
            className={`w-full py-3 mt-4 font-semibold rounded-full shadow-md ${
              loading ? "bg-gray-300" : "bg-[#F4D03F] hover:bg-[#eac92b]"
            } text-[#1C1F33] transition-all duration-300`}
          >
            {loading ? "Loading..." : "Start Trivia"}
          </button>
        </div>

        {error && (
          <p className="mt-4 text-red-500 text-center">Error: {error}</p>
        )}
      </div>
    </div>
  ) : (
    navigate("/login")
  );
};

export default Dashboard;
