"use client";

import React from "react";
import useApi from "@/hooks/useApi";
import AdminInsights from "@/app/(admin)/dashboard/AdminInsights";
import Spinner from "@/components/Spinner";
import Error from "@/components/Error";
import AdminGraphs from "@/app/(admin)/dashboard/AdminGraphs";

export default function AdminDashboard() {
    // Use the useApi hook to fetch admin insights
    const { data:countData, loading:countLoading, error:countError } = useApi("/admin", "GET");
    const { data:graphData, loading:graphLoading, error:graphError } = useApi("/admin/insights", "GET");

    console.log('Data', graphData)

    // Handle loading state
    if (countLoading || graphLoading) {
        return (
            <div className="max-w-screen-xl mx-auto p-8 bg-gray-100 flex justify-center items-center">
                <Spinner />
            </div>
        );
    }

    // Handle error state
    if (countError || graphError) {
        return (
            <div className="max-w-screen-xl mx-auto p-8 bg-gray-100 flex justify-center items-center">
                <Error />
            </div>
        );
    }

    // Validate data before passing it to the AdminInsights component
    if (!countData || Object.keys(countData).length === 0) {
        return (
            <div className="max-w-screen-xl mx-auto p-8 bg-gray-100 flex justify-center items-center">
                <p className="text-red-500 text-lg font-semibold">
                    No data available for the dashboard.
                </p>
            </div>
        );
    }

    if (!graphData || Object.keys(graphData).length === 0) {
        return (
            <div className="max-w-screen-xl mx-auto p-8 bg-gray-100 flex justify-center items-center">
                <p className="text-red-500 text-lg font-semibold">
                    No data available for the dashboard.
                </p>
            </div>
        );
    }

    return (
        <div className="max_width bg-gray-100">
            <h1 className="text-2xl font-bold mb-2">Admin Dashboard</h1>
            {/* Pass validated data to the AdminInsights component */}
            <AdminInsights data={countData} />


            <AdminGraphs data={graphData} />
        </div>
    );
}
