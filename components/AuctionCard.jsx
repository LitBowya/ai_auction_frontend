"use client";

import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "./Button";
import { FaArrowRight, FaGavel } from "react-icons/fa";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const AuctionCard = ({ auction }) => {
  const cardRef = useRef(null);
  const router = useRouter()

  useGSAP(() => {
    // Scroll-triggered animation
    gsap.from(cardRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      scrollTrigger: {
        trigger: cardRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    });
  }, []);

  return (
    <div
      ref={cardRef}
      className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
    >
      {/* Image */}
      <div className="relative h-48 w-full">
        {auction.artwork?.imageUrl?.[0]?.url ? (
          <Image
            src={auction.artwork.imageUrl[0].url}
            alt={auction.artwork?.title || "Auction Image"}
            width={250}
            height={300}
            className="rounded-lg object-cover h-[100%] w-full thumbnail"
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-gray-200">
            <p className="text-gray-500">No image available</p>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {auction.artwork?.title || "No title"}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-2 mb-4">
            {auction.artwork?.description || "No description"}
          </p>
        </div>

        {/* Auction Details */}
        <div className="flex flex-col mb-4">
          <div className="flex items-center gap-2">
            <FaGavel className="text-gray-500" />
            <span className="font-semibold text-gray-700">
              Starting Price:{" "}
              <span className="italic text-gray-500">
                GHS {auction.startingPrice ? auction.startingPrice : ""}
              </span>
            </span>
          </div>
          <span className="text-sm text-gray-500">
            Ends:{" "}
            {auction.biddingEndTime
              ? format(new Date(auction.biddingEndTime), "PPpp")
              : "No end date"}
          </span>
        </div>

        {/* Button */}
        <Button
          text="View Auction"
          icon={<FaArrowRight />}
          variant="danger"
          className="w-full"
          onClick={() => router.push(`/auction/${auction?._id}`)}
        />
      </div>
    </div>
  );
};

export default AuctionCard;
