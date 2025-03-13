"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import ReactModal from "react-modal";
import useApi from "@/hooks/useApi";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

ReactModal.setAppElement("body");

const RegisterPage = () => {
  const { register, handleSubmit, reset, setError, clearErrors } = useForm();
  const router = useRouter();

  // useApi hook for register and verify OTP calls.
  const { sendRequest: registerUser, loading: registerLoading } = useApi(
    "/auth/register",
    "POST"
  );
  const { sendRequest: verifyOtp, loading: verifyLoading } = useApi(
    "/auth/verify-otp",
    "POST"
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  // Robust error parsing helper
  const parseError = (error) => {
    let errorMessage = "An error occurred. Please try again.";
    if (error?.response && error.response.data && error.response.data.message) {
      errorMessage = error.response.data.message;
    } else if (error?.message) {
      errorMessage = error.message;
    }
    return errorMessage;
  };

  // 🔹 Register User
  const onSubmit = async (data) => {
    clearErrors();
    try {
      // Attempt registration request
      await registerUser(data);
      toast.success("OTP sent to email!");
      setEmail(data.email);
      setIsModalOpen(true);
      reset();
    } catch (error) {
      const errorMessage = parseError(error);
      setError("apiError", { message: errorMessage });
      toast.error(errorMessage || "Registration failed!");
      console.error("Registration error:", error);
    }
  };

  // 🔹 Verify OTP
  const handleVerifyOtp = async () => {
    try {
      await verifyOtp({ email, otp });
      toast.success("Email verified successfully!");
      setIsModalOpen(false);
      router.push("/login");
    } catch (error) {
      const errorMessage = parseError(error);
      toast.error(errorMessage || "Invalid OTP!");
      console.error("OTP verification error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl overflow-hidden w-full max-w-md">
        <div className="relative">
          <Image
            src="/artbid.png"
            alt="Register"
            width={400}
            height={200}
            className="w-full h-48 object-contain"
          />
        </div>
        <div className="p-6">
          <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <input
              {...register("name", { required: "Full name is required" })}
              type="text"
              placeholder="Full Name"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              required
            />
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
            <input
              {...register("phone", { required: "Phone number is required" })}
              type="tel"
              placeholder="Phone Number"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              required
            />
            <input
              {...register("address", { required: "Address is required" })}
              type="text"
              placeholder="Address"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              required
            />
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded shadow-md transition-colors duration-200"
              disabled={registerLoading}
            >
              {registerLoading ? "Registering..." : "Register"}
            </button>
          </form>
          <p className="mt-6 text-center text-sm">
            Already have an account?{" "}
            <Link className="text-blue-500 hover:underline font-medium" href="/login">
              Login here
            </Link>
          </p>
        </div>
      </div>

      {/* OTP Modal */}
      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        className="bg-white p-6 rounded-lg shadow-xl max-w-sm mx-auto mt-20 outline-none"
        overlayClassName="fixed inset-0 bg-gray-100 bg-opacity-10 flex items-center justify-center"
      >
        <h2 className="text-xl font-semibold mb-4">Enter OTP</h2>
        <input
          type="text"
          placeholder="Enter OTP"
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <button
          onClick={handleVerifyOtp}
          className="w-full mt-4 py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded shadow-md transition-colors duration-200"
          disabled={verifyLoading}
        >
          {verifyLoading ? "Verifying..." : "Verify"}
        </button>
      </ReactModal>
    </div>
  );
};

export default RegisterPage;