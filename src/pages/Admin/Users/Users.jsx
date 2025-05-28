
import React from "react";
import UserTable from "./UserTable";
import Spinner from "../../../components/Spinner.jsx";
import ErrorMessage from "../../../components/ErrorMessage.jsx";
import useApi from "../../../hooks/useApi.js";

export default function Users() {
  // Fetch all Users
  const { data, loading, error, refetch } = useApi("/Users", "GET");

  // Handle loading and error states
  if (loading) {
    return <Spinner />
  }

  if (error) {
    return <ErrorMessage />
  }

  return (
    <div className="max-width bg-gray-100 rounded-lg p-8">
      <h1 className="text-2xl font-bold mb-2">User Management</h1>

      {/* User Table */}
      <UserTable users={data?.users || []} refetch={refetch} />
    </div>
  );
}
