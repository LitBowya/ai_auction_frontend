import {FiAward, FiClock, FiBarChart2, FiCalendar} from "react-icons/fi";
import {Link} from "react-router-dom";

const AuctionsTab = ({auctions}) => {
    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'active':
                return 'bg-blue-100 text-blue-800';
            case 'completed':
                return 'bg-green-100 text-green-800';
            case 'cancelled':
                return 'bg-red-100 text-red-800';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md max_width">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">Your Auctions</h2>

            {auctions && auctions.length > 0 ? (
                <div className="grid gap-4">
                    {auctions.map((auction) => {
                        const artwork = auction.artwork || {};
                        const imageUrl = artwork.imageUrl?.[0]?.url;
                        const title = artwork.title || "Untitled Artwork";
                        const description = artwork.description || "No description available";
                        const bidCount = Array.isArray(auction.bids) ? auction.bids.length : 0;

                        const endDate = auction.biddingEndTime
                            ? new Date(auction.biddingEndTime).toLocaleDateString('en-GB', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                            })
                            : "N/A";

                        const daysLeft = auction.biddingEndTime
                            ? Math.ceil((new Date(auction.biddingEndTime) - new Date()) / (1000 * 60 * 60 * 24))
                            : 0;

                        const timeRemaining =
                            auction.status?.toLowerCase() === 'active' && daysLeft > 0
                                ? `${daysLeft} day${daysLeft === 1 ? '' : 's'} left`
                                : 'Auction ended';

                        return (
                            <div key={auction._id}
                                 className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                                <div className="flex flex-col md:flex-row gap-4">
                                    <div
                                        className="flex-shrink-0 w-full md:w-40 h-40 bg-gray-100 rounded-lg overflow-hidden">
                                        {imageUrl ? (
                                            <img
                                                src={imageUrl}
                                                alt={title}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div
                                                className="w-full h-full flex items-center justify-center text-gray-400">
                                                <FiAward size={32}/>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex-grow">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="text-xl font-bold text-gray-800">{title}</h3>
                                                <p className="text-gray-600">{description.substring(0, 60)}...</p>
                                            </div>
                                            <span
                                                className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(auction.status)}`}>
                        {auction.status || "Unknown"}
                      </span>
                                        </div>

                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 text-sm">
                                            <div className="flex items-center text-gray-600">
                        <span>
                          Highest Bid:{" "}
                            <span className="font-semibold">
                            GHS {Number(auction.highestBid || 0).toFixed(2)}
                          </span>
                        </span>
                                            </div>
                                            <div className="flex items-center text-gray-600">
                                                <FiBarChart2 className="mr-2"/>
                                                <span>{bidCount} {bidCount === 1 ? 'bid' : 'bids'}</span>
                                            </div>
                                            <div className="flex items-center text-gray-600">
                                                <FiCalendar className="mr-2"/>
                                                <span>Ends: {endDate}</span>
                                            </div>
                                            <div className="flex items-center text-gray-600">
                                                <FiClock className="mr-2"/>
                                                <span>{timeRemaining}</span>
                                            </div>
                                        </div>

                                        <div className="mt-4 flex gap-2">
                                            <Link
                                                to={`/auctions/${auction._id}`}
                                                className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md transition-colors"
                                            >
                                                View Auction
                                            </Link>
                                            {auction.status?.toLowerCase() === 'active' && (
                                                <button
                                                    className="text-sm border border-blue-600 text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-md transition-colors">
                                                    Manage
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="text-center py-12">
                    <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                        <FiAward size={32} className="text-gray-400"/>
                    </div>
                    <h3 className="text-lg font-medium text-gray-700">No auctions created yet</h3>
                    <p className="text-gray-500 mt-1">Your auction listings will appear here</p>
                </div>
            )}
        </div>
    );
};

export default AuctionsTab;
