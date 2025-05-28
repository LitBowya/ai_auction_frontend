

import React, { useState } from "react";
import ArtworkInsights from "./ArtworkInsights";
import { FaPlus } from "react-icons/fa";
import CreateArtworkModal from "./CreateArtworkModal";
import ArtworkTable from "./ArtworkTable";
import useApi from "../../../hooks/useApi.js";
import Spinner from "../../../components/Spinner.jsx";
import ErrorMessage from "../../../components/ErrorMessage.jsx";
import {Button} from "../../../components/Button.jsx";

export default function Artwork() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Using the new useApi hook with automatic GET request
  const { 
    data: totalArtworks, 
    loading: summaryLoading, 
    error: summaryError,
    fetchData: fetchArtworks
  } = useApi("/Artworks");

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  // Handle loading state
  if (summaryLoading) {
    return (
      <div className="flex justify-center">
        <Spinner />
      </div>
    );
  }

  // Handle error state with retry option
  if (summaryError) {
    return (
        <ErrorMessage
          message={summaryError.message || "Failed to load artwork data"}
        />
    );
  }

  return (
    <div className="max-width bg-gray-100 rounded-lg p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Artwork Monitoring</h1>

          <Button onClick={handleOpenModal}
                  iconLeft={<FaPlus />} className={`bg-primary text-secondary cursor-pointer`}>
              Create Artwork
          </Button>
      </div>

      <div className="mb-8">
        <ArtworkInsights data={totalArtworks?.artworks || []} />
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <ArtworkTable 
          artworks={totalArtworks?.artworks || []}
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
