

import React from "react";
import OrderTable from "./OrderTable";
import Spinner from "../../../components/Spinner.jsx";
import ErrorMessage from "../../../components/ErrorMessage.jsx";
import useApi from "../../../hooks/useApi.js";

export default function Orders() {
  // Fetch all Orders
  const { data, loading, error, refetch } = useApi("/orders", "GET");

  // Handle loading and error states
  if (loading) {
    return <Spinner />
  }

  if (error) {
    return <ErrorMessage />
  }

  return (
    <div className="max-width bg-gray-100 rounded-lg p-8">
      <h1 className="text-2xl font-bold mb-5">Orders Monitoring</h1>
      {/* Order Table */}
      <OrderTable orders={data?.orders || []} refetch={refetch} />
    </div>
  );
}
