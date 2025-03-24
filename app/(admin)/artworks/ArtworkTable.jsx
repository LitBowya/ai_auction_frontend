import React from "react";
import useApi from "@/hooks/useApi";
import { FaTrash } from "react-icons/fa";

const ArtworkTable = ({ artworks, refetch }) => {
  const { sendRequest: deleteArtwork } = useApi(`/artworks/:id`, "DELETE");

  const handleDeleteArtwork = async (id) => {
    try {
      await deleteArtwork(null, "DELETE", null, { id }); // Pass ID as a parameter
      refetch(); // Refresh data after deleting artwork
    } catch (error) {
      console.error("Error deleting artwork:", error.message);
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
                {artwork.category.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                <button
                  onClick={() => handleDeleteArtwork(artwork._id)}
                  className="text-red-500 text-lg hover:text-red-700"
                >
                  <FaTrash />
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