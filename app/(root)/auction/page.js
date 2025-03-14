import AuctionCard from "@/components/AuctionCard";

// Fetch auctions from the API
async function fetchAuctions() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auction/all`);
  return res.json();
}

export default async function AuctionPage() {
  const auctions = await fetchAuctions();

  // Separate auctions into categories
  const now = new Date();
  const currentAuctions = auctions.filter(a => new Date(a.startingTime) <= now && new Date(a.biddingEndTime) > now);
  const upcomingAuctions = auctions.filter(a => new Date(a.startingTime) > now);
  const pastAuctions = auctions.filter(a => new Date(a.biddingEndTime) < now);

  return (
    <main className="px-6 py-10">
      <h1 className="text-3xl font-bold text-end mb-6">Auctions</h1>

      {/* Current Auctions */}
      {currentAuctions.length > 0 && (
        <section className="mb-12 max_width ">
          <h2 className="text-2xl font-semibold mb-4">Current Auctions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {currentAuctions.map(auction => (
              <AuctionCard key={auction._id} auction={auction} />
            ))}
          </div>
        </section>
      )}

      {/* Upcoming Auctions */}
      {upcomingAuctions.length > 0 && (
        <section className="mb-12 max_width">
          <h2 className="text-2xl font-semibold mb-4">Upcoming Auctions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {upcomingAuctions.map(auction => (
              <AuctionCard key={auction._id} auction={auction} />
            ))}
          </div>
        </section>
      )}

      {/* Past Auctions */}
      {pastAuctions.length > 0 && (
        <section className="max_width">
          <h2 className="text-2xl font-semibold mb-4">Past Auctions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {pastAuctions.map(auction => (
              <AuctionCard key={auction._id} auction={auction} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
