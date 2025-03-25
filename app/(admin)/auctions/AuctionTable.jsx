"use client";

import React from "react";
import useApi from "@/hooks/useApi";
import { FaStop, FaTrash } from "react-icons/fa";

const AuctionTable = ({ auctions, pagination, refetch }) => {
  // Using specific methods from the new hook
  const { postData: endAuction, loading: endingAuction } = useApi("/auctions");
  const { deleteData: deleteAuction, loading: deletingAuction } = useApi("/auctions");

  const handleEndAuction = async (id) => {
    try {
      await endAuction(null, { 
        params: { id },
        endpoint: `${id}/end` 
      });
      refetch();
    } catch (error) {
      console.error("Error ending auction:", error.message);
    }
  };

  const handleDeleteAuction = async (id) => {
    try {
      await deleteAuction({id:id});
      refetch();
    } catch (error) {
      console.error("Error deleting auction:", error.message);
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
                <button
                  onClick={() => handleEndAuction(auction._id)}
                  disabled={endingAuction}
                  className="text-red-500 text-lg cursor-pointer hover:text-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FaStop />
                </button>

                <button
                  onClick={() => handleDeleteAuction(auction._id)}
                  disabled={deletingAuction}
                  className="text-red-500 text-lg cursor-pointer hover:text-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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
    </div>
  );
};

export default AuctionTable;