"use client";

import React, { useState } from "react";
import useApi from "@/hooks/useApi";
import Spinner from "@/components/Spinner";
import Error from "@/components/Error";
import PaymentInsights from "./PaymentInsights";
import PaymentTable from "./PaymentTable";

export default function Payment() {
  // Fetch total number of payments and earnings
  const {
    data: summaryData,
    loading: summaryLoading,
    error: summaryError,
    refetch
  } = useApi("/payments", "GET");

  console.log(summaryData);

  // Handle loading and error states
  if (summaryLoading) {
    return <Spinner />
  }

  if (summaryError) {
    return <Error />
  }

  if(!summaryData){
    return <Error />
  }

  return (
    <div className="max_width">
      <h1 className="text-2xl font-bold mb-2">Payment Monitoring</h1>
      <PaymentInsights data={summaryData.payments} />
      <PaymentTable
        payments={summaryData.payments || []}
        refetch={refetch}
      />
    </div>
  )
}
