import React from "react";
import {FaCheckCircle, FaDollarSign, FaGavel, FaUsers} from "react-icons/fa";
import StatCard from "../../../components/Admin/StatCard.jsx";

const AdminInsights = ({ data }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Total Users Card */}
            <StatCard
                title="Total Users"
                value={data.totalUsers}
                icon={<span className={`text-red-500`}><FaUsers /></span>}
            />

            {/* Active Auctions Card */}
            <StatCard
                title="Active Auctions"
                value={data.activeAuctions}
                icon={<span className={`text-blue-200`}><FaGavel /></span>}

            />

            {/* Completed Auctions Card */}
            <StatCard
                title="Completed Auctions"
                value={data.completedAuctions}
                icon={<span className={`text-orange-500`}><FaCheckCircle /></span>}

            />
        </div>
    );
};

export default AdminInsights;
