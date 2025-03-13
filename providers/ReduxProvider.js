'use client';  // ✅ Fix: Convert to a Client Component

import { Provider } from "react-redux";
import store from "@/store/store";

const ReduxProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
