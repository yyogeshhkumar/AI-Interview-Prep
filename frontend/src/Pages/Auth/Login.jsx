import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/userContext";

const Login = ({ setCurrentPage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  // Handle Login Form Submit
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter correct password");
      return;
    }

    setError(null);

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

      const token = response?.data?.token;

      if (!token) {
        setError("Login failed. Token not received.");
        return;
      }

      localStorage.setItem("token", token);
      updateUser(response.data);
      navigate("/dashboard");
    } catch (error) {
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else if (error.code === "ECONNABORTED") {
        setError("Request timed out. Please try again.");
      } else {
        setError("Unable to login. Please try again.");
      }
    }
  };

  return (
    <div
      className="w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center
                 bg-white rounded-2xl shadow-lg
                 animate-fadeInUp
                 transition-all duration-500 ease-out
                 hover:shadow-[0_20px_60px_-15px_rgba(99,102,241,0.45)]"
    >
      <h3
        className="text-xl font-semibold text-black tracking-wide
                   transition-all duration-300 hover:text-primary"
      >
        Welcome Back
      </h3>

      <p
        className="text-xs text-slate-600 mt-[6px] mb-6
                   transition-opacity duration-300 hover:opacity-90"
      >
        Please enter your details to log in
      </p>

      <form onSubmit={handleLogin}>
        {/* Email */}
        <div
          className="transition-all duration-300
                     hover:scale-[1.01]
                     focus-within:scale-[1.02]
                     focus-within:drop-shadow-[0_0_12px_rgba(99,102,241,0.45)]"
        >
          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email Address"
            placeholder="yogi@example.com"
            type="text"
          />
        </div>

        {/* Password */}
        <div
          className="transition-all duration-300 mt-2
                     hover:scale-[1.01]
                     focus-within:scale-[1.02]
                     focus-within:drop-shadow-[0_0_12px_rgba(99,102,241,0.45)]"
        >
          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            placeholder="Min 8 Characters"
            type="password"
          />
        </div>

        {/* Error */}
        {error && (
          <p
            className="text-red-500 text-xs pb-2.5 mt-2
                       animate-shake transition-all duration-300"
          >
            {error}
          </p>
        )}

        {/* Login Button */}
        <button
          type="submit"
          className="mt-4 w-full py-2 rounded-lg font-semibold text-white
                     bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
                     transition-all duration-300 ease-out
                     hover:scale-[1.03]
                     hover:shadow-[0_12px_35px_-8px_rgba(236,72,153,0.6)]
                     active:scale-[0.98]"
        >
          LOGIN
        </button>

        {/* Signup */}
        <p className="text-[13px] text-slate-800 mt-4">
          Don't have an account?{" "}
          <button
            type="button"
            className="font-medium text-primary underline
                       transition-all duration-300
                       hover:text-indigo-600
                       hover:drop-shadow-[0_0_6px_rgba(99,102,241,0.6)]
                       hover:translate-x-[2px]"
            onClick={() => setCurrentPage("signup")}
          >
            SignUp
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;
