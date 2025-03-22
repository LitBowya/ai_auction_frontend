import HeroContent from "@/components/HeroContent";
import PastAuctionSection from "./PastAuctionSection";
import UpcomingAuctionSection from "./UpcomingAuctionSection";
import ActiveAuctionSection from "./ActiveAuctionSection";

export default async function HeroSection() {
  // Fetch all auctions
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auction/all`, {
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
    .slice(0, 4);

  // Past auctions (ended auctions, limit to 4)
  const pastAuctions = allAuctions
    .filter((auction) => new Date(auction.biddingEndTime) < now)
    .slice(0, 4);

  // Upcoming auctions (not yet started, limit to 4)
  const upcomingAuctions = allAuctions
    .filter((auction) => new Date(auction.startingTime) > now)
    .slice(0, 4);

  // Active auctions (currently ongoing, limit to 4)
  const activeAuctions = allAuctions
    .filter(
      (auction) =>
        new Date(auction.startingTime) <= now &&
        new Date(auction.biddingEndTime) >= now
    )
    .slice(0, 4);

  return (
    <>
      <HeroContent auctions={latestAuctions} />
      <PastAuctionSection auctions={pastAuctions} />
      <UpcomingAuctionSection auctions={upcomingAuctions} />
      <ActiveAuctionSection auctions={activeAuctions} />
    </>
  );
}