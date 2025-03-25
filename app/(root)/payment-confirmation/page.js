"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { FaCheckCircle, FaTimesCircle, FaHome, FaSpinner } from "react-icons/fa";

export default function PaymentConfirmation() {
  const searchParams = useSearchParams();
  const referenceParams = searchParams.getAll('reference');
  const reference = referenceParams[referenceParams.length - 1];
  const trxref = searchParams.get('trxref');

  const [isLoading, setIsLoading] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (reference && reference !== "{reference}") {
      const verifyPayment = async () => {
        try {
          const response = await axios.get(
            `https://api.paystack.co/transaction/verify/${reference}`,
            {
              headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_PAYSTACK_SECRET_KEY}`,
              },
            }
          );

          const data = response.data;

          if (data.status && data.data.status === "success") {
            setPaymentStatus("Payment was successful! Thank you for your purchase.");
            setIsSuccess(true);
            toast.success("Payment successful! Thank you.");
          } else {
            setPaymentStatus("There was an issue with the payment. Please try again.");
            setIsSuccess(false);
            toast.error("Payment failed. Please check your payment method.");
          }
        } catch (error) {
          console.error("Error verifying payment:", error);
          setPaymentStatus("An error occurred. Please try again later.");
          setIsSuccess(false);
          toast.error("Error verifying payment.");
        } finally {
          setIsLoading(false);
        }
      };

      verifyPayment();
    } else {
      setIsLoading(false);
      setPaymentStatus("No valid payment reference found.");
      setIsSuccess(false);
    }
  }, [reference]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md w-full">
          <div className="flex justify-center mb-6">
            <FaSpinner className="animate-spin text-blue-600 text-4xl" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Processing Payment</h2>
          <p className="text-gray-600">Please wait while we verify your transaction...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="p-8">
          <div className="flex flex-col items-center">
            {isSuccess ? (
              <div className="mb-6 p-4 bg-green-100 rounded-full">
                <FaCheckCircle className="text-green-600 text-5xl" />
              </div>
            ) : (
              <div className="mb-6 p-4 bg-red-100 rounded-full">
                <FaTimesCircle className="text-red-600 text-5xl" />
              </div>
            )}
            
            <h1 className="text-2xl font-bold text-gray-900 mb-4 text-center">
              Payment Confirmation
            </h1>
            
            <div className="text-center mb-8">
              {paymentStatus ? (
                <p className={`text-lg ${isSuccess ? 'text-green-600' : 'text-red-600'}`}>
                  {paymentStatus}
                </p>
              ) : (
                <p className="text-lg text-red-600">
                  There was an issue. Please try again later.
                </p>
              )}
            </div>

            <div className="w-full">
              <button
                onClick={() => window.location.href = "/"}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
              >
                <FaHome />
                Return to Homepage
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}