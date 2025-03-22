"use client";

import { useState } from "react";
import { toast } from "sonner";
import ReactModal from "react-modal";
import useApi from "@/hooks/useApi";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

ReactModal.setAppElement("body");

const RegisterPage = () => {
  const router = useRouter();
  const { sendRequest: registerUser, loading: registerLoading } = useApi("/auth/register", "POST");
  const { sendRequest: verifyOtp, loading: verifyLoading } = useApi("/auth/verify-otp", "POST");

  const [formData, setFormData] = useState({ name: "", email: "", password: "", phone: "", address: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const parseError = (error) => {
    return error?.response?.data?.message || error?.message || "An error occurred. Please try again.";
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(formData);
      toast.success("OTP sent to email!");
      setEmail(formData.email);
      setIsModalOpen(true);
      setFormData({ name: "", email: "", password: "", phone: "", address: "" });
    } catch (error) {
      toast.error(parseError(error));
      console.error("Registration error:", error);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      await verifyOtp({ email, otp });
      toast.success("Email verified successfully!");
      setIsModalOpen(false);
      router.push("/login");
    } catch (error) {
      toast.error(parseError(error));
      console.error("OTP verification error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl overflow-hidden w-full max-w-md">
        <div className="relative">
          <Image src="/artbid.png" alt="Register" width={400} height={200} className="w-full h-48 object-contain" />
        </div>
        <div className="p-6">
          <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
          <form onSubmit={onSubmit} className="space-y-4">
            {Object.keys(formData).map((key) => (
              <input
                key={key}
                name={key}
                type={key === "email" ? "email" : key === "password" ? "password" : "text"}
                placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                value={formData[key]}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                required
              />
            ))}
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded shadow-md transition-colors duration-200"
              disabled={registerLoading}
            >
              {registerLoading ? "Registering..." : "Register"}
            </button>
          </form>
          <p className="mt-6 text-center text-sm">
            Already have an account? <Link className="text-blue-500 hover:underline font-medium" href="/login">Login here</Link>
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
