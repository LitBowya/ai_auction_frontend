"use client"; // Required for GSAP and ScrollTrigger

import React, {useRef} from "react";
import Image from "next/image";
import gsap from "gsap";
import {useGSAP} from "@gsap/react";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import HeaderTitle from "@/components/HeaderTitle";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const image1Ref = useRef(null);
  const image2Ref = useRef(null);
  const image3Ref = useRef(null);

  useGSAP(() => {
    // Animation for the About Us content
    gsap.from(contentRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      scrollTrigger: {
        trigger: sectionRef.current, // Trigger when the section enters the viewport
        start: "top 100%", // Start animation when the top of the section is top in the viewport
        end: "bottom bottom", // End animation when the bottom of the section is bottom in the viewport
        toggleActions: "play pause resume reset", // Play animation on enter, reverse on leave
      },
    });

    // Animation for the first image
    gsap.from(image1Ref.current, {
      opacity: 0,
      x: -100,
      rotate: -20,
      duration: 1,
      scrollTrigger: {
        trigger: sectionRef.current, // Trigger when the section enters the viewport
        start: "top 100%", // Start animation when the top of the section is top in the viewport
        end: "bottom bottom", // End animation when the bottom of the section is bottom in the viewport
        toggleActions: "play pause resume reset", // Play animation on enter, reverse on leave
      },
    });

    // Animation for the second image
    gsap.from(image2Ref.current, {
      opacity: 0,
      x: 100,
      rotate: 20,
      duration: 1,
      scrollTrigger: {
        trigger: sectionRef.current, // Trigger when the section enters the viewport
        start: "top 100%", // Start animation when the top of the section is top in the viewport
        end: "bottom bottom", // End animation when the bottom of the section is bottom in the viewport
        toggleActions: "play pause resume reset", // Play animation on enter, reverse on leave
      },
    });

    // Animation for the third image
    gsap.from(image3Ref.current, {
      opacity: 0,
      y: 100,
      duration: 1,
      scrollTrigger: {
        trigger: sectionRef.current, // Trigger when the section enters the viewport
        start: "top 100%", // Start animation when the top of the section is top in the viewport
        end: "bottom bottom", // End animation when the bottom of the section is bottom in the viewport
        toggleActions: "play pause resume reset", // Play animation on enter, reverse on leave
      },
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 px-4 bg-gray-100 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

        {/* Left Side: About Us Content */}
        <div ref={contentRef} className="space-y-6">
          
          <HeaderTitle first='About' second='Artbid' />
          <p className="text-lg text-gray-600">
            Welcome to ArtBid, your premier destination for discovering and
            bidding on unique artworks from talented artists around the world.
            Our mission is to connect art lovers with exceptional pieces while
            providing a seamless and enjoyable auction experience.
          </p>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-red-500 rounded-full"></span>
              Discover unique artworks from global artists.
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-red-500 rounded-full"></span>
              Participate in exciting and competitive auctions.
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-red-500 rounded-full"></span>
              Secure and easy-to-use bidding platform.
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-red-500 rounded-full"></span>
              Support emerging and established artists.
            </li>
          </ul>
        </div>

        {/* Right Side: Images with Hover Effects */}
        <div className="relative h-[400px] md:h-[500px]">
          {/* Main Image */}
          <div
            ref={image1Ref}
            className="absolute top-0 left-0 w-[70%] h-[70%] transform rotate-6 transition-all duration-500 ease-in-out hover:z-10 hover:scale-110"
          >
            <Image
              src="/about1.jpeg" // Replace with your image path
              alt="Artwork 1"
              width={400}
              height={500}
              className="rounded-lg shadow-2xl object-cover w-full h-full"
            />
          </div>
          {/* Overlapping Image */}
          <div
            ref={image2Ref}
            className="absolute bottom-0 right-0 w-[60%] h-[60%] transform -rotate-6 transition-all duration-500 ease-in-out hover:z-10 hover:scale-110"
          >
            <Image
              src="/about2.jpeg" // Replace with your image path
              alt="Artwork 2"
              width={350}
              height={450}
              className="rounded-lg shadow-2xl object-cover w-full h-full"
            />
          </div>
          {/* Third Image */}
          <div
            ref={image3Ref}
            className="absolute bottom-0 left-0 transform -translate-x-1/2 -translate-y-1/2 w-[38%] h-[35%] transition-all duration-500 ease-in-out hover:z-10 hover:scale-110"
          >
            <Image
              src="/about3.jpeg" // Replace with your image path
              alt="Artwork 3"
              width={300}
              height={400}
              className="rounded-lg shadow-2xl object-cover w-full h-full"
            />
          </div>
          {/* Decorative Dots */}
          <div className="absolute -bottom-10 -left-10 w-20 h-20 bg-red-500 rounded-full opacity-20"></div>
          <div className="absolute -top-10 -right-10 w-24 h-24 bg-red-500 rounded-full opacity-20"></div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
