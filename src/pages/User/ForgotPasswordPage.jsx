// ForgotPasswordPage.jsx
import { useState } from "react";
import {
  useRequestPasswordResetMutation,
  useResetPasswordMutation,
} from "../../redux/services/authApi";
import Spinner from "../../components/Spinner";
import InputField from "../../components/InputField";
import { Button } from "../../components/Button";
import Modal from "../../components/Modal";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

export const ForgotPasswordPage = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetData, setResetData] = useState({
    email: "",
    otp: "",
    newPassword: "",
  });
  const [requestReset, { isLoading }] = useRequestPasswordResetMutation();
  const [resetPassword] = useResetPasswordMutation();

  const handleRequestReset = async (e) => {
    e.preventDefault();
    try {
      await requestReset({ email }).unwrap();
      setResetData({ ...resetData, email });
      setShowResetModal(true);
    } catch (error) {
      console.error(error.data?.message || "Password reset request failed");
      toast.error(error.data?.message || "Password reset request failed");
    }
  };

  const handlePasswordReset = async () => {
    try {
      await resetPassword(resetData).unwrap();
      setShowResetModal(false);
      toast.success("Password reset successful! Please login.");
      navigate("/login");
    } catch (error) {
      console.error(error.data?.message || "Password reset failed");
      toast.error(error.data?.message || "Password reset failed");
    }
  };

  return (
    <div className={`bg-primary py-24 lg:py-36`}>
      <div className="max-w-md mx-auto p-6 bg-secondary rounded-xl mt-20">
        <h2 className="heading-3 text-heading mb-8 font-bold text-end">
          Forgot Password
        </h2>
        <form onSubmit={handleRequestReset} className="space-y-6">
          <InputField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={`border border-gray-950`}
          />
          <Button type="submit" className="w-full bg-primary text-secondary cursor-pointer" disabled={isLoading}>
            {isLoading ? <Spinner color="#ffd100" /> : 'Reset Password'}
          </Button>
        </form>

        <Modal isOpen={showResetModal} onClose={() => setShowResetModal(false)}>
          <div className="p-6 space-y-4">
            <h3 className="heading-4 text-heading">Reset Password</h3>
            <InputField
                label="OTP Code"
                value={resetData.otp}
                onChange={(e) =>
                    setResetData({ ...resetData, otp: e.target.value })
                }
            />
            <InputField
                label="New Password"
                type="password"
                value={resetData.newPassword}
                onChange={(e) =>
                    setResetData({ ...resetData, newPassword: e.target.value })
                }
            />
            <Button onClick={handlePasswordReset} className="w-full bg-primary text-secondary">
              {isLoading ? <Spinner color="#ffd100" /> : 'Reset Password'}
            </Button>
          </div>
        </Modal>
      </div>
    </div>
  );
};
