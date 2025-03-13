"use client";

import { useForm } from "react-hook-form";
import { toast } from "sonner";
import useApi from "@/hooks/useApi";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useDispatch } from "react-redux";
import { login } from "@/store/slices/authSlice";

const LoginPage = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, setError, clearErrors } = useForm();
  const { sendRequest: loginUser, loading } = useApi("/auth/login", "POST");
  const router = useRouter();

  const onSubmit = async (data) => {
    // Clear any previous errors from react-hook-form
    clearErrors();
    try {
      const response = await loginUser(data);
      // Optionally, do additional checks on response data if needed
      if (response?.error) {
        // In case the API returns a custom error
        setError("apiError", { message: response.error });
        toast.error(response.error);
      } else {
        dispatch(login(response.user))
        toast.success("Login successful!");
        router.push("/"); // Redirect after login
      }
    } catch (error) {
      // Determine error message from the error object
      let errorMessage = "Invalid email or password!";
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }
      // Set error with react-hook-form (optional)
      setError("apiError", { message: errorMessage });
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
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <input
              {...register("email", { required: "Email is required" })}
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              required
            />
            <input
              {...register("password", { required: "Password is required" })}
              type="password"
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
