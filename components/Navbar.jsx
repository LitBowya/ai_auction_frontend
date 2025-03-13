"use client";  // ✅ Mark Navbar as a Client Component

import Link from "next/link";
import { useSelector } from "react-redux";
import dynamic from "next/dynamic";
import Button from "./Button";

// ✅ Dynamically load the LogoutButton only on the client
const LogoutButton = dynamic(() => import("./LogoutButton"), { ssr: false });

export default function Navbar() {
  // ✅ Use Redux to check if the user is authenticated
  const user = useSelector((state) => state.auth.user);

  return (
    <nav className="bg-gray-900">
      <div className="text-white p-4 flex justify-between items-center max_width">
        <Link href="/" className="text-2xl font-bold">
          ArtBid
        </Link>

        <div className="space-x-4">
          <Link href="/auction">Auctions</Link>
          <Link href="/artwork">Artworks</Link>
        </div>

        <div className="flex space-x-4 items-center">
          {user ? (
            <>
              <LogoutButton />
              <Link href="/profile">
                <span className="cursor-pointer">Profile</span>
              </Link>
            </>
          ) : (
            <Link href="/login">
              <Button text='Login' className="bg-green-500 cursor-pointer"/>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
