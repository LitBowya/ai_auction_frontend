import AuctionCard from "@/components/AuctionCard";

// // Add revalidation or dynamic rendering to avoid build-time errors
export const dynamic = 'force-dynamic'; // Skip static pre-rendering

// Fetch auctions from the API with proper error handling
async function fetchAuctions() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auction/all`, {
      // Add a reasonable timeout
      cache: 'no-store', // Don't cache responses during build
      next: { revalidate: 60 } // Revalidate every 60 seconds
    });

    if (!res.ok) {
      // Log the error for debugging
      console.error(`API error: ${res.status} ${res.statusText}`);
      return []; // Return empty array instead of crashing
    }

    return await res.json();
  } catch (error) {
    // Catch any other errors (network issues, parsing problems)
    console.error("Failed to fetch auctions:", error);
    return []; // Return empty array on any error
  }
}

export default async function AuctionPage() {
  // Safely get auctions, defaulting to empty array
  const auctions = await fetchAuctions() || [];

  console.log(auctions)

  // Separate auctions into categories
  const now = new Date();
  const currentAuctions = auctions.filter(a => new Date(a.startingTime) <= now && new Date(a.biddingEndTime) > now);
  const upcomingAuctions = auctions.filter(a => new Date(a.startingTime) > now);
  const pastAuctions = auctions.filter(a => new Date(a.biddingEndTime) < now);

  return (
    <main className="px-6 py-10">
      <h1 className="text-3xl font-bold text-end mb-6">Auctions</h1>

      {/* Show message if no auctions available */}
      {auctions.length === 0 && (
        <div className="text-center py-10">
          <p className="text-lg text-gray-600">
            No auctions available at the moment. Please check back later.
          </p>
        </div>
      )}

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