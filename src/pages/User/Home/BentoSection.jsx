import {useEffect, useRef} from "react";
import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {useGSAP} from "@gsap/react";
import {
    FaUsers,
    FaHammer,
    FaPalette,
    FaMonument,
    FaAward,
} from "react-icons/fa";
// Assuming your RTK Query hooks are correctly set up and imported
// For example: import { useGetAllBidsQuery } from "./services/bidApi";
// Make sure the paths are correct for your project structure.
// Using placeholder imports if actual paths differ:
import {useGetAllBidsQuery} from "../../../redux/services/bidApi.js"; // Placeholder, adjust if needed
import {useGetAllAuctionsQuery} from "../../../redux/services/auctionApi.js"; // Placeholder, adjust if needed

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const BentoSection = () => {
    const containerRef = useRef(null);

    const {data: bidsData, isLoading: isLoadingBids} = useGetAllBidsQuery();
    const {data: auctionsData, isLoading: isLoadingAuctions} = useGetAllAuctionsQuery();

    // Calculate totalBidsDisplay
    let displayTotalBids;
    if (isLoadingBids) {
        displayTotalBids = "..."; // Loading indicator
    } else {
        const count = bidsData?.bids?.length;
        if (typeof count === 'number') {
            if (count >= 1000000) { // For millions
                displayTotalBids = `${(count / 1000000).toFixed(1)}M`;
            } else if (count >= 1000) { // For thousands (e.g., 1K, 1.2K, 10K)
                displayTotalBids = `${(count / 1000).toFixed(count % 1000 === 0 && count < 10000 ? 0 : 1)}K`;
            } else {
                displayTotalBids = count.toString();
            }
        } else {
            // Fallback if bidsData.bids is not an array or count is not a number
            // User's original fallback was 1000, which became "1K" after formatting.
            displayTotalBids = "1K";
        }
    }

    // Calculate highestAuction
    // This variable 'highestAuction' will store the auction object with the highest bid.
    // You can access its properties like highestAuction.name, highestAuction.highestBid etc.
    let highestAuction = null;
    if (!isLoadingAuctions && auctionsData?.data && Array.isArray(auctionsData.data) && auctionsData.data.length > 0) {
        const auctionsArray = auctionsData.data;
        let tempHighestAuction = null;
        let maxBid = -1; // Use -1 to correctly compare with 0 bids

        for (const auction of auctionsArray) {
            const currentBid = auction?.highestBid ?? 0; // Default to 0 if highestBid is null/undefined
            if (currentBid > maxBid) {
                maxBid = currentBid;
                tempHighestAuction = auction;
            }
        }
        highestAuction = tempHighestAuction;
    }

    const auctionBid = highestAuction?.highestBid;
    let formattedBid = "Bidding starting soon";
    if (isLoadingAuctions) {
        formattedBid = "Loading auctions...";
    } else if (typeof auctionBid === 'number' && auctionBid > 0) {
        formattedBid = `Current Bid: ${auctionBid.toLocaleString('en-GH', {
            style: 'currency',
            currency: 'GHS',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        })}`;
    } else if (highestAuction) {
        formattedBid = "Bidding starting soon";
    } else if (!isLoadingAuctions && (!auctionsData?.data || auctionsData.data.length === 0)) {
        formattedBid = "No live auctions currently.";
    }


    // GSAP animations
    useGSAP(
        () => {
            const items = gsap.utils.toArray(".grid-item");
            gsap.from(items, {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse",
                },
                opacity: 0,
                y: 50,
                scale: 0.9,
                duration: 1,
                ease: "power4.out",
                stagger: 0.2,
            });

            items.forEach((item) => {
                const hover = gsap.to(item, {scale: 1.03, duration: 0.3, paused: true});
                item.addEventListener("mouseenter", () => hover.play());
                item.addEventListener("mouseleave", () => hover.reverse());
            });
        },
        {scope: containerRef}
    );


    // Image error handler
    const handleImageError = (e) => {
        const target = e.target;
        // Determine placeholder dimensions
        const w = target.naturalWidth > 0 ? target.naturalWidth : (target.width > 0 ? target.width : 200);
        const h = target.naturalHeight > 0 ? target.naturalHeight : (target.height > 0 ? target.height : 200);
        target.src = `https://placehold.co/${w}x${h}/4A5568/E2E8F0?text=Not+Found`; // Darker placeholder
        target.alt = "Image not available"; // Update alt text
    };

    // Fallback image URLs (replace with actual paths or CDN links if available)
    const sculptureMainImg = "/images/timeless.jpg";
    const auctionHammerImg = "/images/live.webp";
    const sculptureWorkshopImg = "/images/upcoming.webp";


    return (
        <section ref={containerRef}
                 className="bg-gray-100 dark:bg-gray-900 py-12 md:py-20"> {/* Adjusted padding and background */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-xl"> {/* Standardized container */}
                <div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"> {/* Adjusted gap */}

                    {/* Main Featured Sculpture */}
                    <div
                        className="grid-item col-span-1 md:col-span-2 row-span-2 relative rounded-2xl md:rounded-3xl overflow-hidden group
                                   bg-gradient-to-br from-stone-700 to-amber-800
                                   min-h-[350px] sm:min-h-[400px] md:min-h-[450px] lg:min-h-[500px] flex flex-col justify-end">
                        <img
                            src={sculptureMainImg}
                            alt="Featured Sculpture"
                            className="w-full h-full object-cover absolute inset-0 transition-transform duration-500 ease-in-out group-hover:scale-105"
                            onError={handleImageError}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"/>
                        <div className="relative z-10 p-5 md:p-8">
                            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 md:mb-3 flex items-center">
                                <FaMonument className="inline-block mr-2 md:mr-3 text-amber-300"/>
                                Timeless Sculptures
                            </h3>
                            <p className="text-sm sm:text-base md:text-lg text-gray-200 max-w-lg">
                                Discover masterpieces in bronze, marble, and contemporary
                                materials from world-renowned artists.
                            </p>
                        </div>
                    </div>

                    {/* Active Bidders Card */}
                    <div
                        className="grid-item bg-gradient-to-tr from-amber-600 to-stone-800 rounded-2xl md:rounded-3xl p-5 md:p-6
                                   flex flex-col justify-center items-center text-center
                                   min-h-[180px] sm:min-h-[200px] md:h-auto">
                        <FaUsers className="text-3xl md:text-4xl text-amber-300 mb-2 md:mb-3"/>
                        <div className="text-4xl md:text-5xl font-bold text-white">{displayTotalBids}</div>
                        <p className="text-base md:text-lg text-amber-100 mt-1">Total Bids</p>
                    </div>

                    {/* Live Auction Card - Updated with dynamic data */}
                    <div
                        className="grid-item relative md:row-span-2 rounded-2xl md:rounded-3xl overflow-hidden group
                                   bg-gradient-to-br from-amber-700 to-stone-800
                                   min-h-[300px] sm:min-h-[380px] md:min-h-[450px] lg:min-h-[500px] flex flex-col justify-between">
                        <img
                            src={auctionHammerImg}
                            alt="Auction Event"
                            className="w-full h-full object-cover absolute inset-0 transition-transform duration-500 ease-in-out group-hover:scale-105"
                            onError={handleImageError}
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/70"/>
                        <div className="relative z-10 p-5 md:p-6 flex flex-col h-full">
                            <FaHammer
                                className="text-2xl md:text-3xl text-white mb-auto"/> {/* Pushes content below it down */}
                            <div className="mt-auto"> {/* Pushes this block to the bottom */}
                                <h3 className="text-xl md:text-2xl font-bold text-white mb-1 md:mb-2">
                                    Live Sculpture Auctions
                                </h3>
                                <p className="text-sm md:text-base text-gray-200">
                                    Immerse in the world of live auction
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Artist Spotlight */}
                    <div
                        className="grid-item col-span-1 relative rounded-2xl md:rounded-3xl overflow-hidden group
                                   bg-gradient-to-tr from-stone-700 to-amber-700
                                   min-h-[180px] sm:min-h-[200px] md:h-auto flex items-center">
                        <div
                            className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent opacity-50 group-hover:opacity-75 transition-opacity duration-300"/>
                        <div className="relative z-10 p-5 md:p-8 w-full flex justify-between items-center">
                            <div>
                                <FaPalette className="text-3xl md:text-4xl text-amber-300 mb-2 md:mb-4"/>
                                <h3 className="text-xl md:text-2xl font-bold text-white mb-1">
                                    Artist Spotlight
                                </h3>
                                <p className="text-sm md:text-base text-gray-200 max-w-xs">
                                    Featured sculptors and their creative processes.
                                </p>
                            </div>
                            <div className="text-4xl md:text-6xl font-bold text-white/20 hidden sm:block">🎨</div>
                        </div>
                    </div>

                    {/* Upcoming Events (Original: Art Beyond Time) */}
                    <div
                        className="grid-item relative rounded-2xl md:rounded-3xl overflow-hidden group
                                   bg-gradient-to-br from-stone-600 to-amber-700
                                   min-h-[300px] sm:min-h-[380px] md:min-h-[400px] flex flex-col justify-end">
                        <img
                            src={sculptureWorkshopImg}
                            alt="Sculpture Workshop"
                            className="w-full h-full object-cover absolute inset-0 transition-transform duration-500 ease-in-out group-hover:scale-105"
                            onError={handleImageError}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"/>
                        <div className="relative z-10 p-5 md:p-6">
                            <FaAward className="text-2xl md:text-3xl text-white mb-2"/>
                            <h3 className="text-xl md:text-2xl font-bold text-white mb-1">
                                Upcoming Events
                            </h3>
                            <p className="text-sm md:text-base text-gray-200">
                                Explore workshops, exhibitions, and artist talks.
                            </p>
                        </div>
                    </div>

                    {/* Historical Sales */}
                    <div
                        className="grid-item col-span-1 md:col-span-2 lg:col-span-3 relative rounded-2xl md:rounded-3xl overflow-hidden
                                   bg-gradient-to-tr from-amber-700 to-stone-800
                                   min-h-[150px] sm:min-h-[180px] md:h-auto flex flex-col justify-center items-center text-center p-5 md:p-6">
                        <div className="text-3xl md:text-4xl font-bold text-amber-300 mb-1 md:mb-2">
                            GHC {highestAuction?.highestBid}
                        </div>
                        <p className="text-base md:text-lg text-white">Record Sculpture Sale</p>
                        <p className="text-md md:text-lg text-amber-100 mt-1">
                            {highestAuction?.highestBidder?.name}
                        </p>
                        <p className="text-xs md:text-sm text-amber-100 mt-1">
                            {highestAuction?.artwork?.title}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BentoSection;
