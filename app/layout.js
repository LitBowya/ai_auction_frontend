import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

import ReduxProvider from "@/providers/ReduxProvider";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "ArtBid",
  description: "Auction Art Center",
  image: "/artbid.png",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReduxProvider>
          
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
