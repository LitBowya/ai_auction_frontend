import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { FaRegClock } from "react-icons/fa";

const AuctionCard = ({ auction }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden transform hover:scale-105 transition duration-300">
      {/* Auction Image */}
      <div className="relative w-full h-52">
        <Image
          src={auction.artwork?.imageUrl || "/default-image.png"}
          alt={auction.artwork?.title || "Artwork"}
          layout="fill"
          objectFit="cover"
        />
      </div>

      {/* Auction Details */}
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-900">{auction.artwork?.title || "Untitled"}</h3>
        <p className="text-gray-600 text-sm truncate">{auction.artwork?.description || "No description available"}</p>

        {/* Auction Time */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
          <FaRegClock />
          <span>Ends: {auction.biddingEndTime ? format(new Date(auction.biddingEndTime), "PPpp") : "N/A"}</span>
        </div>

        {/* Current Highest Bid */}
        <p className="text-lg font-semibold flex items-center justify-between text-blue-600 mt-2">
          <span className="text-black font-normal">Highest Bid </span><span>
          GHS {auction.highestBid || auction.startingPrice || "N/A"}
          </span>
        </p>

        {/* View Auction Button */}
        <Link href={`/auction/${auction._id}`}>
          <button className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-semibold w-full">
            View Auction
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AuctionCard;
