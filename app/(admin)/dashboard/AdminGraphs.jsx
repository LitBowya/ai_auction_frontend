import React from "react";
import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

const AdminGraphs = ({ data }) => {
    const {
        userGrowth = [],
        activeAuctionsOverTime = [],
        completedAuctionsOverTime = [],
        earningsOverTime = [],
    } = data || {};

    return (
        <div>
            <h1 className="text-xl text-end font-bold mt-10 mb-6">Admin Graphs</h1>

            {/* User Growth Chart (Line Chart) */}
            <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">User Growth</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={userGrowth}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="_id" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="count" stroke="#3b82f6" />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* Active Auctions Chart (Bar Chart) */}
            <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">
                    Active Auctions Over Time
                </h2>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={activeAuctionsOverTime}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="_id" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="count" fill="#10b981" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Completed Auctions Chart (Area Chart) */}
            <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">
                    Completed Auctions Over Time
                </h2>
                <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={completedAuctionsOverTime}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="_id" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Area type="monotone" dataKey="count" stroke="#ef4444" fill="#fecaca" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

        </div>
    );
};

export default AdminGraphs;
