async function fetchBids(auctionId) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/bid/${auctionId}`);
  
  if (!res.ok) return [];
  
  const data = await res.json();
  
  // Extract the bids array from the response
  return data.bids || [];
}

export default async function BidHistory({ auctionId }) {
  const bids = await fetchBids(auctionId);

  return (
    <div className="bg-white shadow-md p-4 rounded-lg">
      <h2 className="text-lg font-bold mb-4">Bid History</h2>
      {bids.length > 0 ? (
        <ul className="space-y-2">
          {bids.map((bid) => (
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
}