"use client";

import React, {useState} from "react";
import Image from "next/image";
import {format} from "date-fns";
import {FaClock, FaGavel, FaMoneyBillWave, FaTag, FaUser} from "react-icons/fa";
import {toast} from "sonner";
import {useSelector} from "react-redux";
import useApi from "../../hooks/useApi"; // Ensure correct import path
import LoginPrompt from "@/components/LoginPrompt";
import Button from "@/components/Button";
import {useRouter} from "next/navigation";

const AuctionDetail = ({ auction }) => {
  const {
    _id: auctionId,
    artwork,
    startingPrice,
    maxBidLimit,
    highestBidder,
    startingTime,
    biddingEndTime,
    seller,
    status,
  } = auction;

  const user = useSelector((state) => state.auth.user);
  const [mainImage, setMainImage] = useState(artwork?.imageUrl?.[0]?.url || null);
  const [bidAmount, setBidAmount] = useState("");
  const router = useRouter()

  // ** Fetch Highest Bid & All Bids **
  const {
    data: highestBidData,
    loading: highestBidLoading,
    refetch: refetchHighestBid,
  } = useApi(`/bids/highest/${auctionId}`);

  const {
    data: bidsData,
    loading: bidsLoading,
    refetch: refetchBids,
  } = useApi(`/bids/${auctionId}`);

  // ** Handle Placing a Bid **
  const { sendRequest, loading: bidPlacing } = useApi(
      `/bids/${auctionId}`,
      "POST"
  );

  // ** Handle Ending Auction **
  const { sendRequest: endAuction, loading: endingAuction, refetch: refetchAuction } = useApi(
      `/auction/${auctionId}`,
      "PUT"
  );

  const handleEndAuction = async () => {
    try {
      toast.warning("Ending Auction...");
      await endAuction({});
      toast.success("Auction Ended successfully!");

      refetchAuction();
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Bidding failed!");
    }
  };

  const handlePlaceBid = async () => {
    if (!bidAmount || isNaN(bidAmount) || bidAmount <= 0) {
      return toast.error("Bid amount must be greater than zero!");
    }

    if (new Date() < new Date(startingTime)) {
      return toast.error("Auction has not started yet!");
    }

    if (new Date() >= new Date(biddingEndTime)) {
      return toast.error("Auction has already ended!");
    }

    const currentHighestBid = highestBidData?.amount || 0;

    if (currentHighestBid === 0 && bidAmount < startingPrice) {
      return toast.error(`Bid must be at least GHS ${startingPrice}!`);
    }

    if (bidAmount <= currentHighestBid) {
      return toast.error(`Bid must be higher than GHS ${currentHighestBid}!`);
    }

    if (maxBidLimit && bidAmount > maxBidLimit) {
      return toast.error(
          `Bid cannot exceed the maximum limit of GHS ${maxBidLimit}!`
      );
    }

    if (user?._id === seller) {
      return toast.error("You cannot bid on your own auction!");
    }

    try {
      await sendRequest({ amount: bidAmount });
      toast.success("Bid placed successfully!");

      setBidAmount(""); // Reset input field
      refetchHighestBid(); // Refresh the highest bid
      refetchBids(); // Refresh all bids
    } catch (error) {
      toast.error(error?.response?.data?.message || "Bidding failed!");
    }
  };

  // ** Handle Payment **
  const handlePayment = async () => {
    try {
      toast.info("Redirecting to payment...");
      // Redirect to payment page or handle payment logic here
      // Example: window.location.href = `/payment/${auctionId}`;
    } catch (error) {
      toast.error("Failed to initiate payment");
    }
  };

  return (
      <div className="mx-auto">
        <div className="max_width p-6 grid grid-cols-1 md:grid-cols-2 gap-10 bg-white my-2 rounded-lg">
          {/* Left Section: Images */}
          <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-4 ">
            <div className="grid grid-cols-3 md:grid-cols-1 gap-2">
              {artwork.imageUrl.map((img, index) => (
                  <Image
                      key={index}
                      src={img.url}
                      alt={`Thumbnail ${index}`}
                      width={80}
                      height={80}
                      className="cursor-pointer rounded-lg border-2 border-transparent hover:border-gray-400 h-[100px] w-[100px] aspect-square object-center lg:sticky lg:top-3"
                      onClick={() => setMainImage(img.url)}
                  />
              ))}
            </div>
            <div className="relative">
              <Image
                  src={mainImage}
                  alt={artwork.title}
                  width={500}
                  height={750}
                  className="rounded-lg shadow-lg h-[350px] w-full aspect-square object-cover lg:sticky lg:top-3"
              />
            </div>
          </div>

          {/* Right Section: Auction Details */}
          <div className="flex flex-col justify-center gap-6">
            <h1 className="text-3xl font-bold">{artwork.title}</h1>
            <p className="text-gray-700">{artwork.description}</p>

            <div className="bg-gray-100 p-4 rounded-lg shadow-md space-y-4">
              <p className="flex items-center gap-2 text-lg">
                <FaClock className="text-blue-500" />
                <strong>Start Time:</strong>{" "}
                {format(new Date(startingTime), "PPP p")}
              </p>
              <p className="flex items-center gap-2 text-lg">
                <FaClock className="text-red-500" />
                <strong>End Time:</strong>{" "}
                {format(new Date(biddingEndTime), "PPP p")}
              </p>
              <p className="flex items-center gap-2 text-lg">
                <FaTag className="text-green-500" />
                <strong>Starting Price:</strong> GHS {startingPrice}
              </p>
              <p className="flex items-center gap-2 text-lg">
                <FaMoneyBillWave className="text-yellow-500" />
                <strong>Max Bid Limit:</strong> GHS {maxBidLimit}
              </p>
              <p className="flex items-center gap-2 text-lg">
                <FaGavel className="text-purple-500" />
                <strong>Highest Bid:</strong> GHS{" "}
                {highestBidData?.highestBid || "No bids yet"}
              </p>
            </div>

            {/* Bidding Section */}
            {status === "active" && new Date() < new Date(biddingEndTime) ? (
                user ? (
                    <>
                      {/* Bid Input Section */}
                      <div className="mt-4 p-4 bg-gray-50 rounded-lg shadow-md">
                        <label className="block text-lg font-semibold mb-2">
                          Enter Your Bid (GHS)
                        </label>
                        <input
                            type="number"
                            value={bidAmount}
                            onChange={(e) => setBidAmount(Number(e.target.value))}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter bid amount"
                        />
                        <button
                            onClick={handlePlaceBid}
                            disabled={bidPlacing || user?._id === seller}
                            className={`mt-3 w-full p-3 rounded-lg text-white font-semibold ${
                                bidPlacing || user?._id === seller
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-blue-600 hover:bg-blue-700"
                            }`}
                        >
                          {bidPlacing ? "Placing Bid..." : "Place Bid"}
                        </button>
                      </div>

                      {/* Bid History */}
                      <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold mb-4">Bid History</h2>
                        {bidsLoading ? (
                            <p>Loading bids...</p>
                        ) : bidsData?.bids?.length > 0 ? (
                            <ul className="space-y-3">
                              {bidsData?.bids?.map((bid) => (
                                  <li
                                      key={bid._id}
                                      className="flex items-center gap-3 p-2 border-b border-gray-200"
                                  >
                                    <FaUser className="text-blue-500" />
                                    <p>
                                      <strong>{bid.bidder.name}</strong> bid{" "}
                                      <strong>GHS {bid.amount}</strong> at{" "}
                                      {format(new Date(bid.createdAt), "PPP p")}
                                    </p>
                                  </li>
                              ))}
                            </ul>
                        ) : (
                            <p>No bids placed yet.</p>
                        )}
                      </div>
                    </>
                ) : (
                    <LoginPrompt />
                )
            ) : status === "completed" || new Date() >= new Date(biddingEndTime) ? (
                <div className="mt-6 p-6 bg-green-100 border border-green-400 text-green-800 rounded-lg text-center shadow-lg">
                  <h2 className="text-2xl font-bold">🎉 Auction Completed!</h2>
                  <p className="text-lg mt-2">
                    {bidsData?.bids?.length > 0
                        ? `Winning Bid: GHS ${bidsData.bids[0].amount} by ${bidsData.bids[0].bidder.name}`
                        : "No bids were placed in this auction."}
                  </p>
                  <p className="mt-2 text-sm text-gray-600">
                    Auction ended on {format(new Date(biddingEndTime), "PPP p")}.
                  </p>

                  {/* Pay Now Button for Highest Bidder */}
                  {(user?._id === highestBidder && status === "completed") && (
                      <Button
                          text="Pay Now"
                          variant="success"
                          onClick={() => router.push(`/auction/${auctionId}/shipping`)}
                          className="mt-4 w-full"
                      />
                  )}
                </div>
            ) : (
                <p className="text-red-500 font-semibold mt-4">
                  Auction is not active
                </p>
            )}

            {/* End Auction Button for Admin */}
            {user && user?.isAdmin && status !== "completed" && (
                <Button
                    text="End Auction"
                    variant="danger"
                    onClick={handleEndAuction}
                />
            )}
          </div>
        </div>
      </div>
  );
};

export default AuctionDetail;
