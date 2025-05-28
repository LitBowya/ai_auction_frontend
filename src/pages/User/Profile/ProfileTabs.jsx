import {useState} from "react";
import ProfileInfo from "./ProfileInfo.jsx";
import OrdersTab from "./OrdersTab.jsx";
import PaymentsTab from "./PaymentsTab.jsx";
import AuctionsTab from "./AuctionsTab.jsx";


export default function ProfileTabs({profile, orders, payments, auctions}) {
    // State to manage active tab
    const [activeTab, setActiveTab] = useState("orders");

    return (
        <div className="min-h-screen bg-primary py-24 lg:py-32">
            <div className="max-width bg-gray-200 p-8 rounded-lg">
                {/* Profile Info */}
                <ProfileInfo profile={profile}/>

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
                        {activeTab === "orders" && <OrdersTab orders={orders}/>}
                        {activeTab === "payments" && <PaymentsTab payments={payments}/>}
                        {activeTab === "auctions" && <AuctionsTab auctions={auctions}/>}
                    </div>
                </div>
            </div>
        </div>
    );
}
