// pages/OrdersPage.js
import React from 'react';
import {useSelector} from 'react-redux';
import {FiPackage, FiBox, FiMapPin, FiCreditCard, FiInfo, FiLock} from 'react-icons/fi';
import ArtworkSummary from './ArtworkSummary';
import ShippingSection from './ShippingSection';
import PaymentSection from './PaymentSection';

const OrdersPage = () => {
    const order = useSelector(state => state.order);
    const shipping = useSelector(state => state.shipping);

    return (
        <div className="min-h-screen bg-primary py-24 lg:py-32">
            <div className="max-width bg-gray-100 rounded-xl p-4">
                {/* Header Section */}
                <div className="mb-8 flex items-center justify-between bg-white rounded-xl p-6 shadow-sm">
                    <div className="flex items-center gap-4">
                        <FiPackage className="text-4xl text-primary-600"/>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Order Confirmation</h1>
                            <p className="text-gray-600 mt-1 flex items-center gap-2">
                                <FiInfo className="text-primary-500"/>
                                Review your order details before payment
                            </p>
                        </div>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid md:grid-cols-12 gap-8">
                    {/* Left Column - Artwork & Shipping */}
                    <div className="md:col-span-7 space-y-6">
                        {/* Artwork Summary Card */}
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <ArtworkSummary auction={order.auction}/>
                        </div>

                        {/* Shipping Card */}
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <FiMapPin className="text-2xl text-primary-600"/>
                                <h2 className="text-xl font-semibold">Shipping Information</h2>
                            </div>
                            <ShippingSection
                                shippingOptions={shipping.shippingOptions}
                                selectedShipping={shipping.selectedShipping}
                            />
                        </div>
                    </div>

                    {/* Right Column - Payment Summary */}
                    <div className="md:col-span-5">
                        <div className="sticky top-8 bg-white rounded-xl shadow-sm p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <FiCreditCard className="text-2xl text-primary-600"/>
                                <h2 className="text-xl font-semibold">Payment Summary</h2>
                            </div>

                            {/* Order Breakdown */}
                            <div className="mb-8 space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Artwork Price:</span>
                                    <span className="font-medium">GHC {order.auction.highestBid}</span>
                                </div>
                                <div className="border-t pt-4 flex justify-between items-center">
                                    <span className="text-lg font-semibold">Total Amount:</span>
                                    <span
                                        className="text-2xl font-bold text-primary-600">GHC {order.auctionPrice}</span>
                                </div>
                            </div>

                            {/* Payment Section */}
                            <PaymentSection
                                auctionId={order.auction._id}
                            />

                            {/* Security Assurance */}
                            <div
                                className="mt-6 pt-4 border-t border-gray-200 flex items-center gap-3 text-sm text-gray-500">
                                <FiLock className="text-primary-500"/>
                                <span>Your payment is securely processed with 256-bit encryption</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrdersPage;
