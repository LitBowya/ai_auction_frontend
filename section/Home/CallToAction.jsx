"use client";

import React, {useRef} from "react";
import gsap from "gsap";
import {useGSAP} from "@gsap/react";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import Button from "@/components/Button"; // Your custom Button component
import {FaArrowRight} from "react-icons/fa";
import {useRouter} from "next/navigation";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const CallToActionSection = () => {
  const ctaRef = useRef(null);
  const router = useRouter()

  useGSAP(() => {
    // Scroll-triggered animation for the CTA section
    gsap.from(ctaRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      scrollTrigger: {
        trigger: ctaRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    });
  }, []);

  return (
    <section
      ref={ctaRef}
      className="relative py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white overflow-hidden"
    >
      {/* Background Pattern (Optional) */}
      <div className="absolute inset-0 bg-opacity-10 bg-[url('/pattern.svg')] bg-cover bg-center"  style={{ pointerEvents: "none" }}></div>

      <div className="max-w-7xl mx-auto text-center">
        {/* Title */}
        <h2 className="text-4xl font-bold mb-4">
          Ready to Bid on Amazing Artworks?
        </h2>

        {/* Subtitle */}
        <p className="text-lg mb-8">
          Join ArtBid today and start exploring unique pieces from talented
          artists around the world. Register now to participate in exciting
          auctions!
        </p>

        {/* Button */}
        <Button
          text="Register Now"
          icon={<FaArrowRight />}
          variant="success"
          size="lg"
          className="mx-auto"
          onClick={() => (router.push('/register'))} // Redirect to registration page
        />
      </div>
    </section>
  );
};

export default CallToActionSection;
