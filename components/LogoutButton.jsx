"use client";  // ✅ Mark as a Client Component

import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { logout } from "@/store/slices/authSlice"; // Import Redux logout action
import Button from "./Button";

export default function LogoutButton() {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      if (!res.ok) throw new Error("Logout failed");

      dispatch(logout());  // ✅ Remove user from Redux store
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return <Button onClick={handleLogout} text="Logout" className="bg-red-500 px-4 py-2 rounded" />;
}