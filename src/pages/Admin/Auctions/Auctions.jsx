

import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import CreateAuctionModal from "./CreateAuctionModal";
import useApi from "../../../hooks/useApi.js";
import Spinner from "../../../components/Spinner.jsx";
import ErrorMessage from "../../../components/ErrorMessage.jsx";
import {Button} from "../../../components/Button.jsx";
import AuctionInsights from "./AuctionInsights.jsx";
import AuctionTable from "./AuctionTable.jsx";

export default function Auctions() {
  const [statusFilter, setStatusFilter] = useState("all"); // 'all', 'upcoming', 'active', 'completed'
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch summary data using new hook
  const { 
    data: summaryData, 
    loading: summaryLoading, 
    error: summaryError,
    fetchData: fetchSummaryData
  } = useApi("/Auctions/insights");

  // Fetch Auctions data with new hook
  const { 
    data, 
    loading, 
    error, 
    fetchData: fetchAuctions 
  } = useApi(`/auctions?page=1&status=${statusFilter}`);

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
        <ErrorMessage
          message={error?.message || summaryError?.message || "Failed to load auction data"}
        />
      </div>
    );
  }

  return (
    <div className="max-width bg-gray-100 rounded-lg p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Auction Monitoring</h1>

          <Button onClick={handleOpenModal}
                  icon={<FaPlus />} className={`bg-primary text-secondary`}>
              Create Auction
          </Button>
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
