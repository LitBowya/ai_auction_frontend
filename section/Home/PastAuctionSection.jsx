"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AuctionCard from "@/components/AuctionCard";
import Error from "@/components/Error";
import HeaderTitle from "@/components/HeaderTitle";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const PastAuctionSection = ({ auctions }) => {
  const sectionRef = useRef(null);

  useGSAP(() => {
    // Scroll-triggered animation for the section title
    gsap.from(".past-section-title", {
      opacity: 0,
      y: 50,
      duration: 1,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    });<>
    <Error message="No pst auctions" />
  </>

    // Scroll-triggered animation for the cards
    gsap.from(".auction-card", {
      opacity: 0,
      y: 50,
      stagger: 0.2,
      duration: 1,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    });
  }, []);

  return (
    <section ref={sectionRef} className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Title and Subtitle */}
        <div className="text-end mb-8">
        <HeaderTitle first='Past' second='Auctions' className='past-section-title' />
          <p className="text-lg text-gray-600">
            Explore Past Auctions
          </p>
        </div>

        {/* Auction Cards */}
        {auctions && auctions.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-center">
            {auctions.map((auction) => (
              <AuctionCard key={auction._id} auction={auction} />
            ))}
          </div>
        ) : (
          <div className="text-center">
            <Error message="No past auctions" />
          </div>
        )}
      </div>
    </section>
  );
};

export default PastAuctionSection;
