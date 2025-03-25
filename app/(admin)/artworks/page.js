"use client";

import React, { useState } from "react";
import useApi from "@/hooks/useApi";
import Spinner from "@/components/Spinner";
import Error from "@/components/Error";
import ArtworkInsights from "./ArtworkInsights";
import { FaPlus } from "react-icons/fa";
import Button from "@/components/Button";
import CreateArtworkModal from "./CreateArtworkModal";
import ArtworkTable from "./ArtworkTable";

export default function Artwork() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Using the new useApi hook with automatic GET request
  const { 
    data: totalArtworks, 
    loading: summaryLoading, 
    error: summaryError,
    fetchData: fetchArtworks
  } = useApi("/artworks");

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  // Handle loading state
  if (summaryLoading) {
    return (
      <div className="max-w-screen-xl mx-auto p-8 bg-gray-100 flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  // Handle error state with retry option
  if (summaryError) {
    return (
      <div className="max-w-screen-xl mx-auto p-8 bg-gray-100 flex flex-col justify-center items-center">
        <Error 
          message={summaryError.message || "Failed to load artwork data"}
          onRetry={fetchArtworks}
        />
      </div>
    );
  }

  // Handle empty data state
  if (!totalArtworks?.artworks) {
    return (
      <div className="max-w-screen-xl mx-auto p-8 bg-gray-100 flex flex-col justify-center items-center">
        <p className="text-red-500 text-lg font-semibold mb-4">
          No artwork data available
        </p>
        <Button
          variant="primary"
          text="Retry"
          onClick={fetchArtworks}
        />
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl mx-auto p-8 bg-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Artwork Monitoring</h1>
        <Button
          variant="primary"
          text="Create Artwork"
          onClick={handleOpenModal}
          icon={<FaPlus />}
        />
      </div>

      <div className="mb-8">
        <ArtworkInsights data={totalArtworks.artworks} />
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <ArtworkTable 
          artworks={totalArtworks.artworks} 
          refetch={fetchArtworks} 
        />
      </div>

      <CreateArtworkModal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        refetch={fetchArtworks}
      />
    </div>
  );
}