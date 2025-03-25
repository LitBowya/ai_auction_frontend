"use client";

import React from "react";
import useApi from "@/hooks/useApi";
import UserTable from "./UserTable";
import Spinner from "@/components/Spinner";
import Error from "@/components/Error";

export default function UsersPage() {
  // Fetch all users
  const { data, loading, error, refetch } = useApi("/users", "GET");

  // Handle loading and error states
  if (loading) {
    return <Spinner />
  }

  if (error) {
    return <Error />
  }

  return (
    <div className="max_width">
      <h1 className="text-2xl font-bold mb-2">User Management</h1>

      {/* User Table */}
      <UserTable users={data?.users || []} refetch={refetch} />
    </div>
  );
}