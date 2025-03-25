"use client";

import React from "react";
import useApi from "@/hooks/useApi";
import AuditTable from "./AuditTable";
import Error from "@/components/Error";
import Spinner from "@/components/Spinner";

export default function Audits() {
  // Using the new useApi hook with automatic GET request
  const { 
    data, 
    loading, 
    error, 
    fetchData: fetchAudits 
  } = useApi("/audits");

  // Handle loading state
  if (loading) {
    return (
      <div className="max_width p-8 flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  // Handle error state with retry option
  if (error) {
    return (
      <div className="max_width p-8 flex flex-col justify-center items-center">
        <Error 
          message={error.message || "Failed to load audit logs"}
          onRetry={fetchAudits}
        />
      </div>
    );
  }

  // Handle empty data state
  if (!data?.data) {
    return (
      <div className="max_width p-8 flex flex-col justify-center items-center">
        <p className="text-gray-500 text-lg mb-4">
          No audit logs available
        </p>
        <button
          onClick={fetchAudits}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="max_width p-8">
      <h1 className="text-2xl font-bold mb-6">Audit Logs</h1>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <AuditTable 
          audits={data.data} 
          refetch={fetchAudits} 
        />
      </div>
    </div>
  );
}