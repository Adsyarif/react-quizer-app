import { useState } from "react";

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

export interface TriviaType {
  category: number;
  amount: number;
  difficulty: string;
  type: string;
}

export const useTrivia = () => {
  const [triviaQuestions, setTriviaQuestions] = useState<TriviaQuestion[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchTriviaQuestions = async (trivia: TriviaType) => {
    const { amount, category, difficulty, type } = trivia;
    const url = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`;

    setLoading(true);
    setError(null);

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
    } finally {
      setLoading(false);
    }
  };

  return { triviaQuestions, error, loading, fetchTriviaQuestions };
};
