import {useGetActiveAuctionsQuery} from "../../../redux/services/auctionApi.js";
import EmptyState from "../../../components/EmptyState.jsx";
import {format} from "date-fns";

const AuctionHero = () => {
    const {data, isLoading} = useGetActiveAuctionsQuery()
    const auctions = data?.data || []

    console.log(auctions)
    return (
        <section className="relative w-full min-h-[60vh] lg:min-h-[85vh] text-white flex flex-col items-center justify-center px-4 py-28 lg:py-36 overflow-hidden">
            {/* Background Image - Sculpture focused */}
            <div
                className="absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat"
                style={{backgroundImage: "url('/images/timeless.jpg')"}}
            >
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-black/70"/>
            </div>

            {/* Floating Sculpture Elements */}
            <div className="absolute top-20 right-10 opacity-20 rotate-12">
                <div className="w-24 h-24 rounded-full border-2 border-gold" />
            </div>
            <div className="absolute bottom-1/4 left-5 opacity-15 -rotate-12">
                <div className="w-16 h-16 rounded-full border border-gold" />
            </div>

            {/* Content Container */}
            <div className="max-width text-center flex flex-col items-center relative z-10">
                {/* Badge */}
                <div className="flex flex-col items-center mb-8">
                    <span className="bg-gold text-dark px-6 py-2 rounded-full text-sm font-bold tracking-wide mb-3">
                        LIVE AUCTIONS • ENDING SOON
                    </span>
                    <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />
                </div>

                {/* Main Heading */}
                <h1 className="heading-1 text-heading max-w-5xl mb-6 font-bold">
                    <span className="block mb-3">Masterpiece Sculpture Auctions</span>
                    <span className="text-gold">Timeless Art, Extraordinary Value</span>
                </h1>

                {/* Subtext */}
                <p className="heading-5 max-w-2xl mb-10 text-light">
                    Bid on exceptional sculptures from renowned artists and emerging talents.
                    Each piece is authenticated, curated, and presented with full provenance.
                </p>

                {/* Featured Auction Card */}
                <div className="bg-dark/70 backdrop-blur-sm border border-light/10 rounded-xl p-6 mb-10 max-w-2xl w-full text-left">

                    {
                        !auctions.length ? <EmptyState title={'No active auction found'} message={'Active auctions' +
                            ' not available.'} /> : (
                                auctions.slice(0,1).map((auction) => (
                                    <div key={auction._id} className="flex flex-col md:flex-row gap-6">
                                        <div className="flex-shrink-0">
                                            <div className=" border-2 border-gold/30 rounded-xl w-24 h-24" >
                                                <img src={auction?.artwork?.imageUrl[0]?.url} alt={auction?.artwork?.title} className={`w-full h-full rounded-xl object-cover`}/>
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-semibold mb-1">Featured Sculpture</h3>
                                            <p className="text-gold font-black mb-2">{auction?.artwork?.title}</p>
                                            <p className="text-gold mb-2 line-clamp-3">{auction?.artwork?.description}</p>
                                            <div className="flex items-center gap-4 mb-3">
                                                <div>
                                                    <div className="text-xs text-light/80">CURRENT BID</div>
                                                    <div className="text-lg font-bold text-gold">GHC {auction?.highestBid}</div>
                                                </div>
                                                <div>
                                                    <div className="text-xs text-light/80">AUCTION ENDS IN</div>
                                                    <div className="text-lg font-bold">{format(auction?.biddingEndTime, "PP")}</div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                ))
                        )
                    }

                </div>

                {/* Stats Bar */}
                <div className="flex flex-wrap justify-center gap-8 mb-12">
                    <div className="text-center">
                        <div className="text-3xl font-bold text-gold">42</div>
                        <div className="text-sm text-light">Active Auctions</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-gold">$1.2M</div>
                        <div className="text-sm text-light">Total Value</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-gold">98%</div>
                        <div className="text-sm text-light">Sell-Through Rate</div>
                    </div>
                </div>

                {/* Additional Text */}
                <p className="mt-12 max-w-2xl text-sm text-light/80 border-t border-light/10 pt-6">
                    All sculptures undergo rigorous authentication and come with lifetime provenance documentation.
                    <span className="block mt-2 font-medium text-gold">
                        Next premium auction: August 24, 2023 • 14:00 GMT
                    </span>
                </p>
            </div>

            {/* Bottom Decorative Element */}
            <div className="absolute bottom-0 left-0 right-0 h-16 flex justify-center items-end">
                <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />
            </div>
        </section>
    );
};

export default AuctionHero;
