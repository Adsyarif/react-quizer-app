import { createContext, FC, ReactNode, useState } from "react";
import { TriviaType, TriviaQuestion } from "../hooks/useTrivia";

interface User {
  email: string;
  username?: string;
  age?: number;
  token?: string;
}

interface ContextApp {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;

  selectedQuiz: TriviaQuestion | null | TriviaType;
  setSelectedQuiz: (quizes: TriviaQuestion | null) => void;
}

export const AppContext = createContext<ContextApp>({
  currentUser: null,
  setCurrentUser: () => {},
  selectedQuiz: null,
  setSelectedQuiz: () => {},
});

interface ContextProviderProps {
  children: ReactNode;
}

export const AppProvider: FC<ContextProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [selectedQuiz, setSelectedQuiz] = useState<
    TriviaQuestion | TriviaType | null
  >(null);

  const value = {
    currentUser,
    setCurrentUser,
    selectedQuiz,
    setSelectedQuiz,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
