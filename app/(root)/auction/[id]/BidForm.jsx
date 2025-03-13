"use client";
import { useState } from "react";
import useApi from "@/hooks/useApi";
import { toast } from "sonner";

export default function BidForm({ auctionId, highestBid }) {
  const { sendRequest } = useApi(`/bid/${auctionId}`, "POST");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const handleBid = async (e) => {
    e.preventDefault();

    // Convert amount to number and validate input
    const bidAmount = parseFloat(amount);
    if (isNaN(bidAmount)) {
      toast.error("Please enter a valid bid amount.");
      return;
    }
    if (bidAmount <= highestBid) {
      toast.error("Bid must be higher than the current highest bid!");
      return;
    }

    try {
      setLoading(true);
      const response = await sendRequest({ amount: bidAmount });
      
      // Check for any potential error structure in the response
      if (response?.error) {
        throw new Error(response.error);
      }
      
      toast.success("Bid placed successfully!");
      setAmount(""); // Clear the form upon success
    } catch (error) {
      // Attempt to extract more detailed error message if available
      const errorMessage = error.response?.data?.message || error.message || "Failed to place bid.";
      toast.error(errorMessage);
      console.error("Bid submission error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-md p-4 rounded-lg">
      <h2 className="text-lg font-bold mb-4">Place a Bid</h2>
      <form onSubmit={handleBid} className="space-y-4">
        <input
          type="number"
          placeholder="Enter bid amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="input-field"
          required
          min={highestBid + 0.01} // Enforce client-side minimum validation (if using decimals)
          step="0.01"
        />
        <button 
          type="submit" 
          className="btn-primary w-full" 
          disabled={loading || amount === ""}
        >
          {loading ? "Placing Bid..." : "Submit Bid"}
        </button>
      </form>
    </div>
  );
}