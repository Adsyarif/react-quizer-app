import { createContext, FC, ReactNode, useState } from "react";
import { TriviaQuestion } from "../hooks/useTrivia";

interface User {
  email: string;
  username?: string;
  age?: number;
  token?: string;
}

interface ContextApp {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;

  selectedQuiz: TriviaQuestion[] | null;
  setSelectedQuiz: (quizes: TriviaQuestion[] | null) => void;

  quizComplete: boolean;
  setQuizComplete: (complete: boolean) => void;
}

export const AppContext = createContext<ContextApp>({
  currentUser: null,
  setCurrentUser: () => {},
  selectedQuiz: null,
  setSelectedQuiz: () => {},
  quizComplete: false,
  setQuizComplete: () => {},
});

interface ContextProviderProps {
  children: ReactNode;
}

export const AppProvider: FC<ContextProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [selectedQuiz, setSelectedQuiz] = useState<TriviaQuestion[] | null>(
    null
  );
  const [quizComplete, setQuizComplete] = useState<boolean>(false);

  const value = {
    currentUser,
    setCurrentUser,
    selectedQuiz,
    setSelectedQuiz,
    quizComplete,
    setQuizComplete,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
