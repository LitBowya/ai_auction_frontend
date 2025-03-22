"use client"; // ✅ Fix: Convert to a Client Component

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "sonner";
import store, { persistor } from "@/store/store";

const ReduxProvider = ({ children }) => {
  return (
    <Provider store={store}>
      <Toaster position="top-right" richColors />
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};

export default ReduxProvider;
