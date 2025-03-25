import React from "react";
import Auctions from "./Auctions";
import HeroContent from "@/components/HeroContent";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default async function AuctionPage({ searchParams }) {
    const activePage = searchParams?.activePage || 1;
    const upcomingPage = searchParams?.upcomingPage || 1;
    const pastPage = searchParams?.pastPage || 1;

    // Fetch active, upcoming, and past auctions separately
    const [activeRes, upcomingRes, pastRes] = await Promise.all([
        fetch(`${API_URL}/auctions/all?page=${activePage}&limit=6&status=active`, { next: { revalidate: 1 } }),
        fetch(`${API_URL}/auctions/all?page=${upcomingPage}&limit=6&status=upcoming`, { next: { revalidate: 1 } }),
        fetch(`${API_URL}/auctions/all?page=${pastPage}&limit=6&status=past`, { next: { revalidate: 1 } }),
    ]);

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auctions/all`, {
        next: { revalidate: 1 }, // Ensures fresh data
    });

    if (!response.ok) {
        console.error("Failed to fetch auctions:", response);
        return null; // Handle error gracefully
    }

    const data = await response.json();
    const allAuctions = data.data;

    // Sort and limit auctions for each section
    const now = new Date();

    // Latest auctions (most recent 4)
    const latestAuctions = allAuctions
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 3);

    // Handle errors
    if (!activeRes.ok || !upcomingRes.ok || !pastRes.ok) {
        console.error("Error fetching auctions");
        return <div>Error loading auctions</div>;
    }

    // Parse JSON responses
    const [active, upcoming, past] = await Promise.all([
        activeRes.json(),
        upcomingRes.json(),
        pastRes.json(),
    ]);

    return (
        <div>
            <HeroContent auctions={latestAuctions}/>
            <Auctions active={active} upcoming={upcoming} past={past} />
        </div>
    );
}
