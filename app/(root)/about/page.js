import React from 'react'
import HeroSection from "@/components/HeroSection";
import {FaBullseye, FaCheckCircle, FaEye, FaUsers} from "react-icons/fa";

const AboutUs = () => {
    return (
        <div>
            <HeroSection title={`Discover the Art of Auctioning`} subtitle={` Connecting Art Enthusiasts, One Bid at a Time`} gradient="linear-gradient(135deg, #8B0000 0%, #FF4136 100%)"/>

            {/* Sections */}
            <div className={`max_width my-10`}>
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Our Story */}
                    <div className="bg-white p-6 rounded-lg shadow-lg flex items-center gap-4">
                        <FaUsers className="text-red-600 text-4xl" />
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900">Our Story</h3>
                            <p className="text-gray-600 mt-2">
                                Founded with a passion for art, we bridge the gap between artists,
                                collectors, and enthusiasts in a secure auction space.
                            </p>
                        </div>
                    </div>

                    {/* Our Mission */}
                    <div className="bg-white p-6 rounded-lg shadow-lg flex items-center gap-4">
                        <FaBullseye className="text-red-600 text-4xl" />
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
                            <p className="text-gray-600 mt-2">
                                Bringing art and collectors together seamlessly through an
                                innovative, transparent, and user-friendly bidding experience.
                            </p>
                        </div>
                    </div>

                    {/* Our Vision */}
                    <div className="bg-white p-6 rounded-lg shadow-lg flex items-center gap-4">
                        <FaEye className="text-red-600 text-4xl" />
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900">Our Vision</h3>
                            <p className="text-gray-600 mt-2">
                                Shaping the future of digital art auctions with accessibility,
                                security, and innovation at the core.
                            </p>
                        </div>
                    </div>

                    {/* Why Choose Us */}
                    <div className="bg-white p-6 rounded-lg shadow-lg flex items-center gap-4">
                        <FaCheckCircle className="text-red-600 text-4xl" />
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900">Why Choose Us?</h3>
                            <p className="text-gray-600 mt-2">
                                Our secure, transparent, and engaging auction process ensures the
                                best experience for both buyers and sellers.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutUs
