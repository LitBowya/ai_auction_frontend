import React from "react";
import useApi from "@/hooks/useApi";
import { FaCheckCircle, FaShippingFast } from "react-icons/fa";
import Error from "@/components/Error";

const PaymentTable = ({ payments, refetch }) => {
  // Update useApi hook URLs to accept dynamic values
  const { sendRequest: verifyPayment } = useApi("", "POST"); // General URL, will append auctionId
  const { sendRequest: confirmShipment } = useApi("", "PUT"); // General URL, will append paymentId

  if (!payments) {
    return <Error />;
  }

  const handleVerifyPayment = async (auctionId) => {
    try {
      const url = `/payments/${auctionId}/verify`; // Dynamically build the URL
      await verifyPayment(url); // Pass the dynamically created URL
      refetch(); // Refresh data after verifying payment
    } catch (error) {
      console.error("Error verifying payment:", error.message);
    }
  };

  const handleConfirmShipment = async (paymentId) => {
    try {
      const url = `/payments/${paymentId}/shipment`; // Dynamically build the URL
      await confirmShipment(url); // Pass the dynamically created URL
      refetch(); // Refresh data after confirming shipment
    } catch (error) {
      console.error("Error confirming shipment:", error.message);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden mt-10">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Buyer
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Amount
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {payments.map((payment) => (
            <tr key={payment._id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {payment.buyer.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                GHS {payment.amount.toFixed(2)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                {payment.status === "pending" && (
                  <button
                    onClick={() => handleVerifyPayment(payment.auction)}
                    className="text-green-500 cursor-pointer text-lg hover:text-green-700"
                  >
                    <FaCheckCircle />
                  </button>
                )}
                {payment.status === "paid" && (
                  <button
                    onClick={() => handleConfirmShipment(payment._id)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <FaShippingFast />
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentTable;
