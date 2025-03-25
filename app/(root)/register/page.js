"use client";

import { useState, useRef } from "react";
import { toast } from "sonner";
import ReactModal from "react-modal";
import useApi from "@/hooks/useApi";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

ReactModal.setAppElement("body");

const RegisterPage = () => {
  const router = useRouter();
  const { postData: registerUser, loading: registerLoading } = useApi("/auth/register");
  const { postData: verifyOtp, loading: verifyLoading } = useApi("/auth/verify-otp");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const parseError = (error) => {
    return error?.response?.data?.message || error?.message || "An error occurred. Please try again.";
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }
      if (profileImage instanceof File) {
        formDataToSend.append("profileImage", profileImage);
      }

      await registerUser(formDataToSend);

      toast.success("OTP sent to email!");
      setEmail(formData.email);
      setIsModalOpen(true);
      setFormData({ name: "", email: "", password: "", phone: "", address: "" });
      setProfileImage(null);
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
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

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Upload Profile
              </label>
              <input
                type="file"
                name="profileImage"
                accept="image/*"
                onChange={handleImageChange}
                ref={fileInputRef}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {imagePreview && (
                <div className="mt-2">
                  <Image
                    src={imagePreview}
                    alt="Profile preview"
                    width={100}
                    height={100}
                    className="rounded-full w-20 h-20 object-cover"
                  />
                </div>
              )}
            </div>

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

      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        className="bg-white p-6 rounded-lg shadow-xl max-w-sm mx-auto mt-20 outline-none"
        overlayClassName="fixed inset-0 bg-black/50 bg-opacity-10 flex items-center justify-center"
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