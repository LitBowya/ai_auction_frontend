import React from "react";
import Card from "../components/Card";
import {FaCheckCircle, FaDollarSign, FaGavel, FaUsers} from "react-icons/fa";

const AdminInsights = ({ data }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Total Users Card */}
            <Card
                title="Total Users"
                value={data.totalUsers}
                icon={<span className={`text-red-500`}><FaUsers /></span>}
            />

            {/* Active Auctions Card */}
            <Card
                title="Active Auctions"
                value={data.activeAuctions}
                icon={<span className={`text-blue-200`}><FaGavel /></span>}

            />

            {/* Completed Auctions Card */}
            <Card
                title="Completed Auctions"
                value={data.completedAuctions}
                icon={<span className={`text-orange-500`}><FaCheckCircle /></span>}

            />

            {/* Total Earnings Card */}
            <Card
                title="Total Earnings"
                value={`GHS ${data.totalEarnings}`}
                icon={<span className={`text-green-500`}><FaDollarSign /></span>}
            />
        </div>
    );
};

export default AdminInsights;
