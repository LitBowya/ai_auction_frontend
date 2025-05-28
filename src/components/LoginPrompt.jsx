// components/LoginPrompt.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { FaLock } from "react-icons/fa";

const LoginPrompt = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-md mx-auto text-center flex flex-col items-center space-y-4 border border-gray-200">
      <FaLock className="text-4xl text-red-500" />
      <h2 className="text-xl font-semibold text-gray-800">Please Log In</h2>
      <p className="text-gray-600 text-sm">
        You need to be logged in to access this feature.
      </p>
      <button
        onClick={handleLogin}
        className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition"
      >
        Go to Login
      </button>
    </div>
  );
};

export default LoginPrompt;
