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
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  // Fetch total number of artworks
  const {
    data: totalArtworks,
    loading: summaryLoading,
    error: summaryError,
    refetch,
  } = useApi("/artworks", "GET");

  // Handle modal open/close
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  // Handle loading and error states
  if (summaryLoading) {
    return <Spinner />;
  }

  if (summaryError) {
    return <Error />;
  }

  if (!totalArtworks) {
    return <Error />;
  }

  console.log(totalArtworks)

  return (
    <div className="max_width">
      <h1 className="text-2xl font-bold mb-2">Artwork Monitoring</h1>
      <ArtworkInsights data={totalArtworks.artworks} />
      <div className={`justify-end flex items-center`}>
        {/* Create Artwork Button */}
        <Button
          variant={`primary`}
          text={`Create Artwork`}
          onClick={handleOpenModal}
          icon={<FaPlus />}
        />
        <CreateArtworkModal
          isOpen={isModalOpen}
          onRequestClose={handleCloseModal}
          refetch={refetch}
        />

        
      </div>

      {/* Artwork Table */}
      <ArtworkTable
          artworks={totalArtworks.artworks || []}
          refetch={refetch}
        />
    </div>
  );
}
