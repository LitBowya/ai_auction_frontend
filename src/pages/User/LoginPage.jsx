// LoginPage.jsx
import { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { useLoginUserMutation } from '../../redux/services/authApi';
import Spinner from '../../components/Spinner';
import InputField from '../../components/InputField';
import { Button } from '../../components/Button';
import {toast} from 'react-toastify'
import { setUser } from "../../redux/slices/authSlice.js";
import {useDispatch} from "react-redux";

export const LoginPage = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(formData).unwrap();
      toast.success('User logged in successfully');
      dispatch(setUser({ user: res.user, token: res.token }));
      navigate('/');
    } catch (error) {
      toast.error(error.data?.message || 'Login failed');
      console.error(error.data?.message || 'Login failed');
    }
  };

  return (
    <div className={`bg-primary py-24 lg:py-36`}>
      <div className="max-w-md mx-auto p-6 bg-secondary rounded-xl">
        <h2 className="heading-3 font-bold text-heading mb-8 text-end">Sign In</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
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

          <div className={`flex justify-end`}>
            <Link to={'/forgot-password'} className={`text-primary cursor-pointer hover:underline`}>Forgot Password</Link>
          </div>

          <Button type="submit" className="w-full bg-primary text-secondary cursor-pointer" disabled={isLoading}>
            {isLoading ? <Spinner color="#ffd100"  /> : 'Login'}
          </Button>
        </form>
        <div className="mt-6 flex items-center justify-between">
          <p>New Here?</p>
          <Link to="/register">Register Now</Link>
        </div>
      </div>
    </div>
  );
};
