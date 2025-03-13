import AuctionCard from "@/components/AuctionCard";


// Fetch latest auctions from the API (server-side)
async function fetchLatestAuctions() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auction/all`, {
      cache: "no-store", // Always fetch fresh data
    });

    if (!res.ok) throw new Error("Failed to fetch auctions");

    const auctions = await res.json();
    return auctions.sort((a, b) => new Date(b.biddingEndTime) - new Date(a.biddingEndTime)).slice(0, 4); // Get latest 4 auctions

  } catch (error) {
    console.error("[ERROR] Fetching latest auctions failed:", error);
    return [];
  }
}

export default async function LatestAuctions() {
  const latestAuctions = await fetchLatestAuctions();

  return (
    <section className="py-24 px-6 bg-gray-300">
      <div className="max_width">
        <h2 className="text-4xl font-bold text-start text-gray-900 mb-8">
          Latest Auctions
        </h2>

        {latestAuctions.length === 0 ? (
          <p className="text-center text-gray-500">No auctions available at the moment.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {latestAuctions.map((auction) => (
              <AuctionCard key={auction._id} auction={auction} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
