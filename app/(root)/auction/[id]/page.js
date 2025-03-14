import Image from "next/image";
import { FaRegClock, FaMoneyBillWave } from "react-icons/fa";
import { format } from "date-fns";
import BidHistory from "./BidHistory";
import BidForm from "./BidForm";

// ✅ Fetch auction details (Server Component)
async function fetchAuction(id) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auction/${id}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) {
      console.error("Fetch response not OK, status:", res.status);
      return null;
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching auction:", error);
    return null;
  }
}

// ✅ Correctly handle dynamic params in a server component
export default async function AuctionDetail(props) {
  // Await the props to ensure `params` is ready before using its properties.
  const { params } = await Promise.resolve(props);
  
  if (!params || !params.id) {
    console.error("Auction ID not found in params.");
    return <p className="text-center text-gray-500">Auction ID not found.</p>;
  }
  
  const id = params.id;
  
  const {auction} = await fetchAuction(id);
  console.log(auction)
  
  if (!auction) {
    console.error("Auction not found for id:", id);
    return <p className="text-center text-gray-500">Auction not found.</p>;
  }
  
  return (
    <main className="max-w-4xl mx-auto px-6 py-24">
      <h1 className="text-3xl font-bold text-center mb-6">
        {auction.artwork?.title || "No Title"}
      </h1>
  
      {/* Artwork Image */}
      <div className="relative w-full h-96">
        <Image
          src={auction.artwork?.imageUrl || "/default-image.png"}
          alt={auction.artwork?.title || "Artwork"}
          layout="fill"
          objectFit="cover"
          className="rounded-lg shadow-md"
        />
      </div>
  
      {/* Auction Details */}
      <div className="mt-6 space-y-4">
        <p className="text-lg">
          {auction.artwork?.description || "No description available."}
        </p>
  
        <div className="flex items-center gap-2 text-gray-500">
          <FaRegClock />
          <span>Starts: {format(new Date(auction.startingTime), "PPpp")}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-500">
          <FaRegClock />
          <span>Ends: {format(new Date(auction.biddingEndTime), "PPpp")}</span>
        </div>
  
        <p className="text-xl font-semibold flex items-center gap-2">
          <FaMoneyBillWave />
          Current Highest Bid: GHS {auction.highestBid || auction.startingPrice}
        </p>
      </div>
  
      {/* Bid Form & History */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* <BidForm auctionId={auction._id} highestBid={auction.highestBid || auction.startingPrice} /> */}
        {/* <BidHistory auctionId={auction._id} /> */}
      </div>
    </main>
  );
}