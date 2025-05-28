import {
    FiCheckCircle,
    FiClock,
    FiCreditCard,
    FiCalendar,
} from "react-icons/fi";

const PaymentsTab = ({payments}) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md max_width">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
                Payment History
            </h2>

            {payments && payments.length > 0 ? (
                <div className="space-y-4">
                    {payments.map((payment) => {
                        const statusColors = {
                            completed: "bg-green-100 text-green-800",
                            pending: "bg-yellow-100 text-yellow-800",
                            failed: "bg-red-100 text-red-800",
                            refunded: "bg-blue-100 text-blue-800",
                        };

                        const paymentDate = new Date(payment.createdAt).toLocaleDateString(
                            "en-GB",
                            {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                            }
                        );

                        const artworkImage =
                            payment.auction?.artwork?.imageUrl?.[0]?.url ||
                            "/placeholder-art.jpg";

                        return (
                            <div
                                key={payment._id}
                                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                            >
                                <div className="flex flex-col md:flex-row gap-4 items-center">
                                    {/* Artwork Image */}
                                    <div className="flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden bg-gray-100">
                                        <img
                                            src={artworkImage}
                                            alt={payment.auction?.artwork?.title || "Artwork"}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    <div className="flex-grow">
                                        <div
                                            className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                            <div>
                                                <h3 className="text-lg font-bold text-gray-800">
                                                    {payment.auction?.artwork?.title ||
                                                        "Untitled Auction"}
                                                </h3>
                                                <div className="flex items-center gap-4 mt-2 flex-wrap">
                          <span
                              className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  statusColors[payment.status] ||
                                  "bg-gray-100 text-gray-800"
                              }`}
                          >
                            {payment.status}
                          </span>
                                                    <span className="text-sm text-gray-600 flex items-center">
                            <FiCalendar className="mr-1.5" size={14}/>
                                                        {paymentDate}
                          </span>
                                                </div>
                                            </div>

                                            <div className="flex flex-col items-end">
                                                <div className="text-xl font-bold text-gray-900 flex items-center">
                                                    GHS {payment.amount.toFixed(2)}
                                                </div>
                                                <div className="text-sm text-gray-500 mt-1 flex items-center">
                                                    <FiCreditCard className="mr-1.5" size={14}/>
                                                    {payment.method || "Payment method not specified"}
                                                </div>
                                            </div>
                                        </div>

                                        {payment.transactionId && (
                                            <div className="mt-3 pt-3 border-t border-gray-100">
                                                <p className="text-sm text-gray-600">
                                                    <span className="font-medium">Transaction ID:</span>{" "}
                                                    {payment.transactionId}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="text-center py-12">
                    <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                        <FiCreditCard size={32} className="text-gray-400"/>
                    </div>
                    <h3 className="text-lg font-medium text-gray-700">
                        No payment history
                    </h3>
                    <p className="text-gray-500 mt-1">
                        Your completed payments will appear here
                    </p>
                </div>
            )}
        </div>
    );
};

export default PaymentsTab;
