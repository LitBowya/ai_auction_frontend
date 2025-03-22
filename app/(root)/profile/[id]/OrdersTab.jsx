"use client";

const OrdersTab = ({ orders }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Your Orders</h2>
            {orders.length > 0 ? (
                <ul className="space-y-4">
                    {orders.map((order) => (
                        <li key={order._id} className="border-b border-gray-200 pb-4">
                            <p className="text-lg font-semibold">{order.auction.title}</p>
                            <p className="text-gray-600">Amount: GHS {order.amount}</p>
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
