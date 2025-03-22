"use client";

const PaymentsTab = ({ payments }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Your Payments</h2>
            {payments.length > 0 ? (
                <ul className="space-y-4">
                    {payments.map((payment) => (
                        <li key={payment._id} className="border-b border-gray-200 pb-4">
                            <p className="text-lg font-semibold">{payment.auction.title}</p>
                            <p className="text-gray-600">Amount: GHS {payment.amount}</p>
                            <p className="text-gray-600">Status: {payment.status}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No payments found.</p>
            )}
        </div>
    );
};

export default PaymentsTab;
