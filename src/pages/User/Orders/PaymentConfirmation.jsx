// pages/PaymentConfirmation.js
import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {useVerifyPaymentMutation} from "../../../redux/services/paymentApi";
import Spinner from "../../../components/Spinner";
import {FiCheckCircle, FiClock, FiDollarSign, FiHome, FiMail, FiXCircle} from "react-icons/fi";
import {toast} from "react-toastify";
import {useSelector, useDispatch} from "react-redux";
import {resetShipping} from "../../../redux/slices/shippingSlice.js";
import {clearOrder} from "../../../redux/slices/orderSlice.js";

import {MdOutlineReceipt} from "react-icons/md";

const PaymentConfirmation = () => {
    const auctionId = useSelector((state) => state.order.auction._id);
    const location = useLocation();
    const navigate = useNavigate();
    const [verifyPayment] = useVerifyPaymentMutation();
    const [status, setStatus] = useState("pending"); // 'pending', 'success', 'failed'
    const dispatch = useDispatch();

    const shipping = useSelector((state) => state.shipping);
    const shippingId = shipping.selectedShipping;
    const user = useSelector((state) => state.auth.user);

    const goHome = () => {
        dispatch(resetShipping());
        dispatch(clearOrder());
        navigate("/")
    }


    useEffect(() => {
        const reference = new URLSearchParams(location.search).get("reference");

        if (!reference || !auctionId) {
            setStatus("failed");
            toast.error("Missing reference or auction ID.");
            return;
        }

        const verify = async () => {
            try {
                const response = await verifyPayment({auctionId, reference, shippingId}).unwrap();
                if (response.success) {
                    setStatus("success");
                    toast.success("Payment verified successfully!");

                } else {
                    setStatus("failed");
                    toast.error(response.message || "Payment verification failed.");
                }
            } catch (err) {
                console.error("Verification error:", err);
                setStatus("failed");
                toast.error(err?.data?.message || "Payment verification failed.");
            }
        };

        verify();
    }, [auctionId, location.search, shippingId, verifyPayment]);

    if (status === "pending") {
        return (
            <div className={`bg-primary min-h-screen`}>
                <div className="flex flex-col items-center justify-center p-8">
                    <Spinner size={72}/>
                    <p className="mt-4 text-white text-lg">Verifying your payment...</p>
                </div>
            </div>
        );
    }

    if (status === "success") {
        return (
            <div
                className="min-h-screen bg-gradient-to-br from-emerald-100 to-green-50 flex items-center justify-center p-4">
                <div
                    className="max-w-lg w-full rounded-2xl bg-white shadow-2xl p-8 text-green-800 relative overflow-hidden">
                    {/* Decorative elements */}
                    <div className="absolute -top-20 -right-20 w-40 h-40 bg-green-100 rounded-full opacity-30"/>
                    <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-emerald-100 rounded-full opacity-30"/>

                    {/* Main content */}
                    <div className="relative z-10 flex flex-col items-center">
                        {/* Animated check icon */}
                        <div className="mb-6 animate-pulse">
                            <div className="relative">
                                <FiCheckCircle className="text-7xl text-green-600"/>
                                <div
                                    className="absolute inset-0 border-4 border-green-200 rounded-full animate-ping opacity-75"/>
                            </div>
                        </div>

                        {/* Heading */}
                        <h2 className="text-3xl font-bold mb-2 text-center">
                            Payment Processed Successfully! 🎉
                        </h2>

                        {/* Details */}
                        <div className="w-full space-y-4 mb-8">


                            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                                <FiClock className="text-2xl text-green-600 flex-shrink-0"/>
                                <div>
                                    <p className="font-medium">Processing Time:</p>
                                    <p className="text-sm text-gray-600">Instant confirmation</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                                <FiMail className="text-2xl text-green-600 flex-shrink-0"/>
                                <div>
                                    <p className="font-medium">Receipt Sent To:</p>
                                    <p className="text-sm text-gray-600">{user.email}</p>
                                </div>
                            </div>
                        </div>

                        {/* Next steps */}
                        <div className="text-center mb-8">
                            <h3 className="font-semibold text-lg mb-3">What's Next?</h3>
                            <p className="text-gray-600 text-sm">
                                Your item will be prepared for shipping within 48 hours.
                                You'll receive tracking information via email once dispatched.
                            </p>
                        </div>

                        {/* Action button */}
                        <button
                            onClick={goHome}
                            className="w-full max-w-xs bg-green-600 hover:bg-green-700 text-white py-3 px-8 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2"
                        >
                            <FiHome className="text-xl"/>
                            Return to Homepage
                        </button>

                        {/* Support text */}
                        <p className="mt-6 text-sm text-gray-500 text-center">
                            Need help? Contact our support team at
                            <a href="mailto:support@auction.com" className="text-green-600 hover:underline ml-1">
                                support@auction.com
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-primary">
            <div className="max-w-md rounded-xl bg-white flex flex-col items-center justify-center p-8 text-red-700">
                <FiXCircle className="text-6xl mb-4"/>
                <h2 className="text-2xl font-bold mb-2">Payment Failed</h2>
                <p className="text-center">
                    We couldn't verify your payment. Please try again or contact support.
                </p>
                <button
                    onClick={goHome}
                    className="mt-6 bg-red-600 text-white py-2 px-6 rounded-lg hover:bg-red-700 transition-colors"
                >
                    Return to Home
                </button>
            </div>
        </div>
    );
};

export default PaymentConfirmation;
