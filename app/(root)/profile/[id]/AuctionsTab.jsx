"use client";

const AuctionsTab = ({ auctions }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Your Auctions</h2>
            {auctions.length > 0 ? (
                <ul className="space-y-4">
                    {auctions.map((auction) => (
                        <li key={auction._id} className="border-b border-gray-200 pb-4">
                            <p className="text-lg font-semibold">{auction.title}</p>
                            <p className="text-gray-600">Highest Bid: GHS {auction.highestBid}</p>
                            <p className="text-gray-600">Status: {auction.status}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No auctions found.</p>
            )}
        </div>
    );
};

export default AuctionsTab;
