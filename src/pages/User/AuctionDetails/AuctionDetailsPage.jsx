import React, {useState, useEffect} from "react";
import {useParams, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux"; // For user info

import {
    useGetAuctionByIdQuery,
    useEndAuctionMutation,
} from "../../../redux/services/auctionApi";
import {useGetAuctionHighestBidQuery} from "../../../redux/services/bidApi";
import {useGetAllPaymentsQuery} from "../../../redux/services/paymentApi.js";

import Spinner from "../../../components/Spinner";
import ErrorMessage from "../../../components/ErrorMessage";
import Modal from "../../../components/Modal";
import Bids from "./Bids";
import BidsList from "./BidsList";

import {
    FaRegCalendarAlt,
    FaRegClock,
    FaDollarSign,
    FaTag,
    FaTimesCircle,
    FaCheckCircle,
    FaHourglassHalf,
    FaGavel,
    FaExclamationTriangle,
    FaArrowLeft,
    FaImages,
    FaImage,
} from "react-icons/fa";
import PaymentsPrompt from "./PaymentsPrompt";

// Helper to format dates
const formatDate = (dateString) =>
    dateString ? new Date(dateString).toLocaleString() : "N/A";

// Countdown Timer Component (Optional, but good for UX)
const CountdownTimer = ({endTime}) => {
    const calculateTimeLeft = () => {
        const difference = +new Date(endTime) - +new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }
        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearTimeout(timer);
    });

    if (!Object.keys(timeLeft).length) {
        return <span className="text-red-500 font-semibold">Auction Ended</span>;
    }

    return (
        <div className="flex space-x-2 text-lg font-mono">
            {timeLeft.days > 0 && (
                <span className="bg-gray-200 px-2 py-1 rounded">{timeLeft.days}d</span>
            )}
            <span className="bg-gray-200 px-2 py-1 rounded">
        {String(timeLeft.hours).padStart(2, "0")}h
      </span>
            <span className="bg-gray-200 px-2 py-1 rounded">
        {String(timeLeft.minutes).padStart(2, "0")}m
      </span>
            <span className="bg-gray-200 px-2 py-1 rounded">
        {String(timeLeft.seconds).padStart(2, "0")}s
      </span>
        </div>
    );
};

