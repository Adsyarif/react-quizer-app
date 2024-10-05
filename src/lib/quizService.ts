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

const BASE_URL = "https://opentdb.com/api.php";

export const fetchTriviaQuestions = async (
  amount = 10,
  category = 31,
  type = "boolean"
): Promise<TriviaQuestion[] | null> => {
  const url = `${BASE_URL}?amount=${amount}&category=${category}&type=${type}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Network error: ${response.statusText}`);
    }

    const data: TriviaApiResponse = await response.json();

    if (data.response_code !== 0) {
      console.error("Error retrieving trivia questions:", data.response_code);
      return null;
    }

    return data.results;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};
