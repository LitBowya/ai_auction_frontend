import React from 'react';
import {useParams} from 'react-router-dom'; // Assuming you use React Router for route params

// Import RTK Query hooks
import {
    useGetUserProfileQuery,
    useGetUserOrdersQuery,
    useGetUserPaymentsQuery,
    useGetUserAuctionsQuery,
} from '../../../redux/services/userApi.js'; // Adjust path as needed

// Assuming these components are in your project structure:
import ErrorMessage from "../../../components/ErrorMessage.jsx"; // Adjust path
import Spinner from "../../../components/Spinner.jsx"; // Adjust path
import ProfileTabs from "./ProfileTabs"; // Adjust path (This is the component


const ProfilePage = () => {
    const {id: userId} = useParams(); // Get userId from URL, e.g., /profile/:id

    // Fetch user profile data
    const {
        data: profileData,
        isLoading: isLoadingProfile,
        isError: isErrorProfile,
        error: errorProfile,
    } = useGetUserProfileQuery(userId, {skip: !userId}); // Skip query if userId is not yet available

    // Fetch user orders
    const {
        data: ordersData,
        isLoading: isLoadingOrders,
        isError: isErrorOrders,
        error: errorOrders,
    } = useGetUserOrdersQuery(userId, {skip: !userId});

    // Fetch user payments
    const {
        data: paymentsData,
        isLoading: isLoadingPayments,
        isError: isErrorPayments,
        error: errorPayments,
    } = useGetUserPaymentsQuery(userId, {skip: !userId});

    // Fetch user auctions
    const {
        data: auctionsData,
        isLoading: isLoadingAuctions,
        isError: isErrorAuctions,
        error: errorAuctions,
    } = useGetUserAuctionsQuery(userId, {skip: !userId});

    // Consolidate loading states
    const isLoading = isLoadingProfile || isLoadingOrders || isLoadingPayments || isLoadingAuctions;

    if (!userId) {
        // This can happen if the route is not set up correctly or ID is missing
        return <ErrorMessage message="User ID is missing. Cannot load profile."/>;
    }

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Spinner/>
            </div>
        );
    }

    // Consolidate error states - you might want to handle these more granularly
    if (isErrorProfile || isErrorOrders || isErrorPayments || isErrorAuctions) {
        // You can display specific messages or a general one
        let errorMessage = "An error occurred while loading user data. ";
        if (isErrorProfile) errorMessage += `Profile: ${errorProfile?.data?.message || errorProfile?.message || 'Unknown error'}. `;
        if (isErrorOrders) errorMessage += `Orders: ${errorOrders?.data?.message || errorOrders?.message || 'Unknown error'}. `;
        if (isErrorPayments) errorMessage += `Payments: ${errorPayments?.data?.message || errorPayments?.message || 'Unknown error'}. `;
        if (isErrorAuctions) errorMessage += `Auctions: ${errorAuctions?.data?.message || errorAuctions?.message || 'Unknown error'}. `;

        return (
            <div className="container mx-auto p-4">
                <ErrorMessage message={errorMessage}/>
                {/* Optionally, provide a retry mechanism or specific guidance */}
            </div>
        );
    }

    return (
        <div className="bg-primary">
            <ProfileTabs
                profile={profileData?.user}
                orders={ordersData?.orders}
                payments={paymentsData?.payments}
                auctions={auctionsData?.auctions}
                userId={userId} // Pass userId if ProfileTabs needs it for any actions
            />
        </div>
    );
};

export default ProfilePage;
