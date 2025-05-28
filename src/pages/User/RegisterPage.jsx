// RegisterPage.jsx
import { useState } from 'react';
import { useRegisterUserMutation, useVerifyUserOTPMutation } from '../../redux/services/authApi';
import Spinner from '../../components/Spinner';
import InputField from '../../components/InputField';
import { Button } from '../../components/Button';
import Modal from '../../components/Modal';
import {toast} from 'react-toastify'
import {Link, useNavigate} from "react-router-dom";

export const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    profileImage: null,
  });
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [otpData, setOtpData] = useState({ email: '', otp: '' });
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const [verifyOTP] = useVerifyUserOTPMutation();

  const handleFileChange = (e) => {
    setFormData({ ...formData, profileImage: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formPayload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) formPayload.append(key, value);
    });

    try {
      await registerUser(formPayload).unwrap();
      setOtpData({ ...otpData, email: formData.email });
      setShowOTPModal(true);
    } catch (error) {
      alert(error.data?.message || 'Registration failed');
    }
  };

  const handleVerifyOTP = async () => {
    try {
      await verifyOTP(otpData).unwrap();
      setShowOTPModal(false);
      toast.success('Registration successful! Please login.');
      navigate('/login');
    } catch (error) {
      toast.error(error.data?.message || 'OTP verification failed');
      console.error(error.data?.message || 'OTP verification failed');
    }
  };

  return (
    <div className={`bg-primary py-24 lg:py-36`}>
      <div className="max-w-md mx-auto p-6 bg-surface rounded-xl bg-secondary">
        <h2 className="heading-3 text-heading mb-8 font-bold text-end">Create Account</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <InputField
              label="Full Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className={`border border-gray-950`}

          />
          <InputField
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className={`border border-gray-950`}
          />
          <InputField
              label="Password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              className={`border border-gray-950`}
          />
          <InputField
              label="Phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
              className={`border border-gray-950`}
          />
          <InputField
              label="Address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              required
              className={`border border-gray-950`}
          />
          <InputField
              label="Profile Image"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className={`border border-gray-950`}
          />
          <Button type="submit" className="w-full bg-primary text-secondary cursor-pointer" disabled={isLoading}>
            {isLoading ? <Spinner color="#ffd100" /> : 'Register'}
          </Button>
          <div className="mt-2 flex items-center justify-between">
            <p>Already Have An Account?</p>
            <Link to="/login">Login</Link>
          </div>
        </form>

        <Modal isOpen={showOTPModal} onClose={() => setShowOTPModal(false)}>
          <div className="p-6 space-y-4">
            <h3 className="heading-4 font-bold text-end text-heading">Verify OTP</h3>
            <InputField
                label="OTP Code"
                value={otpData.otp}
                onChange={(e) => setOtpData({ ...otpData, otp: e.target.value })}
                className={`border border-gray-950`}
            />
            <Button onClick={handleVerifyOTP} className="w-full bg-primary text-secondary cursor-pointer" disabled={isLoading}>
              {isLoading ? <Spinner color="#ffd100" /> : 'Verify'}
            </Button>
          </div>
        </Modal>
      </div>
    </div>
  );
};
