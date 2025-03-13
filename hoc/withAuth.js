"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";

const withAuth = (Component) => {
  return function ProtectedRoute(props) {
    const { isAuthenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!isAuthenticated) {
        router.push("/login");
      }
    }, [isAuthenticated, router]);

    return isAuthenticated ? <Component {...props} /> : null;
  };
};

export default withAuth;
