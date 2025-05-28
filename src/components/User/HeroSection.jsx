import React, {useRef} from "react";
import {useGSAP} from "@gsap/react";
import gsap from "gsap";

// Register GSAP Plugin
gsap.registerPlugin();

const HeroSection = ({title, subtitle, gradient}) => {
    const heroRef = useRef(null);
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);

    // GSAP Animation
    useGSAP(() => {
        gsap.from(titleRef.current, {opacity: 0, y: 50, duration: 1, delay: 0.2});
        gsap.from(subtitleRef.current, {opacity: 0, y: 30, duration: 1, delay: 0.4});
    }, []);

    return (
        <section
            ref={heroRef}
            className="relative py-32 lg:py-46 px-4 text-white overflow-hidden"
            style={{
                background: gradient || "linear-gradient(135deg, #8B0000 0%, #FF4136 100%)",
            }}
        >
            <div className="max-w-7xl mx-auto text-center relative z-10">
                <h1 ref={titleRef} className="text-5xl font-bold mb-4 text-white">
                    {title}
                </h1>
                <p ref={subtitleRef} className="text-xl">{subtitle}</p>
            </div>
        </section>
    );
};

export default HeroSection;
