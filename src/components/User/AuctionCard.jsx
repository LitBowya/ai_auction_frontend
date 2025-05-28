import { Link } from "react-router-dom";
import {useEffect, useState} from "react";


const CountdownTimer = ({ endTime }) => {
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

    return (
        <div className="flex  space-x-1">
            {Object.entries(timeLeft).map(([unit, value]) => (
                value > 0 && (
                    <span key={unit} className="flex items-center">
            <span className="font-medium">{value}</span>
            <span className="text-sm ml-1">{unit}</span>
          </span>
                )
            ))}
        </div>
    );
};

const AuctionCard = ({ auction, statusLabel }) => {
    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case "upcoming":
                return "bg-yellow-100 text-yellow-800";
            case "active":
                return "bg-green-100 text-green-800";
            case "past":
                return "bg-gray-100 text-gray-800";
            default:
                return "bg-blue-100 text-blue-800";
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="flex flex-col h-full">
                {/* Image Section */}
                <div className="relative h-48">
                    <img
                        src={auction.artwork.imageUrl[0]?.url || '/placeholder-image.jpg'}
                        alt={auction.artwork.title}
                        className="w-full h-full object-cover"
                    />
                    <span className={`absolute top-2 right-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(statusLabel)}`}>
            {statusLabel}
          </span>
                </div>

                {/* Content Section */}
                <div className="p-4 flex flex-col flex-grow">
                    <h3 className="text-xl font-semibold mb-2">{auction.artwork.title}</h3>

                    <div className="mb-4 flex-grow">
                        <p className="text-gray-600 line-clamp-2">{auction.artwork.description}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <p className="text-sm text-gray-500">Starting Price</p>
                            <p className="text-lg font-semibold">GHC {auction.startingPrice}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Highest Bid</p>
                            <p className="text-lg font-semibold">
                                {auction.highestBid ? `GHC ${auction.highestBid}` : "No bids"}
                            </p>

                        </div>
                        <CountdownTimer endTime={auction.biddingEndTime} />
                    </div>

                    <div className="border-t pt-4">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm text-gray-500">
                                    {statusLabel === "Active" ? "Ends in" : statusLabel === "Upcoming" ? "Starts at" : "Ended at"}
                                </p>
                                <p className="font-medium">
                                    {new Date(
                                        statusLabel === "Upcoming"
                                            ? auction.startingTime
                                            : auction.biddingEndTime
                                    ).toLocaleDateString()}
                                </p>

                            </div>
                            <Link
                                to={`/auctions/${auction._id}`}
                                className="bg-primary hover:bg-indigo-700 text-secondary hover:text-white px-4 py-2 rounded-lg transition-colors"
                            >
                                {statusLabel === "Completed" ? "View Results" : "View Auction"}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default AuctionCard;
