"use client";

import React from "react";
import useApi from "@/hooks/useApi";
import Spinner from "@/components/Spinner";
import Error from "@/components/Error";
import PaymentInsights from "./PaymentInsights";
import PaymentTable from "./PaymentTable";

export default function Payment() {
  // Using the new useApi hook with automatic GET request
  const { 
    data: summaryData, 
    loading: summaryLoading, 
    error: summaryError,
    fetchData: fetchPayments 
  } = useApi("/payments");

  // Handle loading state
  if (summaryLoading) {
    return (
      <div className="max-w-screen-xl mx-auto p-8 flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  // Handle error state with retry option
  if (summaryError) {
    return (
      <div className="max-w-screen-xl mx-auto p-8 flex flex-col justify-center items-center">
        <Error 
          message={summaryError.message || "Failed to load payment data"}
          onRetry={fetchPayments}
        />
      </div>
    );
  }

  // Handle empty data state
  if (!summaryData?.payments) {
    return (
      <div className="max-w-screen-xl mx-auto p-8 flex flex-col justify-center items-center">
        <p className="text-gray-500 text-lg mb-4">
          No payment data available
        </p>
        <button
          onClick={fetchPayments}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Payment Monitoring</h1>
      
      <div className="mb-8">
        <PaymentInsights data={summaryData.payments} />
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <PaymentTable 
          payments={summaryData.payments} 
          refetch={fetchPayments} 
        />
      </div>
    </div>
  );
}