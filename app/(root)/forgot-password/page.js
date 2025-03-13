"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "sonner";
import useApi from "@/hooks/useApi";
import ReactModal from "react-modal";
import { useRouter } from "next/navigation";
import Image from "next/image";

ReactModal.setAppElement("body");

const ForgotPasswordPage = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm();

  // Destructure loading states for each API call for clear usage
  const { sendRequest: requestOtp, loading: requestOtpLoading } = useApi(
    "/auth/forgot-password",
    "POST"
  );
  const { sendRequest: resetPassword, loading: resetPasswordLoading } = useApi(
    "/auth/reset-password",
    "POST"
  );

  const [email, setEmail] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // Helper function to extract error messages from errors
  const parseError = (error) => {
    let errorMessage = "An error occurred. Please try again.";
    // If error response exists from an API client like Axios
    if (error?.response && error.response.data && error.response.data.message) {
      errorMessage = error.response.data.message;
    } else if (error?.message) {
      errorMessage = error.message;
    }
    return errorMessage;
  };

  const handleRequestOtp = async (data) => {
    try {
      await requestOtp(data);
      toast.success("OTP sent to email!");
      setEmail(data.email);
      setIsModalOpen(true);
    } catch (error) {
      const errorMessage = parseError(error);
      toast.error(errorMessage || "Failed to send OTP!");
      console.error("OTP request error:", error);
    }
  };

  const handleResetPassword = async () => {
    try {
      await resetPassword({ email, otp, newPassword });
      setIsModalOpen(false);
      toast.success("Password reset successful! Redirecting to login...");
      router.push("/login");
    } catch (error) {
      const errorMessage = parseError(error);
      toast.error(errorMessage || "Invalid OTP or Reset Failed!");
      console.error("Password reset error:", error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen p-4 space-y-8">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        {/* Image at the top */}
        <div className="flex justify-center mb-4">
          <Image
            src="/artbid.png"
            alt="Forgot Password"
            width={400}
            height={200}
            className="object-contain"
          />
        </div>
        <h2 className="text-2xl font-bold mb-4 text-center">Forgot Password</h2>
        <form onSubmit={handleSubmit(handleRequestOtp)} className="space-y-4">
          <input
            {...register("email", { required: "Email is required" })}
            type="email"
            placeholder="Email"
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded"
            disabled={requestOtpLoading}
          >
            {requestOtpLoading ? "Requesting..." : "Request OTP"}
          </button>
        </form>
      </div>

      {/* OTP Modal */}
      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        className="bg-white p-6 rounded-lg shadow-xl max-w-sm mx-auto mt-20 outline-none"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <h2 className="text-xl font-semibold mb-4">Reset Password</h2>
        <input
          type="text"
          placeholder="Enter OTP"
          className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-3"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <input
          type="password"
          placeholder="New Password"
          className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-3"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button
          onClick={handleResetPassword}
          className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded mt-4"
          disabled={resetPasswordLoading}
        >
          {resetPasswordLoading ? "Resetting..." : "Reset Password"}
        </button>
      </ReactModal>
    </div>
  );
};

export default ForgotPasswordPage;