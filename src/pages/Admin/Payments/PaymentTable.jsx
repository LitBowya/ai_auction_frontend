

import React from "react";
import { FaCheckCircle, FaShippingFast } from "react-icons/fa";
import useApi from "../../../hooks/useApi.js";
import {toast} from "react-toastify";
import EmptyState from "../../../components/EmptyState.jsx";

const PaymentTable = ({ payments, refetch }) => {
  // Using specific methods from the new hook
  const { 
    postData: verifyPayment, 
    loading: verifyingPayment 
  } = useApi("/Payments");

  const { 
    putData: confirmShipment, 
    loading: confirmingShipment
  } = useApi("/Payments");

  const handleVerifyPayment = async (auctionId) => {
    try {
      toast.warning('Verifying payment...');
      await verifyPayment({}, {
        id: `${auctionId}/verify`
      });
      refetch();
      toast.success('Payment verified successfully');
    } catch (error) {
      const errorMsg = error.response?.data?.message || 
                      error.message || 
                      "Failed to verify payment";
      toast.error(errorMsg);
      console.error("Payment verification error:", errorMsg);
    }
  };

  const handleConfirmShipment = async (paymentId) => {
    try {
      if (!paymentId) {
        throw new Error("Payment ID is required");
      }

      toast.warning("Confirming shipment...");
      await confirmShipment({}, {
        id: `${paymentId}/shipment`,
      });
      
      refetch();
      window.location.reload()
      toast.success("Shipment confirmed successfully");
    } catch (error) {
      const errorMsg = error.response?.data?.message || 
                     error.message || 
                     "Failed to confirm shipment";
      toast.error(errorMsg);
      console.error("Shipment confirmation error:", errorMsg);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden mt-10">
      {!payments.length ? (<EmptyState title={`No payments found`} message={`Payments coming soon`}/>) : (<table className="min-w-full divide-y divide-gray-200">
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
                {payment.buyer?.name || "Unknown"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                GHS {payment.amount?.toFixed(2) || "0.00"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    payment.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                        payment.status === "paid" ? "bg-green-100 text-green-800" :
                            "bg-red-100 text-red-800"
                }`}>
                  {payment.status?.charAt(0).toUpperCase() + payment.status?.slice(1) || "Unknown"}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                {payment.status === "pending" && (
                    <button
                        onClick={() => handleVerifyPayment(payment.auction)}
                        disabled={verifyingPayment}
                        className="text-green-500 hover:text-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="Verify payment"
                    >
                      <FaCheckCircle className="text-lg" />
                    </button>
                )}
                {payment.status === "paid" && (
                    <button
                        onClick={() => handleConfirmShipment(payment._id)}
                        disabled={confirmingShipment}
                        className="text-blue-500 hover:text-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="Confirm shipment"
                    >
                      <FaShippingFast className="text-lg" />
                    </button>
                )}
              </td>
            </tr>
        ))}
        </tbody>
      </table>)}
    </div>
  );
};

export default PaymentTable;
