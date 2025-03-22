"use client"; // Required for client-side interactivity

import {useState} from "react";
import ProfileInfo from "@/app/(root)/profile/[id]/ProfileInfo";
import OrdersTab from "@/app/(root)/profile/[id]/OrdersTab";
import PaymentsTab from "@/app/(root)/profile/[id]/PaymentsTab";
import AuctionsTab from "@/app/(root)/profile/[id]/AuctionsTab";

export default function ProfileTabs({ profile, orders, payments, auctions }) {
    // State to manage active tab
    const [activeTab, setActiveTab] = useState("orders");

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Profile Info */}
                <ProfileInfo profile={profile} />

                {/* Tabs Navigation */}
                <div className="mt-8">
                    <nav className="flex space-x-4 border-b border-gray-200 justify-center">
                        <button
                            className={`px-4 py-2 text-sm cursor-pointer font-medium ${
                                activeTab === "orders"
                                    ? "text-gray-900 border-b-2 border-indigo-500"
                                    : "text-gray-500 hover:text-gray-700"
                            }`}
                            onClick={() => setActiveTab("orders")}
                        >
                            Orders
                        </button>
                        <button
                            className={`px-4 py-2 text-sm cursor-pointer font-medium ${
                                activeTab === "payments"
                                    ? "text-gray-900 border-b-2 border-indigo-500"
                                    : "text-gray-500 hover:text-gray-700"
                            }`}
                            onClick={() => setActiveTab("payments")}
                        >
                            Payments
                        </button>
                        <button
                            className={`px-4 py-2 text-sm cursor-pointer font-medium ${
                                activeTab === "auctions"
                                    ? "text-gray-900 border-b-2 border-indigo-500"
                                    : "text-gray-500 hover:text-gray-700"
                            }`}
                            onClick={() => setActiveTab("auctions")}
                        >
                            Auctions
                        </button>
                    </nav>

                    {/* Tabs Content */}
                    <div className="mt-4">
                        {activeTab === "orders" && <OrdersTab orders={orders} />}
                        {activeTab === "payments" && <PaymentsTab payments={payments} />}
                        {activeTab === "auctions" && <AuctionsTab auctions={auctions} />}
                    </div>
                </div>
            </div>
        </div>
    );
}
