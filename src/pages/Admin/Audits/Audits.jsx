
import React from "react";
import AuditTable from "./AuditTable";
import useApi from "../../../hooks/useApi.js";
import Spinner from "../../../components/Spinner.jsx";
import ErrorMessage from "../../../components/ErrorMessage.jsx";

export default function Audits() {
  // Using the new useApi hook with automatic GET request
  const { 
    data, 
    loading, 
    error, 
    fetchData: fetchAudits 
  } = useApi("/Audits");

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
        <ErrorMessage
          message={error.message || "Failed to load audit logs"}
        />
      </div>
    );
  }

  return (
    <div className="max-width bg-gray-100 rounded-lg p-8">
      <h1 className="text-2xl font-bold mb-6">Audit Logs</h1>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <AuditTable 
          audits={data?.data || []} 
          refetch={fetchAudits} 
        />
      </div>
    </div>
  );
}
