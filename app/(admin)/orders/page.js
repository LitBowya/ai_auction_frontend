"use client";

import React, { useState } from "react";
import useApi from "@/hooks/useApi";
import OrderTable from "./OrderTable";
import Spinner from "@/components/Spinner";
import Error from "@/components/Error";

export default function Orders() {
  // Fetch all orders
  const { data, loading, error, refetch } = useApi("/orders", "GET");

  // Handle loading and error states
  if (loading) {
    return <Spinner />
  }

  if (error) {
    return <Error />
  }

  return (
    <div className="max_width">
      <h1 className="text-2xl font-bold mb-5">Orders Monitoring</h1>
      {/* Order Table */}
      <OrderTable orders={data?.orders || []} refetch={refetch} />
    </div>
  );
}