const AuctionDetailsPage = () => {
    const {id: auctionId} = useParams();
    const navigate = useNavigate();
    const {user} = useSelector((state) => state.auth); // Assuming you have auth slice

    const {
        data: auctionData,
        isLoading: isLoadingAuction,
        error: errorAuction,
        refetch: refetchAuction,
    } = useGetAuctionByIdQuery(auctionId);
    const {
        data: highestBidDetails,
        isLoading: isLoadingHighestBid,
        error: errorHighestBid,
        refetch: refetchHighestBid,
    } = useGetAuctionHighestBidQuery(auctionId, {
        skip: !auctionId, // Skip if auctionId is not yet available
        pollingInterval: 30000, // Optional: Poll for highest bid updates every 30s
    });

    const [
        endAuction,
        {
            isLoading: isEndingAuction,
            error: endAuctionError,
            data: endAuctionSuccessData,
        },
    ] = useEndAuctionMutation();
    const {data} = useGetAllPaymentsQuery()
    const payment = data?.payments?.find((p) => p.auction === auctionId);
    const isPaymentMade = payment?.verified === true;

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [showEndAuctionError, setShowEndAuctionError] = useState("");
    const [showEndAuctionSuccess, setShowEndAuctionSuccess] = useState("");
    const [showEndAuctionModal, setShowEndAuctionModal] = useState(false);

    useEffect(() => {
        if (endAuctionError) {
            setShowEndAuctionError(
                endAuctionError.data?.message || "Failed to end auction."
            );
            setShowEndAuctionSuccess("");
        }
        if (endAuctionSuccessData?.success) {
            setShowEndAuctionSuccess(
                endAuctionSuccessData.message || "Auction ended successfully."
            );
            setShowEndAuctionError("");
            refetchAuction(); // Refetch auction details to update status
            refetchHighestBid();
        }
    }, [
        endAuctionError,
        endAuctionSuccessData,
        refetchAuction,
        refetchHighestBid,
    ]);

    if (isLoadingAuction || isLoadingHighestBid) {
        return (
            <div className="container mx-auto p-4 min-h-screen flex justify-center items-center">
                <Spinner size="lg"/>
            </div>
        );
    }

    if (errorAuction) {
        return (
            <div className="container mx-auto p-4">
                <ErrorMessage
                    title="Error Loading Auction"
                    message={errorAuction.data?.message || errorAuction.error}
                />
            </div>
        );
    }
    // Do not block page for highestBidError, just show a message for that part
    // if (errorHighestBid) {
    //   return <div className="container mx-auto p-4"><ErrorMessage title="Error Loading Bid Details" message={errorHighestBid.data?.message || errorHighestBid.error} /></div>;
    // }

    const auction = auctionData?.data;
    const artwork = auction?.artwork;
    const highestBid = highestBidDetails?.highestBid;
    const highestBidder = highestBidDetails?.highestBidder;

    if (!auction || !artwork) {
        return (
            <div className="container mx-auto p-4">
                <ErrorMessage message="Auction details could not be found."/>
            </div>
        );
    }

    const images = artwork.imageUrl || [];
    const canEndAuction = user?.isAdmin && auction.status === "active"; // Example condition: user is admin and auction is active
    // Or: if (auction.seller === user._id && auction.status === 'active') if you have a seller field.

    // Update handleEndAuction function
    const handleEndAuction = () => {
        setShowEndAuctionError("");
        setShowEndAuctionSuccess("");
        setShowEndAuctionModal(true);
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case "pending":
                return (
                    <span
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
            <FaHourglassHalf className="mr-1.5"/> Pending
          </span>
                );
            case "active":
                return (
                    <span
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 animate-pulse">
            <FaCheckCircle className="mr-1.5"/> Active
          </span>
                );
            case "completed":
                return (
                    <span
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
            <FaTimesCircle className="mr-1.5"/> Completed
          </span>
                );
            default:
                return (
                    <span
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
            {status}
          </span>
                );
        }
    };

    const handleThumbnailClick = (index) => {
        setCurrentImageIndex(index);
    };

    return (
        <div className="bg-primary min-h-screen">
            <div className="max-width py-24 lg:py-32">
                <button
                    onClick={() => navigate(-1)}
                    className="mb-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    <FaArrowLeft className="mr-2"/> Back
                </button>

                <div className="bg-white shadow-2xl rounded-xl overflow-hidden">
                    <div className="md:flex">
                        {/* Image Gallery Section */}
                        <div className="md:w-1/2 p-6">
                            {images.length > 0 ? (
                                <>
                                    <div
                                        className="mb-4 relative group aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-lg">
                                        <img
                                            src={images[currentImageIndex].url}
                                            alt={`${artwork.title} - Image ${currentImageIndex + 1}`}
                                            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                                        />
                                        {images.length > 1 && (
                                            <>
                                                <button
                                                    onClick={() =>
                                                        setCurrentImageIndex((prev) =>
                                                            prev === 0 ? images.length - 1 : prev - 1
                                                        )
                                                    }
                                                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/75 z-10 text-xl"
                                                >
                                                    ❮
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        setCurrentImageIndex((prev) =>
                                                            prev === images.length - 1 ? 0 : prev + 1
                                                        )
                                                    }
                                                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/75 z-10 text-xl"
                                                >
                                                    ❯
                                                </button>
                                            </>
                                        )}
                                    </div>
                                    {images.length > 1 && (
                                        <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
                                            {images.map((img, index) => (
                                                <img
                                                    key={index}
                                                    src={img}
                                                    alt={`Thumbnail ${index + 1}`}
                                                    onClick={() => handleThumbnailClick(index)}
                                                    className={`w-full h-20 object-cover rounded-md cursor-pointer border-2 transition-all ${
                                                        currentImageIndex === index
                                                            ? "border-indigo-500 scale-105"
                                                            : "border-transparent hover:border-indigo-300"
                                                    } shadow-sm`}
                                                />
                                            ))}
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div
                                    className="w-full h-96 bg-gray-200 flex items-center justify-center rounded-lg shadow-lg">
                                    <FaImage className="text-6xl text-gray-400"/>
                                </div>
                            )}
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-6 mb-3">
                                {artwork.title}
                            </h1>
                            <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                                {artwork.description}
                            </p>
                        </div>

                        {/* Auction Details & Bidding Section */}
                        <div className="md:w-1/2 p-6 md:p-8">
                            <div className="mb-6 flex justify-between items-center">
                                {getStatusBadge(auction.status)}
                                {auction.status === "active" && auction.biddingEndTime && (
                                    <div className="text-right">
                                        <p className="text-sm text-gray-500 mb-1">Time Left:</p>
                                        <CountdownTimer endTime={auction.biddingEndTime}/>
                                    </div>
                                )}
                            </div>

                            {showEndAuctionSuccess && (
                                <p className="text-sm text-green-600 mb-3 p-3 bg-green-50 rounded-md">
                                    {showEndAuctionSuccess}
                                </p>
                            )}
                            {showEndAuctionError && (
                                <ErrorMessage
                                    message={showEndAuctionError}
                                    title="Action Failed"
                                />
                            )}

                            <div className="space-y-5 mb-8">
                                <div className="flex items-center text-gray-700">
                                    <FaDollarSign className="text-xl text-green-500 mr-3"/>
                                    <div>
                                        <span className="font-medium">Starting Price: </span>
                                        <span className="text-lg font-semibold">
                      GHS {auction.startingPrice.toFixed(2)}
                    </span>
                                    </div>
                                </div>
                                <div className="flex items-center text-gray-700">
                                    <FaGavel className="text-xl text-blue-500 mr-3"/>
                                    <div>
                                        <span className="font-medium">Current Highest Bid: </span>
                                        {isLoadingHighestBid ? (
                                            <span className="text-sm">(Loading...)</span>
                                        ) : errorHighestBid ? (
                                            <span className="text-sm text-red-500">
                        (Error loading bid)
                      </span>
                                        ) : highestBid > 0 ? (
                                            <span className="text-lg font-semibold text-blue-600">
                        GHS {highestBid.toFixed(2)}
                                                {highestBidder && (
                                                    <span className="text-sm text-gray-500">
                            {" "}
                                                        by {highestBidder.name}
                          </span>
                                                )}
                      </span>
                                        ) : (
                                            <span className="text-lg font-semibold">No bids yet</span>
                                        )}
                                    </div>
                                </div>
                                <div className="flex items-center text-gray-700">
                                    <FaTag className="text-xl text-purple-500 mr-3"/>
                                    <div>
                                        <span className="font-medium">Maximum Bid (if any): </span>
                                        <span className="text-lg font-semibold">
                      {auction.maxBidLimit
                          ? `GHS ${auction.maxBidLimit.toFixed(2)}`
                          : "No maximum limit"}
                    </span>
                                    </div>
                                </div>
                                <div className="flex items-center text-gray-700">
                                    <FaRegCalendarAlt className="text-xl text-cyan-500 mr-3"/>
                                    <div>
                                        <span className="font-medium">Auction Starts: </span>
                                        <span className="text-sm">
                      {formatDate(auction.startingTime)}
                    </span>
                                    </div>
                                </div>
                                <div className="flex items-center text-gray-700">
                                    <FaRegClock className="text-xl text-orange-500 mr-3"/>
                                    <div>
                                        <span className="font-medium">Bidding Ends: </span>
                                        <span className="text-sm">
                      {formatDate(auction.biddingEndTime)}
                    </span>
                                    </div>
                                </div>
                            </div>

                            {canEndAuction && (
                                <button
                                    onClick={handleEndAuction}
                                    disabled={isEndingAuction}
                                    className="w-full mb-6 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg shadow-md transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 disabled:opacity-50 flex items-center justify-center"
                                >
                                    {isEndingAuction ? (
                                        <Spinner size="sm"/>
                                    ) : (
                                        <>
                                            <FaTimesCircle className="mr-2"/> End Auction Now
                                        </>
                                    )}
                                </button>
                            )}

                            {
                                (auctionData?.data && auctionData?.data.status === "completed") && (user && user._id === highestBidder._id &&
                                    <PaymentsPrompt
                                        highestBid={highestBid}
                                        highestBidder={highestBidder}
                                        auction={auction}
                                        isPaid={isPaymentMade}
                                    />)
                            }

                            {/* Bidding Form Component */}
                            <Bids
                                auctionId={auctionId}
                                currentHighestBid={highestBid || 0}
                                startingPrice={auction.startingPrice}
                                auctionStatus={auction.status}
                                biddingEndTime={auction.biddingEndTime}
                                maxBidLimit={auction.maxBidLimit}
                                auctionStartingTime={auction.startingTime}
                                refetchHighestBid={refetchHighestBid}
                                refetchAuction={refetchAuction}
                            />
                        </div>
                    </div>

                    {/* Bids List Component */}
                    <div className="p-6 md:p-8 border-t border-gray-200">
                        <BidsList auctionId={auctionId}/>
                    </div>
                </div>
            </div>

            {showEndAuctionModal && (
                <Modal
                    isOpen={showEndAuctionModal}
                    onClose={() => setShowEndAuctionModal(false)}
                >
                    <div className="p-4">
                        <h3 className="text-xl font-semibold mb-4">End Auction Confirmation</h3>
                        <p className="mb-6">Are you sure you want to end this auction? This action cannot be undone.</p>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={() => setShowEndAuctionModal(false)}
                                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={async () => {
                                    setShowEndAuctionModal(false);
                                    try {
                                        await endAuction(auctionId).unwrap();
                                    } catch (err) {
                                        console.error('Failed to end auction:', err);
                                    }
                                }}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                            >
                                End Auction
                            </button>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default AuctionDetailsPage;
