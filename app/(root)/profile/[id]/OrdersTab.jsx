"use client";
import Image from "next/image";

const OrdersTab = ({ orders }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Your Orders</h2>
            {orders.length > 0 ? (
                <ul className="space-y-4">
                    {orders.map((order) => (
                        <li key={order._id} className="border-b border-gray-200 pb-4">
                        {/* Ensure the imageUrl array is not empty and the first image exists */}
                        <Image 
                            src={order.auction.artwork.imageUrl && order.auction.artwork.imageUrl[0] ? order.auction.artwork.imageUrl[0].url : '/path/to/default-image.jpg'}
                            alt={order.auction.artwork.title || 'Artwork image'}
                            className="w-[125px] h-auto"
                            width={125}
                            height={125}
                        />
                        <p className="text-lg font-semibold">{order.auction.artwork.title}</p>
                        <p className="text-gray-600">Status: {order.status}</p>
                    </li>
                    
                    ))}
                </ul>
            ) : (
                <p>No orders found.</p>
            )}
        </div>
    );
};

export default OrdersTab;
