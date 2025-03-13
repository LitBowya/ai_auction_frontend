import React from 'react'
import HeroSection from "@/sections/Home/HeroSection";
import AboutSection from '@/sections/Home/AboutSection';
import LatestAuctions from '@/sections/Home/LatestAuctionSection';
import PastAuctions from '@/sections/Home/PastAuctionSection';
import HighestBids from '@/sections/Home/HighestBidSection';
import CallToAction from '@/sections/Home/CallToActionSection';

const Home = () => {
    return (
        <div className={`relative`}>
            <HeroSection />
            <AboutSection />
            <LatestAuctions />
            <PastAuctions />
            <HighestBids />
            <CallToAction />
        </div>
    )
}
export default Home
