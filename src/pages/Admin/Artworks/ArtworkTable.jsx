

import React, {useState} from "react";
import { FaTrash } from "react-icons/fa";
import { FaRegImage } from "react-icons/fa6";
import useApi from "../../../hooks/useApi.js";
import {toast} from "react-toastify";
import Modal from "../../../components/Modal.jsx";
import EmptyState from "../../../components/EmptyState.jsx";

const ArtworkTable = ({ artworks, refetch }) => {
  // Using the new deleteData method from useApi
  const { deleteData: deleteArtwork, loading: deletingArtwork } =
    useApi("/artworks");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const openDeleteModal = (id) => {
    setSelectedId(id);
    setIsModalOpen(true);
  };

  const closeDeleteModal = () => {
    setSelectedId(null);
    setIsModalOpen(false);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteArtwork({ id: selectedId });
      refetch();
      toast.success("Artwork deleted successfully");
    } catch (error) {
      const errorMsg =
          error.response?.data?.message ||
          error.message ||
          "Failed to delete artwork";
      toast.error(errorMsg);
      console.error("Error deleting artwork:", errorMsg);
    } finally {
      closeDeleteModal();
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      {!artworks.length ? (<EmptyState title={`No artworks found`} message={`Start by creating some artworks`}/>) : (<table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Image
          </th>
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
                {
                  artwork && artwork.imageUrl[0].url ? <img src={artwork?.imageUrl[0].url} width={75} height={75} alt={artwork.title} className="w-[75px] h-[75px] rounded-full"/> : <FaRegImage />
                }
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {artwork.title}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {artwork.category?.name || "Uncategorized"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button onClick={() => openDeleteModal(artwork._id)}
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
      </table>)}

      <Modal isOpen={isModalOpen} onClose={closeDeleteModal}>
        <h2 className="text-lg font-semibold mb-4">
          Are you sure you want to delete this artwork?
        </h2>
        <div className="flex justify-end gap-4 mt-6">
          <button
              onClick={closeDeleteModal}
              className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
              onClick={handleConfirmDelete}
              className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default ArtworkTable;
