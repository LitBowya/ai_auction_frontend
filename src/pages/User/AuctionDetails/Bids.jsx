import React, {useState, useEffect} from "react";
import {usePlaceBidMutation} from "../../../redux/services/bidApi";
import {useGetAuctionBidsQuery} from "../../../redux/services/bidApi";
import InputField from "../../../components/InputField";
import Spinner from "../../../components/Spinner";
import ErrorMessage from "../../../components/ErrorMessage";
import {FaPaperPlane} from "react-icons/fa";
import {useSelector} from "react-redux"; // If you need user info for specific checks
import LoginPrompt from "../../../components/LoginPrompt";
import {FiCheckCircle, FiFlag} from "react-icons/fi";

const Bids = ({
                  auctionId,
                  currentHighestBid,
                  startingPrice,
                  auctionStatus,
                  biddingEndTime,
                  maxBidLimit,
                  auctionStartingTime,
                  refetchHighestBid,
                  refetchAuction
              }) => {
    const [amount, setAmount] = useState("");
    const [bidError, setBidError] = useState("");
    const [bidSuccess, setBidSuccess] = useState("");

    const [
        placeBid,
        {
            isLoading: isPlacingBid,
            error: placeBidErrorData,
            data: placeBidSuccessData,
        },
    ] = usePlaceBidMutation();
    // Inside the Bids component
    const {refetch: refetchBidsList} = useGetAuctionBidsQuery(auctionId);

    const {user} = useSelector((state) => state.auth); // Example: Get user info

    useEffect(() => {
        if (placeBidErrorData) {
            setBidError(placeBidErrorData.data?.message || "Failed to place bid.");
            setBidSuccess("");
        }
        if (placeBidSuccessData?.success) {
            setBidSuccess(placeBidSuccessData.message || "Bid placed successfully!");
            setBidError("");
            setAmount(""); // Clear input on success
        }
    }, [placeBidErrorData, placeBidSuccessData]);

    const handlePlaceBid = async (e) => {
        e.preventDefault();
        setBidError("");
        setBidSuccess("");

        const bidAmount = parseFloat(amount);
        if (isNaN(bidAmount) || bidAmount <= 0) {
            setBidError("Bid amount must be a positive number.");
            return;
        }

        // Client-side validations (mirroring backend but good for UX)
        if (new Date() < new Date(auctionStartingTime)) {
            setBidError("Auction hasn't started yet!");
            return;
        }
        if (new Date() >= new Date(biddingEndTime)) {
            setBidError("Auction has ended!");
            return;
        }
        if (currentHighestBid === 0 && bidAmount < startingPrice) {
            setBidError(`Bid must be at least GHS ${startingPrice.toFixed(2)}!`);
            return;
        }
        if (bidAmount <= currentHighestBid) {
            setBidError(
                `Bid must be higher than GHS ${currentHighestBid.toFixed(2)}!`
            );
            return;
        }
        if (maxBidLimit && bidAmount > maxBidLimit) {
            setBidError(
                `Bid cannot exceed the maximum limit of GHS ${maxBidLimit.toFixed(2)}!`
            );
            return;
        }

        try {
            await placeBid({auctionId, amount: bidAmount}).unwrap();
            refetchBidsList(); // Refresh bids list
            refetchHighestBid(); // Refresh highest bid (from props)
            refetchAuction()
            // Success handled by useEffect
        } catch (err) {
            // Error handled by useEffect
            console.error("Failed to place bid:", err);
        }
    };

    if (
        auctionStatus !== "active" ||
        new Date() >= new Date(biddingEndTime) ||
        new Date() < new Date(auctionStartingTime)
    ) {
        let message = "Bidding is currently closed for this auction.";
        if (
            auctionStatus === "pending" &&
            new Date() < new Date(auctionStartingTime)
        ) {
            message = `Auction starts at: ${new Date(
                auctionStartingTime
            ).toLocaleString()}`;
        } else if (
            auctionStatus === "completed" ||
            new Date() >= new Date(biddingEndTime)
        ) {
            message = "This auction has ended succeesfully.";
        }
        return (
            <div className="shadow-lg my-5">

                <div className="flex items-start space-x-3 bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                    <FiCheckCircle className="flex-shrink-0 text-2xl text-green-600 animate-pulse"/>
                    <div>
                        <h4 className="flex items-center text-green-800 font-semibold mb-1">
                            <FiFlag className="mr-2"/> Auction Complete
                        </h4>
                        <p className="text-green-700 mb-2">
                            Congratulations! {message}
                        </p>
                        <p className="text-center text-gray-700 font-medium"></p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="mt-8 bg-white shadow-xl rounded-lg p-6">
            <div>
                {user ? (
                    <>
                        <h3 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-3">
                            Place Your Bid
                        </h3>
                        <form onSubmit={handlePlaceBid}>
                            <InputField
                                label="Your Bid Amount (GHS)"
                                type="number"
                                id="bidAmount"
                                name="bidAmount"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder={`Higher than GHS ${currentHighestBid.toFixed(2)}`}
                                required
                                disabled={isPlacingBid}
                                error={bidError && !placeBidErrorData ? bidError : null} // Show client-side error if no server error yet
                            />
                            {bidSuccess && (
                                <p className="text-sm text-green-600 mb-3 p-3 bg-green-50 rounded-md">
                                    {bidSuccess}
                                </p>
                            )}
                            {placeBidErrorData && (
                                <ErrorMessage message={bidError} title="Bidding Failed"/>
                            )}

                            {isPlacingBid ? (
                                <Spinner/>
                            ) : (
                                <button
                                    type="submit"
                                    disabled={isPlacingBid}
                                    className="w-full flex items-center justify-center bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg shadow-md transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 disabled:opacity-50"
                                >
                                    {isPlacingBid ? (
                                        <Spinner size="sm"/>
                                    ) : (
                                        <>
                                            <FaPaperPlane className="mr-2"/> Place Bid
                                        </>
                                    )}
                                </button>
                            )}
                        </form>
                    </>
                ) : (
                    <>
                        <LoginPrompt/>
                    </>
                )}
            </div>
        </div>
    );
};

export default Bids;
