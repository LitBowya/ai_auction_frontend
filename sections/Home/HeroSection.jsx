import Link from "next/link";
import { format } from "date-fns";
import { FaRegClock } from "react-icons/fa";
import Image from "next/image";

export default async function HeroSection() {
  // Fetch data from your auction API endpoint.
  // The revalidate option caches the fetched data for 5 minutes.
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auction/latest`, {
    next: { revalidate: 3600 },
  });
  const auction = await res.json();

  if (!auction)
    return <p className="text-center text-gray-500">No auction available.</p>;

  return (
    <section className="relative w-full h-[80vh] flex items-center justify-center bg-gray-900 text-white">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{
          backgroundImage: auction.artwork?.imageUrl
            ? `url(${auction.artwork.imageUrl})`
            : "none",
        }}
      ></div>

      <div className="max_width relative text-center px-6 max-w-3xl w-full">
        <div className="flex max-md:flex-wrap justify-center items-center gap-10">
          <div className="w-full flex items-start flex-col">
            <h1 className="text-4xl font-bold mb-4">
              {auction.artwork?.title || "No Title"}
            </h1>
            <p className="text-lg mb-6">
              {auction.artwork?.description || "No description available"}
            </p>

            <div>
              <div className="flex items-start gap-2">
                <FaRegClock />
                <span>
                  Starts:{" "}
                  {auction.startingTime
                    ? format(new Date(auction.startingTime), "PPpp")
                    : "N/A"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <FaRegClock />
                <span>
                  Ends:{" "}
                  {auction.biddingEndTime
                    ? format(new Date(auction.biddingEndTime), "PPpp")
                    : "N/A"}
                </span>
              </div>
            </div>

            <p className="text-xl font-semibold mt-4">
              Current Highest Bid: GHS{" "}
              {auction.highestBid || auction.startingPrice || "N/A"}
            </p>

            <Link href={`/auction/${auction._id}`}>
              <button className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-md font-semibold">
                View Auction
              </button>
            </Link>
          </div>

          <div className="w-full">
            <Image
              src={auction.artwork?.imageUrl || "/default-image.png"}
              alt={auction.artwork?.title || "Artwork Image"}
              width={200}
              height={400}
              className="w-[300px] h-[350px] rounded-lg shadow-lg duration-300 transition-all hover:scale-[1.1] cursor-pointer"
            />
          </div>
        </div>
      </div>
    </section>
  );
}