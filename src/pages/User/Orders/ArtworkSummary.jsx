// components/order/ArtworkSummary.js
import React from 'react';
import {FiDollarSign, FiCalendar, FiBox} from 'react-icons/fi';

// components/ArtworkSummary.js
const ArtworkSummary = ({auction}) => {
    return (
        <div className="flex items-start gap-6">
            <img
                src={auction.artwork.imageUrl[0].url}
                alt={auction.artwork.title}
                className="w-32 h-32 object-cover rounded-lg shadow-sm border border-gray-200"
            />

            <div className="flex-1">
                <h2 className="text-xl font-semibold mb-2">{auction.artwork.title}</h2>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {auction.artwork.description}
                </p>

                <div className="grid gap-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <FiCalendar className="text-gray-500"/>
                        <span>Auction ended: {new Date(auction.updatedAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <FiBox className="text-gray-500"/>
                        <span>Delivery method: Standard Shipping</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArtworkSummary;
