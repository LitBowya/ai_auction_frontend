"use client"; // ✅ Mark Navbar as a Client Component

import Link from "next/link";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "sonner";
import {useRouter} from "next/navigation";
import React, {useState} from "react";
import {logout} from "@/store/slices/authSlice";
import Button from "./Button";
import Image from "next/image";
import {FaBars, FaTimes, FaUser} from "react-icons/fa"; // Import icons from react-icons

export default function Navbar() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to manage menu visibility

  const handleLogout = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/logout`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (!res.ok) throw new Error("Logout failed");

      dispatch(logout()); // ✅ Remove user from Redux store
      toast.success("Logged Out Successfully");
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle menu visibility
  };

  return (
    <nav className="bg-gray-900">
      <div className="text-white p-4 flex justify-between items-center max_width">
        {/* Logo */}
        <Link href="/">
          <Image
            src="../public/artbid.png"
            width={70}
            height={70}
            alt="Logo"
            className="rounded-full w-[50px] h-[50px]"
          />
        </Link>

        {/* Hamburger Menu (Mobile) */}
        <div className="md:hidden flex items-center space-x-4">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
          {user && (
              <Link href={`/profile/${user._id}`}>
                {user.profileImage ? (
                    <Image
                        src={user?.profileImage || null} // Remove `url()`
                        width={50}
                        height={50}
                        alt={user?.name || "Profile Image"}
                        className="rounded-full w-[50px] h-[50px]"
                    />
                ) : (
                    <>Null</>
                )}
              </Link>
          )}
        </div>

        {/* Navigation Links (Desktop) */}
        <div className="hidden md:flex space-x-4">
          <Link
            href="/auction"
            className="font-semibold text-lg transition-all hover:text-gray-300"
          >
            Auctions
          </Link>
          <Link
            href="/about"
            className="font-semibold text-lg transition-all hover:text-gray-300"
          >
            About Us
          </Link>
          <Link
            href="/contact"
            className="font-semibold text-lg transition-all hover:text-gray-300"
          >
            Contact Us
          </Link>
        </div>

        {/* Login/Logout Button (Desktop) */}
        <div className="hidden md:flex space-x-4 items-center">
          {user ? (
            <>
              <Button onClick={handleLogout} variant="danger" text="Logout" />
              <Link href={`/profile/${user._id}`}>
                {user.profileImage ? (
                  <Image
                    src={user?.profileImage || null} // Remove `url()`
                    width={50}
                    height={50}
                    alt={user?.name || "Profile Image"}
                    className="rounded-full w-[50px] h-[50px]"
                  />
                ) : (
                  <>Null</>
                )}
              </Link>
              {user?.isAdmin && (
                  <Link className={`text-white`} href={`/dashboard`}>
                    <FaUser className={`text-2xl`}/>
                  </Link>
              )}
            </>
          ) : (
            <Link href="/login">
              <Button
                text="Login"
                variant="success"
                className="transition-colors duration-150 hover:bg-green-300 cursor-pointer"
              />
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Menu (Dropdown) */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-800 p-4">
          <div className="flex flex-col space-y-4">
            <Link
              href="/auction"
              className="font-semibold text-lg transition-all hover:text-gray-300"
              onClick={toggleMenu}
            >
              Auctions
            </Link>
            <Link
              href="/about"
              className="font-semibold text-lg transition-all hover:text-gray-300"
              onClick={toggleMenu}
            >
              About Us
            </Link>
            <Link
              href="/contact"
              className="font-semibold text-lg transition-all hover:text-gray-300"
              onClick={toggleMenu}
            >
              Contact Us
            </Link>
            {!user && (
              <Link href="/login">
                <Button
                  text="Login"
                  variant="success"
                  className="w-full text-center"
                  onClick={toggleMenu}
                />
              </Link>
            )}
          </div>
        </div>
      )}


    </nav>
  );
}
