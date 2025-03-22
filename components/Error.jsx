import React from "react";

const Error = ({ message = "No data available." }) => {
  return (
    <div className=" w-full">
      <div className="text-2xl font-bold text-gray-700 mb-4">Oops!</div>
      <div className="text-lg text-red-500">{message}</div>
    </div>
  );
};

export default Error;
