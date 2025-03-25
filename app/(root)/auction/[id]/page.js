import AuctionDetail from "@/section/AuctionDetails/AuctionDetail";

export default async function AuctionDetails({ params }) {
  try {
    // Fetch auction details using params.id
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auctions/${params.id}`,
      {
        cache: "no-store"
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch auction: ${response.statusText}`);
    }

    const data = await response.json();
    const auctionDetails = data.data; // Adjust this based on API response

    return <AuctionDetail auction={auctionDetails} />;
  } catch (error) {
    console.error("Error fetching auction details:", error);
    return <p className="text-red-500 text-center mt-4">Auction not found.</p>;
  }
}
