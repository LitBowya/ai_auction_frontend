import AuctionCard from "@/components/AuctionCard";


// Fetch past auctions from the API (server-side)
async function fetchPastAuctions() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auction/all`, {
      cache: "no-store", // Always fetch fresh data
    });

    if (!res.ok) throw new Error("Failed to fetch past auctions");

    const auctions = await res.json();

    // Filter auctions that have ended and sort them
    return auctions
      .filter((auction) => new Date(auction.biddingEndTime) < new Date())
      .sort((a, b) => new Date(b.biddingEndTime) - new Date(a.biddingEndTime))
      .slice(0, 4); // Get the latest 4 past auctions
  } catch (error) {
    console.error("[ERROR] Fetching past auctions failed:", error);
    return [];
  }
}

export default async function PastAuctions() {
  const pastAuctions = await fetchPastAuctions();

  return (
    <section className="py-16 px-6 bg-gray-500">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-8">
          Past Auctions
        </h2>

        {pastAuctions.length === 0 ? (
          <p className="text-center text-white">No past auctions available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {pastAuctions.map((auction) => (
              <AuctionCard key={auction._id} auction={auction} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
