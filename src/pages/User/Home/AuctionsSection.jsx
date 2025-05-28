import { useGetAllAuctionsQuery } from "../../../redux/services/auctionApi";
import EmptyState from "../../../components/EmptyState";
import AuctionCard from "../../../components/User/AuctionCard.jsx"; // We'll extract the card to a separate component

const AuctionsSection = () => {
  const { data } = useGetAllAuctionsQuery();
  const auctions = data?.data || []

  const categorizeAuctions = (auctions) => {
    return {
      pending: auctions.filter(a => a.status === "pending"),
      active: auctions.filter(a => a.status === "active"),
      completed: auctions.filter(a => a.status === "completed")
    };
  };

  const categorized = categorizeAuctions(auctions);

  const getSectionTitle = (status) => {
    const titles = {
      pending: "Upcoming Auctions",
      active: "Active Auctions",
      completed: "Past Auctions"
    };
    return titles[status] || "Auctions";
  };

  const getEmptyStateMessage = (status) => {
    const messages = {
      pending: "No upcoming auctions scheduled",
      active: "No active auctions currently running",
      completed: "No past auctions to display"
    };
    return messages[status] || "No auctions found";
  };

  return (
      <section className={`py-16 lg:py-24 bg-primary`}>
        <div className="space-y-8 max-width">
          {Object.entries(categorized).map(([status, items]) => (
              <section key={status} className="space-y-4">
                <h2 className="heading-4 font-bold text-end text-secondary">
                  {getSectionTitle(status)}
                </h2>

                {items.length === 0 ? (
                    <EmptyState
                        title={getSectionTitle(status)}
                        message={getEmptyStateMessage(status)}
                    />
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {items.slice(0,3).map(auction => (
                          <AuctionCard
                              key={auction._id}
                              auction={auction}
                              statusLabel={getSectionTitle(status).replace(" Auctions", "")}
                          />
                      ))}
                    </div>
                )}
              </section>
          ))}
        </div>
      </section>
  );
};

export default AuctionsSection;
