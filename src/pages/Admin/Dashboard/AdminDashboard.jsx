

import React from "react";
import useApi from "../../../hooks/useApi.js";
import Spinner from "../../../components/Spinner.jsx";
import ErrorMessage from "../../../components/ErrorMessage.jsx";
import AdminInsights from "./AdminInsights.jsx";
import AdminGraphs from "./AdminGraphs.jsx";


export default function AdminDashboard() {
    // Use the new useApi hook to fetch admin data
    const { 
        data: countData, 
        loading: countLoading, 
        error: countError,
        fetchData: fetchCountData
    } = useApi("/admin");
    
    const { 
        data: graphData, 
        loading: graphLoading, 
        error: graphError,
        fetchData: fetchGraphData 
    } = useApi("/admin/insights");

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
                <ErrorMessage
                    message={countError?.message || graphError?.message || "Failed to load Dashboard data"}
                />
            </div>
        );
    }

    // Validate data before passing it to components
    if (!countData || Object.keys(countData).length === 0 || 
        !graphData || Object.keys(graphData).length === 0) {
        return (
            <div className="max-w-screen-xl mx-auto p-8 bg-gray-100 flex justify-center items-center">
                <p className="text-red-500 text-lg font-semibold">
                    No data available for the dashboard.
                </p>
                <button 
                    onClick={() => {
                        fetchCountData();
                        fetchGraphData();
                    }}
                    className="ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="max-width bg-gray-100 rounded-lg p-8">
            <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
            
            {/* Pass data to components */}
            <div className="mb-8">
                <AdminInsights data={countData} />
            </div>
            
            <div className="">
                <AdminGraphs data={graphData} />
            </div>
        </div>
    );
}
