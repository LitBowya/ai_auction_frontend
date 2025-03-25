"use client";

import React, { useState } from "react";
import useApi from "@/hooks/useApi";
import Spinner from "@/components/Spinner";
import Error from "@/components/Error";
import AuctionInsights from "@/app/(admin)/auctions/AuctionInsights";
import Button from "@/components/Button";
import { FaPlus } from "react-icons/fa";
import AuctionTable from "@/app/(admin)/auctions/AuctionTable";
import CreateAuctionModal from "./CreateAuctionModal";

export default function Auctions() {
  const [statusFilter, setStatusFilter] = useState("all"); // 'all', 'upcoming', 'active', 'completed'
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch summary data using new hook
  const { 
    data: summaryData, 
    loading: summaryLoading, 
    error: summaryError,
    fetchData: fetchSummaryData
  } = useApi("/auctions/insights");

  // Fetch auctions data with new hook
  const { 
    data, 
    loading, 
    error, 
    fetchData: fetchAuctions 
  } = useApi(`/auctions/all?page=1&status=${statusFilter}`);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  // Handle loading state
  if (loading || summaryLoading) {
    return (
      <div className="max-w-screen-xl mx-auto p-8 bg-gray-100 flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  // Handle error state with retry option
  if (error || summaryError) {
    return (
      <div className="max-w-screen-xl mx-auto p-8 bg-gray-100 flex flex-col justify-center items-center">
        <Error 
          message={error?.message || summaryError?.message || "Failed to load auction data"}
          onRetry={() => {
            if (error) fetchAuctions();
            if (summaryError) fetchSummaryData();
          }}
        />
      </div>
    );
  }

  // Handle empty data state
  if (!data || !summaryData) {
    return (
      <div className="max-w-screen-xl mx-auto p-8 bg-gray-100 flex flex-col justify-center items-center">
        <p className="text-red-500 text-lg font-semibold mb-4">
          No auction data available
        </p>
        <Button
          variant="primary"
          text="Retry"
          onClick={() => {
            fetchSummaryData();
            fetchAuctions();
          }}
        />
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl mx-auto p-8 bg-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Auction Monitoring</h1>
        <Button
          variant="primary"
          text="Create Auction"
          onClick={handleOpenModal}
          icon={<FaPlus />}
        />
      </div>

      <div className="mb-8">
        <AuctionInsights data={summaryData} />
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <AuctionTable
          auctions={data?.data || []}
          pagination={data?.pagination || 1}
          refetch={fetchAuctions}
        />
      </div>

      <CreateAuctionModal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        refetch={fetchAuctions}
      />
    </div>
  );
}