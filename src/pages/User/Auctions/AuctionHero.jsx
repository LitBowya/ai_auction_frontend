const AuctionHero = () => {
    return (
        <section
            className="relative w-full min-h-[50vh] lg:min-h-[75vh] text-white flex flex-col items-center justify-center px-4 py-32 lg:py-32">
            {/* Background Image */}
            <div
                className="absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat"
                style={{backgroundImage: "url('/images/art.jpg')"}}
            >
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/50"/>
            </div>

            {/* Content Container */}
            <div className="max-width text-center flex flex-col items-center relative z-10">
                {/* Badge */}
                <span
                    className="bg-secondary heading-6 text-primary px-6 py-2 rounded-full text-sm mb-8 font-bold tracking-wide">
          Premium Auctions
        </span>

                {/* Main Heading */}
                <h1 className="heading-1 text-heading max-w-5xl mb-8">
                    Discover Rare & Exclusive Digital Assets
                </h1>

                {/* Subtext */}
                <p className="heading-5 max-w-2xl mb-12">
                    Participate in curated NFT auctions featuring unique digital art,
                    collectibles, and blockchain assets from leading creators worldwide.
                </p>

            </div>
        </section>
    )
};

export default AuctionHero;
