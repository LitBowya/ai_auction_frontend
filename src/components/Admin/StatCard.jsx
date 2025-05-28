import React from "react";

const StatCard = ({ title, value, icon }) => {
    return (
        <div className="bg-white shadow-lg rounded-lg p-6 flex items-center space-x-4">
            <div className=" text-4xl">{icon}</div>
            <div>
                <h3 className="text-md font-semibold text-gray-700">{title}</h3>
                <p className="text-xl font-bold text-blue-400">{value}</p>
            </div>
        </div>
    );
};

export default StatCard;
