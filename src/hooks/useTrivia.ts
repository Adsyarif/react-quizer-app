import { useState, useEffect } from "react";

export interface TriviaQuestion {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface TriviaApiResponse {
  response_code: number;
  results: TriviaQuestion[];
}

interface TriviaType {
  category: number;
  amount: number;
  difficulty: string;
  type: string;
}

export const useTrivia = () => {
  const [triviaQuestions, setTriviaQuestions] = useState<TriviaQuestion[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [triviaType, setTriviaType] = useState<TriviaType>({
    category: 0,
    amount: 10, // Default amount set to 10
    difficulty: "easy",
    type: "multiple",
  });

  const triviaChallenge = (trivia: TriviaType) => {
    setTriviaType(trivia);
  };

  useEffect(() => {
    const fetchTriviaQuestions = async () => {
      const url = `https://opentdb.com/api.php?amount=${triviaType.amount}&category=${triviaType.category}&difficulty=${triviaType.difficulty}&type=${triviaType.type}`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data: TriviaApiResponse = await response.json();

        if (data.response_code === 0) {
          setTriviaQuestions(data.results);
        } else {
          setError(`Error retrieving trivia questions: ${data.response_code}`);
        }
      } catch (error) {
        if (error instanceof Error) {
          setError("Error fetching data: " + error.message);
        } else {
          setError("An unknown error occurred");
        }
      }
    };

    fetchTriviaQuestions();
  }, [triviaType]);

  // Now you can set up your initial test configuration wherever needed, such as in a component using the hook.

  return { triviaQuestions, error, triviaChallenge };
};
