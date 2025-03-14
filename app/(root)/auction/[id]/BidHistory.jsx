async function fetchBids(auctionId) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/bids/${auctionId}`);
    
    if (!res.ok) {
      console.error(`Error fetching bids: ${res.status}`);
      return [];
    }
    
    const data = await res.json();
    
    // Debug response structure
    console.log("Bids API response:", data);
    
    // Ensure `bids` is always an array
    return Array.isArray(data?.bids) ? data.bids : [];
  } catch (error) {
    console.error("Failed to fetch bids:", error);
    return [];
  }
}


export default async function BidHistory({ auctionId }) {
  // Add try/catch for the entire component
  try {
    // Check if auctionId exists
    if (!auctionId) {
      console.error("BidHistory: Missing auctionId prop");
      return <div>Missing auction ID</div>;
    }
    
    const bids = await fetchBids(auctionId);
    console.log("Processed bids array:", bids);
    
    // Extra defensive check that bids is definitely an array
    const safeArray = Array.isArray(bids) ? bids : [];
    
    return (
      <div className="bg-white shadow-md p-4 rounded-lg">
        <h2 className="text-lg font-bold mb-4">Bid History</h2>
        {safeArray.length > 0 ? (
          <ul className="space-y-2">
            {safeArray.map((bid) => (
              <li key={bid._id} className="flex justify-between border-b py-2">
                <span className="font-semibold">GHS {bid.amount}</span>
                <span className="text-gray-500 text-sm">{new Date(bid.createdAt).toLocaleString()}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No bids placed yet.</p>
        )}
      </div>
    );
  } catch (error) {
    console.error("Error in BidHistory component:", error);
    return <div>Failed to load bid history</div>;
  }
}