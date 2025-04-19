import Error from "@/components/Error";
import ProfileTabs from "./ProfileTabs";

export default async function ProfilePage({ params }) {
    const { id } = params; // Extract id from URL parameters

    // Fetch user profile data
    const profileResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${id}/profile`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include", // Include cookies for authentication
            next: { revalidate: 1 }, // Revalidate data every 60 seconds
        }
    );
    const profileData = await profileResponse.json();


    // Fetch user orders
    const ordersResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${id}/orders`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            next: { revalidate: 1 },
        }
    );
    const ordersData = await ordersResponse.json();

    // Fetch user payments
    const paymentsResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${id}/payments`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            next: { revalidate: 1 },
        }
    );
    const paymentsData = await paymentsResponse.json();

    // Fetch user auctions
    const auctionsResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${id}/auctions`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            next: { revalidate: 1 },
        }
    );
    const auctionsData = await auctionsResponse.json();

    if(!auctionsData){
        return (<Error message="No auction data fetched"/>)
    }

    console.log(profileData)
    console.log(ordersData)
    console.log(paymentsData)
    console.log(auctionsData)

    // Pass all fetched data to the client-side component
    return (
        <ProfileTabs
            profile={profileData.user}
            orders={ordersData.orders}
            payments={paymentsData.payments}
            auctions={auctionsData.auctions}
        />
    );
}
