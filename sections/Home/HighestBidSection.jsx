import AuctionCard from "@/components/AuctionCard";


// Fetch highest bid auctions from the API (server-side)
async function fetchHighestBids() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auction/all`, {
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed to fetch auctions");

    const auctions = await res.json();

    // Sort by highest bid amount (or starting price if no bids)
    return auctions
      .sort((a, b) => (b.highestBid || b.startingPrice) - (a.highestBid || a.startingPrice))
      .slice(0, 4); // Get top 4 highest bid auctions
  } catch (error) {
    console.error("[ERROR] Fetching highest bids failed:", error);
    return [];
  }
}

export default async function HighestBids() {
  const highestBids = await fetchHighestBids();

  return (
    <section className="py-16 px-6 bg-gray-100">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-8">
          Highest Bids
        </h2>

        {highestBids.length === 0 ? (
          <p className="text-center text-gray-500">No highest bids available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {highestBids.map((auction) => (
              <AuctionCard key={auction._id} auction={auction} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
