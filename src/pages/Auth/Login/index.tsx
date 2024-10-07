import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "react-feather";
import { Navigation, Footer } from "../../../components/common";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email:", email, "Password:", password);
    navigate("/dashboard");
  };

  const handleSignUpRedirect = () => {
    navigate("/register");
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (email) {
    localStorage.setItem("Email", email);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1C1F33] to-[#283046]">
      <Navigation />
      <div className="flex flex-col justify-center items-center py-4">
        <div className="bg-[#F4F4F8] text-[#1C1F33] rounded-xl shadow-lg p-8 max-w-md w-full md:max-w-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
            onClick={handleBack}
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
            />
          </svg>
          <h1 className="text-3xl font-bold mb-6 text-center">Welcome Back!</h1>
          <p className="text-center text-gray-600 mb-8">
            Login to continue your journey with Quizer.
          </p>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-full shadow-sm focus:ring-[#F4D03F] focus:border-[#F4D03F] transition duration-200"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
              />
            </div>
            <div className="relative">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-full shadow-sm focus:ring-[#F4D03F] focus:border-[#F4D03F] transition duration-200"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
              <span
                className="absolute right-4 top-1/2 transform-y-1/2 cursor-pointer z-20"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </span>
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-[#F4D03F] text-[#1C1F33] font-semibold py-3 rounded-full shadow-md hover:bg-[#eac92b] transition-all duration-300"
              >
                Log In
              </button>
            </div>
          </form>
          <div className="mt-4 text-center">
            <Link
              to={"/forgot-passowrd"}
              className="text-sm text-gray-600 hover:text-[#F4D03F] transition-colors"
            >
              Forgot your password?
            </Link>
          </div>
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <button
                onClick={handleSignUpRedirect}
                className="text-[#F4D03F] font-semibold hover:underline"
              >
                Sign up here
              </button>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;
