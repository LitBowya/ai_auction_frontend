import React from 'react'
import {FaCheckCircle, FaClock, FaPlay} from "react-icons/fa";
import StatCard from "../../../components/Admin/StatCard.jsx";

const AuctionInsights = ({data}) => {
    const { upcomingAuctions, activeAuctions, completedAuctions, totalAuctions } = data || {};
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
                title="All Auctions"
                value={totalAuctions || 0}
                icon={<FaClock className="text-orange-500" />}
            />
            <StatCard
                title="Upcoming Auctions"
                value={upcomingAuctions || 0}
                icon={<FaClock className="text-yellow-500" />}
            />
            <StatCard
                title="Active Auctions"
                value={activeAuctions || 0}
                icon={<FaPlay className="text-green-500" />}
            />
            <StatCard
                title="Completed Auctions"
                value={completedAuctions || 0}
                icon={<FaCheckCircle className="text-blue-500" />}
            />
        </div>
    )
}
export default AuctionInsights
