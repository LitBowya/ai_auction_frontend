"use client";

import React, {useRef, useState} from "react";
import gsap from "gsap";
import {useGSAP} from "@gsap/react";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {FaPaperPlane} from "react-icons/fa";
import Button from "@/components/Button";
import useApi from "@/hooks/useApi";
import {toast} from "sonner";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const SendMessageSection = () => {
    const sendMessageRef = useRef(null);
    const planeRef = useRef(null);

    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null)

    // ** Handle Ending Auction **
    const { sendRequest: sendMessage, loading: loadingMessage} = useApi(
        `/contact/send`,
        "POST"
    );

    useGSAP(() => {
        gsap.from(sendMessageRef.current, {
            opacity: 0,
            y: 50,
            duration: 1,
            scrollTrigger: {
                trigger: sendMessageRef.current,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse",
            },
        });

        gsap.to(planeRef.current, {
            x: 100,
            y: -50,
            repeat: -1,
            duration: 3,
            ease: "power1.inOut",
            yoyo: true,
        });
    }, []);

    // Handle Input Change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle Form Submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await sendMessage(formData)
            setFormData({ name: "", email: "", message: "" });
            toast.success('Message sent successfully.');
        } catch (err) {
            setError(err.message);
            toast.error(err.message);
            console.error(err)
        }

        setLoading(false);
    };

    return (
        <section ref={sendMessageRef} className="relative py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-950 text-white overflow-hidden mt-1">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-opacity-10 bg-[url('/pattern.svg')] bg-cover bg-center" style={{ pointerEvents: "none" }}></div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                {/* Left Side: Input Fields */}
                <div className="space-y-6">
                    <h2 className="text-4xl font-bold">Send Us a Message</h2>
                    <p className="text-lg">Have questions? Reach out to us, and we'll get back to you as soon as possible.</p>

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="flex flex-col space-y-4">
                            <input
                                type="text"
                                name="name"
                                placeholder="Your Name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full p-3 rounded-lg border border-white text-white placeholder-white bg-transparent focus:outline-none"
                                required
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Your Email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full p-3 rounded-lg border border-white text-white placeholder-white bg-transparent focus:outline-none"
                                required
                            />
                            <textarea
                                name="message"
                                placeholder="Your Message"
                                rows="4"
                                value={formData.message}
                                onChange={handleChange}
                                className="w-full p-3 rounded-lg border border-white text-white placeholder-white bg-transparent focus:outline-none"
                                required
                            ></textarea>
                        </div>

                        {/* Show success or error message */}

                        <Button type="submit" text={loading ? "Sending..." : "Send Message"} icon={<FaPaperPlane className="text-lg" />} variant="outline_white" disabled={loading} />
                    </form>
                </div>

                {/* Right Side: Plane Animation */}
                <div className="flex justify-center items-center">
                    <FaPaperPlane ref={planeRef} className="font-bold lg:text-[200px] max-md:text-[100px]" />
                </div>
            </div>
        </section>
    );
};

export default SendMessageSection;
