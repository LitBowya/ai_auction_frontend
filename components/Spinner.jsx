import React from "react";

const Spinner = () => {
  return (
    <div className="flex justify-center items-center w-full">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
    </div>
  );
};

export default Spinner;