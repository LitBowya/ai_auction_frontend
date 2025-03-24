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
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  // Fetch summary data for cards
  const {
    data: summaryData,
    loading: summaryLoading,
    error: summaryError,
  } = useApi("/auction/insights", "GET");

  // Fetch all auctions with pagination and status filter
  const { data, loading, error, refetch } = useApi(
    `/auction/all?page=1&status=${statusFilter}`,
    "GET"
  );

  // Handle modal open/close
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  // Handle loading and error states
  if (loading || summaryLoading) {
    return <Spinner />;
  }

  if (error || summaryError) {
    return <Error />;
  }

  if (!data || !summaryData) {
    return <Error />;
  }

  return (
    <div className="max_width">
      <h1 className="text-2xl font-bold mb-2">Auction Monitoring</h1>
      <AuctionInsights data={summaryData} />
      <div className={`justify-end flex items-center`}>
        {/* Create Auction Button */}
        <Button
          variant={`primary`}
          text={`Create Auction`}
          onClick={handleOpenModal}
          icon={<FaPlus />}
        />
      </div>
      <AuctionTable
        auctions={data?.data || []}
        pagination={data?.pagination || 1}
        refetch={refetch}
      />
      <CreateAuctionModal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        refetch={refetch}
      />
    </div>
  );
}
