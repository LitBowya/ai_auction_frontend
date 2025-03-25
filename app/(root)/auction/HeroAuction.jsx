"use client";

import React, {useRef, useState} from "react";
import {useGSAP} from "@gsap/react";
import Image from "next/image";
import gsap from "gsap";
import {useSwipeable} from "react-swipeable";
import {format} from "date-fns";
import {FaArrowRight, FaClock, FaDollarSign, FaGavel} from "react-icons/fa";
import {useRouter} from "next/navigation";
import Button from '@/components/Button'
import Error from '@/components/Error'


const HeroAuction = ({ auctions }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [bgImage, setBgImage] = useState(
        auctions[0]?.artwork?.imageUrl?.[0]?.url || null
    );
    const containerRef = useRef(null);
    const router = useRouter();

    if (!auctions || auctions.length === 0) {
        return <Error message="No auctions available" />;
    }

    useGSAP(() => {
        let ctx = gsap.context(() => {
            gsap.from(".thumbnail", {
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.3,
                ease: "power2.out",
            });
            gsap.from(".hero-desc, .hero-title, .hero-info", {
                y: 50,
                opacity: 0,
                duration: 0.8,
                ease: "power2.out",
                delay: 0.5,
            });
        });
        return () => ctx.revert();
    }, []);

    const handleAuctionSwitch = (index) => {
        if (index !== activeIndex) {
            gsap.to(".hero-bg-overlay", {
                opacity: 0,
                duration: 0.6,
                ease: "power2.inOut",
                onComplete: () => {
                    setBgImage(auctions[index]?.artwork?.imageUrl?.[0]?.url);
                    gsap.fromTo(
                        ".hero-bg-overlay",
                        { opacity: 0 },
                        { opacity: 1, duration: 0.8 }
                    );
                },
            });
            gsap.to(".hero-title, .hero-desc, .hero-info", {
                opacity: 0,
                y: 20,
                duration: 0.4,
                ease: "power2.inOut",
                onComplete: () => {
                    setActiveIndex(index);
                    gsap.fromTo(
                        ".hero-title, .hero-desc, .hero-info",
                        { opacity: 0, y: 20 },
                        { opacity: 1, y: 0, duration: 0.7 }
                    );
                },
            });
        }
    };

    const swipeHandlers = useSwipeable({
        onSwipedLeft: () =>
            handleAuctionSwitch((activeIndex + 1) % auctions.length),
        onSwipedRight: () =>
            handleAuctionSwitch(
                (activeIndex - 1 + auctions.length) % auctions.length
            ),
    });

    return (
        <section
            {...swipeHandlers}
            className="relative flex flex-col items-center justify-center py-28 text-center px-4 overflow-hidden"
        >
            <div
                className="absolute inset-0 hero-bg-overlay transition-opacity duration-500"
                style={{
                    backgroundImage: `url(${bgImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    opacity: 1,
                }}
            ></div>
            <div className="absolute inset-0 bg-black opacity-40"></div>

            <div
                className="max_width flex flex-col items-center justify-center text-center px-4 relative z-10"
                ref={containerRef}
            >
                <h1 className="text-4xl font-bold text-white hero-title">
                    {auctions[activeIndex]?.artwork?.title}
                </h1>
                <p className="text-lg text-gray-300 hero-desc">
                    {auctions[activeIndex]?.artwork?.description}
                </p>

                <div className="hero-info mt-4 flex flex-col items-center text-white space-y-2">
                    <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-10 items-center text-lg">
                        <p className="flex items-center gap-2">
                            <FaClock /> Start:{" "}
                            {format(new Date(auctions[activeIndex]?.startingTime), "PPpp")}
                        </p>
                        <p className="flex items-center gap-2">
                            <FaClock /> Ends:{" "}
                            {format(new Date(auctions[activeIndex]?.biddingEndTime), "PPpp")}
                        </p>
                    </div>
                    <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-10 items-center text-lg">
                        <p className="flex items-center gap-2">
                            <FaDollarSign /> Starting Price: GHS{" "}
                            {auctions[activeIndex]?.startingPrice}
                        </p>
                        <p className="flex items-center gap-2">
                            <FaGavel /> Max Bid Limit: GHS{" "}
                            {auctions[activeIndex]?.maxBidLimit}
                        </p>
                    </div>
                    <p className="flex items-center gap-2 text-lg">
                        <FaGavel /> Highest Bid:
                        {`GHS ${auctions[activeIndex]?.highestBid}` || "No bids yet"}
                    </p>
                </div>

                <Button
                    onClick={() => router.push(`/auction/${auctions[activeIndex]?._id}`)}
                    variant="danger"
                    text="View Auction"
                    icon={<FaArrowRight />}
                />

                {/* Swipeable Carousel for Mobile */}
                <div className="md:hidden w-full relative mt-6">
                    <div className="flex overflow-hidden">
                        {auctions.map((auction, index) => (
                            <div
                                key={auction._id}
                                className="min-w-full transition-transform duration-300"
                                style={{
                                    transform: `translateX(-${activeIndex * 100}%)`,
                                }}
                            >
                                <Image
                                    src={auction.artwork?.imageUrl?.[0]?.url || null}
                                    alt={auction.artwork?.title}
                                    width={300}
                                    height={400}
                                    className="rounded-lg object-cover w-full h-[200px]"
                                />
                            </div>
                        ))}
                    </div>

                    {/* Indicators */}
                    <div className="flex justify-center space-x-2 mt-4">
                        {auctions.map((_, index) => (
                            <button
                                key={index}
                                className={`w-2 h-2 rounded-full ${
                                    index === activeIndex ? "bg-white" : "bg-gray-400"
                                }`}
                                onClick={() => handleAuctionSwitch(index)}
                            ></button>
                        ))}
                    </div>
                </div>

                {/* Grid Layout for Desktop */}
                <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 items-center justify-center gap-10 mt-6 z-10 max-w-6xl px-4">
                    {auctions.map((auction, index) => (
                        <div
                            key={auction._id}
                            className={`cursor-pointer transition-all duration-300 h-[200px] w-[150px] lg:h-[350px] lg:w-[300px] hover:scale-110 hover:opacity-100 ${
                                index === activeIndex
                                    ? "opacity-100 scale-110"
                                    : "opacity-60 scale-100"
                            }`}
                            onClick={() => handleAuctionSwitch(index)}
                        >
                            <Image
                                src={auction.artwork?.imageUrl?.[0]?.url || null}
                                alt={auction.artwork?.title}
                                width={250}
                                height={300}
                                className="rounded-lg object-cover h-full w-full thumbnail"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HeroAuction;
