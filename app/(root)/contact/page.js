import HeroSection from '@/components/HeroSection'
import {FaEnvelope, FaMapMarkerAlt, FaPhone} from "react-icons/fa";

const ContactUs = () => {
    return (
        <div>
            <HeroSection title={`Get in Touch with Us`} subtitle={` We’re Here to Help – Reach Out Anytime`} gradient="linear-gradient(45deg, #D50000, #FF1744, #FF5252)"/>

            <div className={`max_width my-10`}>
                {/* Contact Info */}
                <div className="grid md:grid-cols-3 gap-8 text-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <FaPhone className="text-red-600 text-4xl mx-auto" />
                        <h3 className="text-xl font-semibold mt-4">Customer Support</h3>
                        <p className="text-gray-600 mt-2">+233 123 456 789</p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <FaEnvelope className="text-red-600 text-4xl mx-auto" />
                        <h3 className="text-xl font-semibold mt-4">Email Us</h3>
                        <p className="text-gray-600 mt-2">support@auctionplatform.com</p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <FaMapMarkerAlt className="text-red-600 text-4xl mx-auto" />
                        <h3 className="text-xl font-semibold mt-4">Visit Us</h3>
                        <p className="text-gray-600 mt-2">Accra, Ghana</p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ContactUs
