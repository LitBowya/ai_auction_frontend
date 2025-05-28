
import React from "react";
import PaymentInsights from "./PaymentInsights";
import PaymentTable from "./PaymentTable";
import useApi from "../../../hooks/useApi.js";
import Spinner from "../../../components/Spinner.jsx";
import ErrorMessage from "../../../components/ErrorMessage.jsx";

export default function Payment() {
  // Using the new useApi hook with automatic GET request
  const { 
    data: summaryData, 
    loading: summaryLoading, 
    error: summaryError,
    fetchData: fetchPayments 
  } = useApi("/Payments");

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
        <ErrorMessage
          message={summaryError.message || "Failed to load payment data"}
        />
      </div>
    );
  }


  return (
    <div className="max-width bg-gray-100 rounded-lg p-8">
      <h1 className="text-2xl font-bold mb-6">Payment Monitoring</h1>
      
      <div className="mb-8">
        <PaymentInsights data={summaryData?.payments || []} />
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <PaymentTable 
          payments={summaryData?.payments || []}
          refetch={fetchPayments} 
        />
      </div>
    </div>
  );
}
