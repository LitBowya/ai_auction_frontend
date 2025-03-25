"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { format } from "date-fns";
import {
  FaClock,
  FaGavel,
  FaMoneyBillWave,
  FaTag,
  FaUser,
} from "react-icons/fa";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import useApi from "../../hooks/useApi";
import LoginPrompt from "@/components/LoginPrompt";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";

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
  const [mainImage, setMainImage] = useState(
    artwork?.imageUrl?.[0]?.url || null
  );
  const [bidAmount, setBidAmount] = useState("");
  const router = useRouter();

  // ** API Hooks **
  const { 
    data: highestBidData, 
    loading: highestBidLoading, 
    fetchData: fetchHighestBid,
    refetch
  } = useApi(`/bids/highest/${auctionId}`);

  const { 
    data: bidsData, 
    loading: bidsLoading, 
    fetchData: fetchBids 
  } = useApi(`/bids/${auctionId}`);

  const { 
    data: paymentData,
    fetchData: fetchPayments
  } = useApi(`/payments`);

  const { 
    postData: placeBid, 
    loading: bidPlacing 
  } = useApi(`/bids/${auctionId}`);

  const { 
    putData: endAuction, 
    loading: endingAuction 
  } = useApi(`/auctions/${auctionId}`);

  // ** Handlers **
  const handleEndAuction = async () => {
    try {
      toast.warning("Ending Auction...");
      await endAuction();
      toast.success("Auction Ended successfully!");
      fetchHighestBid();
      fetchBids();
      refetch()
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to end auction!");
    }
  };

  const handlePlaceBid = async () => {
    if (!bidAmount || isNaN(bidAmount)) {
      return toast.error("Please enter a valid bid amount!");
    }

    const numericBid = Number(bidAmount);
    const currentHighest = highestBidData?.amount || 0;

    if (numericBid <= 0) {
      return toast.error("Bid amount must be greater than zero!");
    }

    if (new Date() < new Date(startingTime)) {
      return toast.error("Auction hasn't started yet!");
    }

    if (new Date() >= new Date(biddingEndTime)) {
      return toast.error("Auction has ended!");
    }

    if (numericBid < startingPrice && currentHighest === 0) {
      return toast.error(`Bid must be at least GHS ${startingPrice}!`);
    }

    if (numericBid <= currentHighest) {
      return toast.error(`Bid must exceed GHS ${currentHighest}!`);
    }

    if (maxBidLimit && numericBid > maxBidLimit) {
      return toast.error(`Maximum bid is GHS ${maxBidLimit}!`);
    }

    try {
      await placeBid({ amount: numericBid });
      toast.success("Bid placed successfully!");
      setBidAmount("");
      fetchHighestBid();
      fetchBids();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Bid failed!");
    }
  };

  const handlePayment = () => {
    router.push(`/auction/${auctionId}/shipping`);
  };

  // ** Effects **
  useEffect(() => {
    if (artwork?.imageUrl?.length > 0) {
      setMainImage(artwork.imageUrl[0].url);
    }
  }, [artwork]);

  // ** Derived Values **
  const payment = paymentData?.payments?.find(p => p.auction === auctionId);
  const isPaymentMade = payment?.verified === true;
  const auctionEnded = status === "completed" || new Date() >= new Date(biddingEndTime);
  const auctionActive = status === "active" && new Date() < new Date(biddingEndTime);

  return (
    <div className="max_width">
      <div className="max-w-7xl p-6 grid grid-cols-1 md:grid-cols-2 gap-10 bg-white my-2 rounded-lg">
        {/* Left Section: Images */}
        <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-4">
          <div className="grid grid-cols-3 md:grid-cols-1 gap-2">
            {artwork.imageUrl.map((img, index) => (
              <Image
                key={index}
                src={img.url}
                alt={`Thumbnail ${index}`}
                width={80}
                height={80}
                className="cursor-pointer rounded-lg border-2 border-transparent hover:border-gray-400 h-[100px] w-[100px] aspect-square object-cover"
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
              className="rounded-lg shadow-lg h-[350px] w-full aspect-square object-cover"
              priority
            />
          </div>
        </div>

        {/* Right Section: Auction Details */}
        <div className="flex flex-col gap-6">
          <h1 className="text-3xl font-bold">{artwork.title}</h1>
          <p className="text-gray-700">{artwork.description}</p>

          <div className="bg-gray-100 p-4 rounded-lg space-y-4">
            <DetailItem 
              icon={<FaClock className="text-blue-500" />}
              label="Start Time"
              value={format(new Date(startingTime), "PPP p")}
            />
            <DetailItem 
              icon={<FaClock className="text-red-500" />}
              label="End Time"
              value={format(new Date(biddingEndTime), "PPP p")}
            />
            <DetailItem 
              icon={<FaTag className="text-green-500" />}
              label="Starting Price"
              value={`GHS ${startingPrice}`}
            />
            {maxBidLimit && (
              <DetailItem 
                icon={<FaMoneyBillWave className="text-yellow-500" />}
                label="Max Bid Limit"
                value={`GHS ${maxBidLimit}`}
              />
            )}
            <DetailItem 
              icon={<FaGavel className="text-purple-500" />}
              label="Highest Bid"
              value={highestBidData?.highestBid ? `GHS ${highestBidData.highestBid}` : "No bids yet"}
            />
          </div>

          {/* Bidding Section */}
          {auctionActive ? (
            user ? (
              <>
                <BidForm 
                  bidAmount={bidAmount}
                  setBidAmount={setBidAmount}
                  handlePlaceBid={handlePlaceBid}
                  loading={bidPlacing}
                  disabled={user?._id === seller}
                />
                
                <BidHistory 
                  bids={bidsData?.bids}
                  loading={bidsLoading}
                />
              </>
            ) : (
              <LoginPrompt />
            )
          ) : auctionEnded ? (
            <AuctionEnded 
              bids={bidsData?.bids}
              endTime={biddingEndTime}
              isWinner={user?._id === highestBidder}
              isPaid={isPaymentMade}
              handlePayment={handlePayment}
            />
          ) : (
            <p className="text-red-500 font-semibold">Auction is not active</p>
          )}

          {/* Admin Controls */}
          {user?.isAdmin && status !== "completed" && (
            <Button
              text={endingAuction ? "Ending..." : "End Auction"}
              variant="danger"
              onClick={handleEndAuction}
              disabled={endingAuction}
            />
          )}
        </div>
      </div>
    </div>
  );
};

// Helper Components
const DetailItem = ({ icon, label, value }) => (
  <p className="flex items-center gap-2 text-lg">
    {icon}
    <strong>{label}:</strong> {value}
  </p>
);

const BidForm = ({ bidAmount, setBidAmount, handlePlaceBid, loading, disabled }) => (
  <div className="p-4 bg-gray-50 rounded-lg">
    <label className="block text-lg font-semibold mb-2">
      Enter Your Bid (GHS)
    </label>
    <input
      type="number"
      value={bidAmount}
      onChange={(e) => setBidAmount(e.target.value)}
      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
      placeholder="Enter bid amount"
      min={0}
      step="0.01"
    />
    <Button
      text={loading ? "Placing Bid..." : "Place Bid"}
      onClick={handlePlaceBid}
      disabled={loading || disabled}
      className="mt-3 w-full"
    />
  </div>
);

const BidHistory = ({ bids, loading }) => (
  <div className="p-6 bg-white rounded-lg shadow">
    <h2 className="text-2xl font-semibold mb-4">Bid History</h2>
    {loading ? (
      <p>Loading bids...</p>
    ) : bids?.length > 0 ? (
      <ul className="space-y-3">
        {bids.map((bid) => (
          <li key={bid._id} className="flex items-center gap-3 p-2 border-b">
            <FaUser className="text-blue-500" />
            <p>
              <strong>{bid.bidder.name}</strong> bid <strong>GHS {bid.amount}</strong> at{" "}
              {format(new Date(bid.createdAt), "PPP p")}
            </p>
          </li>
        ))}
      </ul>
    ) : (
      <p>No bids placed yet.</p>
    )}
  </div>
);

const AuctionEnded = ({ bids, endTime, isWinner, isPaid, handlePayment }) => (
  <div className="p-6 bg-green-100 border border-green-400 text-green-800 rounded-lg">
    <h2 className="text-2xl font-bold">🎉 Auction Completed!</h2>
    <p className="text-lg mt-2">
      {bids?.length > 0
        ? `Winning Bid: GHS ${bids[0].amount} by ${bids[0].bidder.name}`
        : "No bids were placed."}
    </p>
    <p className="mt-2 text-sm text-gray-600">
      Ended on {format(new Date(endTime), "PPP p")}.
    </p>

    {isWinner && !isPaid && (
      <Button
        text="Pay Now"
        variant="success"
        onClick={handlePayment}
        className="mt-4 w-full"
      />
    )}
  </div>
);

export default AuctionDetail;