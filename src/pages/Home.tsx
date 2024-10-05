import { useTrivia } from "../lib/quizService";

const Home = () => {
  const { triviaQuestions, error } = useTrivia();
  console.log(triviaQuestions);

  return (
    <>
      <div className="bg-red-600">Home</div>
      <div></div>
    </>
  );
};

export default Home;
