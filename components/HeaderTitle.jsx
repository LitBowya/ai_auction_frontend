import React from "react";

const HeaderTitle = ({first, second}) => {
  return (
    <h2 className="max-md:text-2xl lg:text-3xl font-bold text-gray-900">
      {first && first} <span className="text-red-500">{second && second}</span>
    </h2>
  );
};

export default HeaderTitle;
