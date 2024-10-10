import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../context/AppContext";

const Navigation = () => {
  const { currentUser, setCurrentUser } = useContext(AppContext);
  const navigate = useNavigate();
  const saveUser = localStorage.getItem("user");

  console.log("Saved user (raw):", saveUser);

  useEffect(() => {
    if (saveUser && saveUser !== "null") {
      try {
        const parsedUser = JSON.parse(saveUser);
        console.log("Parsed user:", parsedUser);

        if (parsedUser) {
          setCurrentUser(parsedUser);
        }
      } catch (e) {
        console.error("Error parsing localStorage user:", e);
      }
    }
  }, [saveUser, setCurrentUser]);

  const isLogin = (local: any) => {
    try {
      const parsedLocal = JSON.parse(local);

      return parsedLocal && typeof parsedLocal === "object";
    } catch (e) {
      return false;
    }
  };

  return (
    <nav className="flex justify-between items-center p-6 md:px-12">
      <div
        className="text-white text-2xl font-semibold cursor-pointer"
        onClick={() => navigate("/")}
      >
        Quizer
      </div>
      <div className="hidden md:flex space-x-6 text-gray-300">
        <button className="hover:text-white transition-colors">Category</button>
        <button className="hover:text-white transition-colors">
          Leaderboard
        </button>
        {isLogin(saveUser) && (
          <>
            <button className="hover:text-white transition-colors">
              Hi, {currentUser?.username}!
            </button>
            <button
              className="hover:text-white transition-colors"
              onClick={() => {
                setCurrentUser(null);
                localStorage.setItem("user", "null");
                navigate("/");
              }}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
