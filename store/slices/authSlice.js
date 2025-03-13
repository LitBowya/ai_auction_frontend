import { createSlice } from "@reduxjs/toolkit";

// Load user from local storage (if exists)
const loadUser = () => {
  if (typeof window !== "undefined") {
    return JSON.parse(localStorage.getItem("user")) || null;
  }
  return null;
};

const initialState = {
  user: loadUser(), // Store logged-in user
  isAuthenticated: !!loadUser(), // Boolean: is user logged in?
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("user");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
