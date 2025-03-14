"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import useApi from "@/hooks/useApi";
import { toast } from "sonner";
import { FaMoneyBillWave, FaExclamationTriangle, FaLock } from "react-icons/fa";

export default function BidForm({ auctionId }) {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const { sendRequest, error: apiError, refetch } = useApi(`/bids/${auctionId}`, "POST");
  
  // Fetch highest bid and bid history using hooks
  const { data: highestBidData, error: highestBidError } = useApi(`/bids/highest/${auctionId}`, "GET");
  const { data: bidHistory, error: bidHistoryError } = useApi(`/bids/${auctionId}`, "GET");

  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [validationError, setValidationError] = useState("");
  const [focusedInput, setFocusedInput] = useState(false);

  // Clear validation error when user starts typing again
  useEffect(() => {
    if (amount && validationError) {
      setValidationError("");
    }
  }, [amount, validationError]);

  // Check for API errors and display them
  useEffect(() => {
    if (apiError) {
      toast.error(`API Error: ${apiError}`);
    }
    if (highestBidError) {
      toast.error(`Error fetching highest bid: ${highestBidError}`);
    }
    if (bidHistoryError) {
      toast.error(`Error fetching bid history: ${bidHistoryError}`);
    }
  }, [apiError, highestBidError, bidHistoryError]);

  const validateBid = (bidAmount) => {
    if (isNaN(bidAmount)) {
      setValidationError("Please enter a valid number");
      return false;
    }

    if (bidAmount <= 0) {
      setValidationError("Bid amount must be positive");
      return false;
    }

    if (bidAmount <= (highestBidData?.amount || 0)) {
      setValidationError(`Bid must be higher than the current highest bid (GHS ${highestBidData?.amount || 0})`);
      return false;
    }
    return true;
  };

  const handleBid = async (e) => {
    e.preventDefault();

    // Check if user is authenticated before proceeding
    if (!isAuthenticated) {
      toast.error("Please log in to place a bid");
      router.push("/login");
      return;
    }

    setValidationError("");

    // Convert amount to number and validate input
    const bidAmount = Number(amount);

    if (!validateBid(bidAmount)) {
      toast.error(validationError);
      return;
    }

    try {
      setLoading(true);
      const response = await sendRequest({ amount: bidAmount });

      // Handle different response scenarios
      if (!response) {
        throw new Error("No response received from server");
      }

      if (response?.error) {
        throw new Error(response.error);
      }

      toast.success("🎉 Bid placed successfully!");
      refetch();
      setAmount(""); // Clear the form upon success
    } catch (error) {
      // Handle different error types
      if (error.name === 'AbortError') {
        toast.error("Request was cancelled. Please try again.");
      } else if (error.response) {
        // Server responded with an error status
        const errorMessage = error.response.data?.message || 
                            `Server error (${error.response.status})`;
        toast.error(errorMessage);
      } else if (error.request) {
        // Request was made but no response received
        toast.error("No response from server. Check your internet connection.");
      } else {
        // Something else went wrong
        toast.error(error.message || "Failed to place bid");
      }
      console.error("Bid submission error:", error);
    } finally {
      setLoading(false);
    }
  };

  const minBidAmount = highestBidData ? (highestBidData.amount + 0.01).toFixed(2) : 0.01;

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.2)] p-6 rounded-xl border border-gray-100">
      <h2 className="text-xl font-bold mb-5 text-gray-800 flex items-center gap-2">
        <FaMoneyBillWave className="text-green-600" />
        Place a Bid
      </h2>

      {!isAuthenticated && (
        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-100 rounded-lg flex items-start gap-3">
          <FaLock className="text-yellow-500 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm text-yellow-700">
              You need to be logged in to place a bid on this auction.
            </p>
            <button
              onClick={() => router.push('/login')}
              className="mt-2 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
            >
              Log in now →
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleBid} className="space-y-5">
        <div className="relative">
          <div className={`absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 ${focusedInput ? 'text-blue-600' : ''}`}>
            GHS
          </div>

          <input
            type="number"
            placeholder="Enter bid amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            onFocus={() => setFocusedInput(true)}
            onBlur={() => setFocusedInput(false)}
            className={`w-full pl-16 pr-4 py-3 border rounded-lg shadow-sm transition-all duration-300
                      ${validationError ?
              'border-red-300 bg-red-50 focus:ring-2 focus:ring-red-200 focus:border-red-400' :
              'border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-400'}
                      ${focusedInput ? 'bg-blue-50' : 'bg-white'}`}
            required
            min={minBidAmount}
            step="0.01"
            aria-invalid={!!validationError}
          />
        </div>

        {validationError && (
          <div className="flex items-center gap-2 text-red-600 text-sm pl-1">
            <FaExclamationTriangle className="flex-shrink-0" />
            <span>{validationError}</span>
          </div>
        )}

        <div className="pt-2">
          <button
            type="submit"
            className={`w-full px-6 py-3 rounded-lg font-medium transition-all duration-300 shadow-md
                      ${loading || amount === "" ?
              'bg-gray-400 cursor-not-allowed' :
              'bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white hover:shadow-lg active:scale-[0.98]'}`}
            disabled={loading || amount === ""}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-t-2 border-blue-200 border-r-2 border-b-2 rounded-full animate-spin"></div>
                <span>Processing...</span>
              </div>
            ) : (
              isAuthenticated ? "Submit Bid" : "Log In to Bid"
            )}
          </button>
        </div>

        <p className="text-sm text-gray-500 text-center pt-1">
          Current highest bid: <span className="font-medium text-green-700">GHS {highestBidData?.amount?.toFixed(2)}</span>
        </p>

        <div className="mt-4">
          <h3 className="font-medium text-gray-700">Bid History</h3>
          <ul className="space-y-2">
            {bidHistory?.map((bid) => (
              <li key={bid._id} className="text-sm text-gray-600">
                GHS {bid.amount.toFixed(2)} - {bid.user?.name} ({new Date(bid.createdAt).toLocaleString()})
              </li>
            ))}
          </ul>
        </div>
      </form>
    </div>
  );
}
