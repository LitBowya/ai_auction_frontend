'use client'

import { useSelector } from "react-redux";

/**
 * Custom hook to check authentication status.
 * @returns {object} { user, isAuthenticated }
 */
const useAuth = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  return { user, isAuthenticated };
};

export default useAuth;