import React from "react";
import Link from "next/link";

const LoginPrompt = ({
  message = "You need to log in to access this page.",
}) => {


  return (
    <div className="mt-4 p-6 bg-blue-50 border border-blue-300 rounded-lg text-center">
      <p className="text-lg text-blue-700 font-semibold">
        You need to <span className="font-bold">log in</span> to place a bid.
      </p>
      <Link
        href="/login"
        className="inline-block mt-3 px-5 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200"
      >
        Login to Bid
      </Link>
    </div>
  );
};

export default LoginPrompt;
