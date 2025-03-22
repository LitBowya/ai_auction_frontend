import Image from "next/image";
import Link from "next/link";
import {FaFacebook, FaInstagram, FaTwitter} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Column 1: About */}
        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-bold mb-3">About ArtBid</h3>
          <Image src={'/artbid.png'} width={100} height={50} alt="Logo" className="w-[100px] h-[50px]"/>
          <p className="text-gray-400">
            ArtBid is an online auction platform where artists and collectors can buy and sell artworks securely.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h3 className="text-lg font-bold mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link href="/about" className="text-gray-400 hover:text-white"> About Us</Link></li>
            <li><Link href="/auction" className="text-gray-400 hover:text-white">Auctions</Link></li>
            <li><Link href="/register" className="text-gray-400 hover:text-white">Register</Link></li>
            
          </ul>
        </div>

        {/* Column 3: Social Media */}
        <div>
          <h3 className="text-lg font-bold mb-3">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white">
              <FaFacebook size={24} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <FaTwitter size={24} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <FaInstagram size={24} />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-gray-500 mt-6 border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} ArtBid. All rights reserved.
      </div>
    </footer>
  );
}
