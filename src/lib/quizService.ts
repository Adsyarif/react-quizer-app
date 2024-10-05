import { useState, useEffect } from "react";

interface TriviaQuestion {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

interface TriviaApiResponse {
  response_code: number;
  results: TriviaQuestion[];
}

export const useTrivia = () => {
  const [triviaQuestions, setTriviaQuestions] = useState<TriviaQuestion[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTriviaQuestions = async () => {
      const url =
        "https://opentdb.com/api.php?amount=10&category=31&type=boolean";

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
  }, []); // Empty dependency array, runs on mount

  return { triviaQuestions, error };
};
