

import React, {useState} from "react";
import { FaStop, FaTrash } from "react-icons/fa";
import useApi from "../../../hooks/useApi.js";
import EmptyState from "../../../components/EmptyState.jsx";
import {toast} from "react-toastify";
import Modal from "../../../components/Modal.jsx";
import {useEndAuctionMutation} from "../../../redux/services/auctionApi.js";
import Spinner from "../../../components/Spinner.jsx";

const AuctionTable = ({ auctions, pagination, refetch }) => {
  // Using specific methods from the new hook
  const { deleteData: deleteAuction, loading: deletingAuction } = useApi("/auctions");

  const [endAuctionNow, {isLoading}] = useEndAuctionMutation()

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [endModalOpen, setEndModalOpen] = useState(false);
  const [selectedDeleteId, setSelectedDeleteId] = useState(null);
  const [selectedEndId, setSelectedEndId] = useState(null);

  const openDeleteModal = (id) => {
    setSelectedDeleteId(id);
    setDeleteModalOpen(true);
  };

  const openEndAuctionModal = (id) => {
    setSelectedEndId(id);
    setEndModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setSelectedDeleteId(null);
  };

  const closeEndAuctionModal = () => {
    setEndModalOpen(false);
    setSelectedEndId(null);
  };


  const handleDeleteAuction = async () => {
    try {
      await deleteAuction({ id: selectedDeleteId });
      toast.success('Auction Deleted Successfully');
      refetch();
    } catch (error) {
      console.error("Error deleting auction:", error.message);
      toast.error("Error deleting auction:", error.message);
    } finally {
      setSelectedDeleteId(null);
      setDeleteModalOpen(false);
    }
  };

  const handleEndAuction = async () => {
    if (!selectedEndId) {
      toast.error("No auction selected to end");
      return;
    }

    try {
      await endAuctionNow(selectedEndId).unwrap();
      refetch();
      toast.success('Auction Ended Successfully');
    } catch (error) {
      console.error("Error ending auction:", error?.data?.message || error.message);
      toast.error("Error ending auction: " + (error?.data?.message || error.message));
    } finally {
      setSelectedEndId(null);
      setEndModalOpen(false);
    }
  };



  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      {!auctions.length ? (<EmptyState title={`No auctions found`} message={`Start by creating an auction`}/> ) : (<table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Title
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Status
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Actions
          </th>
        </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
        {auctions.map((auction) => (
            <tr key={auction._id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {auction.artwork.title}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        auction.status === "upcoming"
                            ? "bg-yellow-100 text-yellow-800"
                            : auction.status === "active"
                                ? "bg-green-100 text-green-800"
                                : "bg-blue-100 text-blue-800"
                    }`}
                >
                  {auction.status.charAt(0).toUpperCase() +
                      auction.status.slice(1)}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-3">
                {isLoading ? (<Spinner size={24} />) : (<button
                    onClick={() => openEndAuctionModal(auction._id)}
                    disabled={isLoading}
                    className="text-red-500 text-lg cursor-pointer hover:text-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FaStop />
                </button>)}

                {deletingAuction ? (<Spinner size={24} />) : (<button
                    onClick={() => openDeleteModal(auction._id)}
                    disabled={deletingAuction}
                    className="text-red-500 text-lg cursor-pointer hover:text-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FaTrash />
                </button>)}
              </td>
            </tr>
        ))}
        </tbody>
      </table>)}

      {/* Pagination */}
      <div className="flex justify-between items-center p-4 bg-gray-50">
        <button
          disabled={pagination.currentPage === 1}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <span className="text-gray-700">
          Page {pagination.currentPage} of {pagination.totalPages}
        </span>
        <button
          disabled={pagination.currentPage === pagination.totalPages}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>

      <Modal isOpen={deleteModalOpen} onClose={closeDeleteModal}>
        <h2 className="text-lg font-semibold mb-4">
          Are you sure you want to delete this auction?
        </h2>
        <div className="flex justify-end gap-4 mt-6">
          <button
              onClick={closeDeleteModal}
              className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
              onClick={handleDeleteAuction}
              className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </Modal>

      <Modal isOpen={endModalOpen} onClose={closeEndAuctionModal}>
        <h2 className="text-lg font-semibold mb-4">
          Are you sure you want to end this auction?
        </h2>
        <div className="flex justify-end gap-4 mt-6">
          <button
              onClick={closeEndAuctionModal}
              className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
              onClick={handleEndAuction}
              className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
          >
            End Auction
          </button>
        </div>
      </Modal>

    </div>
  );
};

export default AuctionTable;
