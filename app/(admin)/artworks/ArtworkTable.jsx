"use client";

import React from "react";
import useApi from "@/hooks/useApi";
import { FaTrash } from "react-icons/fa";
import { toast } from "sonner";

const ArtworkTable = ({ artworks, refetch }) => {
  // Using the new deleteData method from useApi
  const { deleteData: deleteArtwork, loading: deletingArtwork } = useApi("/artworks");

  const handleDeleteArtwork = async (id) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this artwork?");
      if (!confirmDelete) return;

      await deleteArtwork({id:id});
      
      refetch();
      toast.success("Artwork deleted successfully");
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || "Failed to delete artwork";
      toast.error(errorMsg);
      console.error("Error deleting artwork:", errorMsg);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Title
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Category
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {artworks.map((artwork) => (
            <tr key={artwork._id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {artwork.title}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {artwork.category?.name || "Uncategorized"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  onClick={() => handleDeleteArtwork(artwork._id)}
                  disabled={deletingArtwork}
                  className="text-red-500 hover:text-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Delete artwork"
                >
                  <FaTrash className="text-lg" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ArtworkTable;