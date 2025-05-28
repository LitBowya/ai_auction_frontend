import React from 'react';
import { useGetAuctionBidsQuery } from '../../../redux/services/bidApi';
import Spinner from '../../../components/Spinner';
import ErrorMessage from '../../../components/ErrorMessage';
import { FaUserCircle, FaRegClock } from 'react-icons/fa';

const BidsList = ({ auctionId }) => {
  const { data: bidsData, isLoading, error, refetch } = useGetAuctionBidsQuery(auctionId);

  if (isLoading) return <div className="my-8"><Spinner /></div>;
  if (error) return <ErrorMessage message={error?.data?.message || error?.error || 'Failed to load bids.'} />;

  const bids = bidsData?.bids || [];

  return (
    <div className="mt-8 bg-white shadow-xl rounded-lg p-6">
      <h3 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-3">Bid History</h3>
      {bids.length === 0 ? (
        <p className="text-gray-600 text-center py-4">No bids placed yet. Be the first!</p>
      ) : (
        <ul className="space-y-4 max-h-96 overflow-y-auto pr-2">
          {bids.map((bid) => (
            <li key={bid._id} className="flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 rounded-lg shadow-sm transition-colors duration-200">
              <div className="flex items-center">
                <FaUserCircle className="text-3xl text-indigo-500 mr-3" />
                <div>
                  <p className="font-medium text-gray-700">{bid.bidder?.name || 'Anonymous Bidder'}</p>
                  <p className="text-xs text-gray-500 flex items-center">
                    <FaRegClock className="mr-1" />
                    {new Date(bid.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
              <p className="text-lg font-semibold text-green-600">GHS {bid.amount.toFixed(2)}</p>
            </li>
          ))}
        </ul>
      )}
      <button
        onClick={refetch}
        disabled={isLoading}
        className="mt-6 w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md shadow-md transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 disabled:opacity-50"
      >
        Refresh Bids
      </button>
    </div>
  );
};

export default BidsList;