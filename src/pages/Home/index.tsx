import { useNavigate } from "react-router-dom";
import { Navigation, Footer } from "../../components/common";

const Home: React.FC = () => {
  const navigate = useNavigate();

  const savedUser = localStorage.getItem("user");

  const isLocal = Array.isArray(savedUser)
    ? savedUser.length > 0
    : typeof savedUser === "string" &&
      savedUser.length > 0 &&
      savedUser !== "null";

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleSignUpClick = () => {
    navigate("/register");
  };

  const handleDashboardClick = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1C1F33] to-[#283046] flex flex-col justify-between">
      <Navigation />
      <header className="text-center px-6 lg:px-24 text-white mt-16">
        <h1 className="text-5xl font-bold mb-4 leading-tight tracking-wide">
          Test Your Knowledge, <br /> Enhance Your Skills
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
          Quizer is the ultimate platform to challenge yourself and grow through
          diverse quizzes and real-time competitions.
        </p>
        {isLocal ? (
          <div className="space-y-4 md:space-y-0 md:space-x-6 flex flex-col md:flex-row justify-center">
            <button
              onClick={handleDashboardClick}
              className="bg-[#F4D03F] text-[#1C1F33] px-8 py-3 rounded-full font-semibold hover:bg-[#eac92b] transition-all duration-300 shadow-lg"
            >
              Challenge Now!
            </button>
          </div>
        ) : (
          <div className="space-y-4 md:space-y-0 md:space-x-6 flex flex-col md:flex-row justify-center">
            <button
              onClick={handleLoginClick}
              className="bg-[#F4D03F] text-[#1C1F33] px-8 py-3 rounded-full font-semibold hover:bg-[#eac92b] transition-all duration-300 shadow-lg"
            >
              Login
            </button>
            <button
              onClick={handleSignUpClick}
              className="border border-[#F4D03F] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#F4D03F] hover:text-[#1C1F33] transition-all duration-300 shadow-lg"
            >
              Sign Up
            </button>
          </div>
        )}
      </header>
      <section className="mt-16 px-6 md:px-12 lg:px-32 text-white">
        <h2 className="text-3xl font-semibold text-center mb-8">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-[#283046] p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
            <h3 className="text-2xl font-semibold mb-4 text-[#F4D03F]">
              Comprehensive Quizzes
            </h3>
            <p className="text-gray-300">
              Explore a variety of quizzes covering multiple topics to test your
              skills and improve your knowledge.
            </p>
          </div>
          <div className="bg-[#283046] p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
            <h3 className="text-2xl font-semibold mb-4 text-[#F4D03F]">
              Real-Time Leaderboards
            </h3>
            <p className="text-gray-300">
              Compete globally and see where you stand with real-time
              leaderboards that update with every challenge.
            </p>
          </div>
          <div className="bg-[#283046] p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
            <h3 className="text-2xl font-semibold mb-4 text-[#F4D03F]">
              Achievements & Rewards
            </h3>
            <p className="text-gray-300">
              Earn badges and rewards for your progress and milestones as you
              challenge yourself to new heights.
            </p>
          </div>
        </div>
      </section>
      {!isLocal && (
        <section className="mt-20 text-center">
          <h2 className="text-4xl font-semibold text-white mb-6">
            Join Us Today
          </h2>
          <button
            onClick={handleSignUpClick}
            className="bg-[#F4D03F] text-[#1C1F33] px-8 py-4 rounded-full font-semibold hover:bg-[#eac92b] transition-all duration-300 shadow-lg"
          >
            Start Now!
          </button>
        </section>
      )}
      <Footer />
    </div>
  );
};

export default Home;
