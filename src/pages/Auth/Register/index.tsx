import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "react-feather";
import { Navigation, Footer } from "../../../components/common";
import axios from "axios";
import { BASE_URL } from "../../../lib/api";

export interface FormData {
  username: string;
  age: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    username: "",
    age: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<FormData>({
    username: "",
    age: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const validateForm = (): boolean => {
    const newErrors: FormData = {
      username: "",
      age: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    let isValid = true;
    if (!formData.username.trim()) {
      newErrors.username = "Name is required.";
      isValid = false;
    }
    if (!formData.age.trim() || isNaN(Number(formData.age))) {
      newErrors.age = "Age must be a valid number.";
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      newErrors.email = "Enter a valid email.";
      isValid = false;
    }
    if (!formData.password.trim() || formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
      isValid = false;
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (validateForm()) {
        console.log("Form data: ", formData); // Log form data before sending the request
        const response = await axios.post(`${BASE_URL}/api/register`, {
          email: formData.email,
          password: formData.password,
          username: formData.username,
          age: formData.age,
        });

        const data = response.data;
        console.log("Response data: ", data);

        if (data.status && data.status.message) {
          alert(data.status.message);
        } else {
          alert("Registration successful!");
        }

        navigate("/login");
      } else {
        console.log("Validation failed, check errors.");
      }
    } catch (error: any) {
      console.error(
        "Error response: ",
        error.response ? error.response.data : error.message
      );
      alert("An error occurred during registration. Please try again.");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBack = () => {
    navigate(-1);
  };

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
            className="size-6 cursor-pointer"
            onClick={handleBack}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
            />
          </svg>
          <h1 className="text-3xl font-bold mb-6 text-center">
            Create Account
          </h1>
          <form onSubmit={handleRegister} className="space-y-6">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                id="username"
                type="text"
                name="username"
                required
                className={`mt-1 block w-full px-4 py-3 border ${
                  errors.username ? "border-red-500" : "border-gray-300"
                } rounded-full shadow-sm focus:ring-[#F4D03F] focus:border-[#F4D03F] transition duration-200`}
                value={formData.username}
                onChange={handleInputChange}
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">{errors.username}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="age"
                className="block text-sm font-medium text-gray-700"
              >
                Age
              </label>
              <input
                id="age"
                type="number"
                name="age"
                required
                className={`mt-1 block w-full px-4 py-3 border ${
                  errors.age ? "border-red-500" : "border-gray-300"
                } rounded-full shadow-sm focus:ring-[#F4D03F] focus:border-[#F4D03F] transition duration-200`}
                value={formData.age}
                onChange={handleInputChange}
              />
              {errors.age && (
                <p className="text-red-500 text-sm mt-1">{errors.age}</p>
              )}
            </div>
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
                name="email"
                required
                className={`mt-1 block w-full px-4 py-3 border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } rounded-full shadow-sm focus:ring-[#F4D03F] focus:border-[#F4D03F] transition duration-200`}
                value={formData.email}
                onChange={handleInputChange}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
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
                name="password"
                required
                className={`mt-1 block w-full px-4 py-3 border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } rounded-full shadow-sm focus:ring-[#F4D03F] focus:border-[#F4D03F] transition duration-200`}
                value={formData.password}
                onChange={handleInputChange}
              />
              <span
                className="absolute right-4 top-1/2 transform-y-1/2 cursor-pointer z-20"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </span>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>
            <div className="relative">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                required
                className={`mt-1 block w-full px-4 py-3 border ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-300"
                } rounded-full shadow-sm focus:ring-[#F4D03F] focus:border-[#F4D03F] transition duration-200`}
                value={formData.confirmPassword}
                onChange={handleInputChange}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-[#F4D03F] text-[#1C1F33] font-semibold py-3 rounded-full shadow-md hover:bg-[#d9b43f] transition duration-200"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RegisterPage;
