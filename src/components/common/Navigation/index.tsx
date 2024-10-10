import { useNavigate } from "react-router-dom";

const Navigation = () => {
  const navigate = useNavigate();
  return (
    <nav className="flex justify-between items-center p-6 md:px-12">
      <div
        className="text-white text-2xl font-semibold"
        onClick={() => navigate("/")}
      >
        Quizer
      </div>
      <div className="hidden md:flex space-x-6 text-gray-300">
        <button className="hover:text-white transition-colors">Category</button>
        <button className="hover:text-white transition-colors">
          Leaderboard
        </button>
      </div>
    </nav>
  );
};

export default Navigation;
