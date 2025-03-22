import CallToActionSection from '@/section/Home/CallToAction'
import React from 'react'
import SendMessageSection from "@/section/Home/SendMessageSection";
import HeroSection from "@/section/Home/HeroSection";
import AboutSection from "@/section/Home/AboutSection";


const Home = () => {
    return (
        <div className={`relative`}>
           <HeroSection />
           <AboutSection />
           <CallToActionSection />
            <SendMessageSection />
        </div>
    )
}
export default Home
