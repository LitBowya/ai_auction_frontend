'use client';
import Link from "next/link";
import Button from "@/components/Button";
import { FaHome } from "react-icons/fa";

export default function Navbar({ onMenuClick }) {
    return (
        <nav className="bg-white shadow-md p-4 flex justify-between items-center">
            <button
                className="md:hidden text-gray-600 hover:text-gray-800"
                onClick={onMenuClick}
            >
                ☰ Menu
            </button>
            <h1 className="text-xl font-bold">Admin Dashboard</h1>
            
        </nav>
    );
}
