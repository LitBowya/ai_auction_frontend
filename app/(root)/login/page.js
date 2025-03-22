"use client";

import { useState } from "react";
import { toast } from "sonner";
import useApi from "@/hooks/useApi";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { login } from "@/store/slices/authSlice";

const LoginPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { sendRequest: loginUser, loading } = useApi("/auth/login", "POST");

  // State for form fields
  const [formData, setFormData] = useState({
  email: "",
    password: "",
  });

  const [error, setError] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null); // Clear error when user starts typing
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page refresh
    setError(null); // Clear previous error

    if (!formData.email || !formData.password) {
      setError("Email and password are required.");
      toast.error("Email and password are required.");
      return;
    }

    try {
      const response = await loginUser(formData);

      if (response?.error) {
        setError(response.error);
        toast.error(response.error);
        return;
      }

      dispatch(login(response.user));
      toast.success("Login successful!");
      router.push("/");

    } catch (error) {
      let errorMessage = "Invalid email or password!";
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      setError(errorMessage);
      toast.error(errorMessage);
      console.error("Login error:", error);
    }
  };

  return (
    <div className="h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl overflow-hidden w-full max-w-md">
        <div className="relative">
          <Image
            src="/artbid.png"
            alt="Login"
            width={400}
            height={200}
            className="w-full h-48 object-contain"
          />
        </div>
        <div className="p-6">
          <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              required
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              required
            />
            <div className="flex justify-end">
              <Link
                className="text-sm text-blue-500 hover:underline"
                href="/forgot-password"
              >
                Forgot Password?
              </Link>
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded shadow-md transition-colors duration-200"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
          <p className="mt-6 text-center text-sm">
            New here?{" "}
            <Link
              className="text-blue-500 hover:underline font-medium"
              href="/register"
            >
              Register now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
