import { Button } from "../../../components/Button";
import { FaArrowAltCircleRight, FaHammer, FaCertificate } from "react-icons/fa";

export default function HeroSection() {
    return (
        <section className="relative w-full min-h-[60vh] lg:min-h-[85vh] text-white flex flex-col items-center justify-center px-4 py-28 lg:py-36 overflow-hidden">
            {/* Background Image - Changed to sculpture */}
            <div
                className="absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: "url('/images/art.jpg')" }}
            >
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-black/70"/>
            </div>

            {/* Floating Sculpture Elements */}
            <div className="absolute top-20 right-10 opacity-20 rotate-12">
                <div className="w-24 h-24 rounded-full border-2 border-gold" />
            </div>
            <div className="absolute bottom-1/4 left-5 opacity-15 -rotate-12">
                <div className="w-16 h-16 rounded-full border border-gold" />
            </div>

            {/* Content Container */}
            <div className="max-width text-center flex flex-col items-center relative z-10">
                {/* Badge */}
                <div className="flex flex-col items-center mb-8">
                    <span className="bg-gold text-dark px-6 py-2 rounded-full text-sm font-bold tracking-wide mb-3 flex items-center">
                        <FaCertificate className="mr-2" /> Authenticated Masterpieces
                    </span>
                    <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />
                </div>

                {/* Main Heading */}
                <h1 className="heading-1 text-heading max-w-5xl mb-6 font-bold">
                    <span className="block mb-3">Timeless Sculptures</span>
                    <span className="text-gold">From Masters of Form</span>
                </h1>

                {/* Subtext */}
                <p className="heading-5 max-w-2xl mb-10 text-light">
                    Discover extraordinary sculptures from renowned artists and emerging talents.
                    Each piece tells a unique story in stone, bronze, and mixed media.
                </p>

                {/* Stats Bar */}
                <div className="bg-dark/70 backdrop-blur-sm border border-light/10 rounded-xl px-8 py-4 mb-12 flex flex-wrap justify-center gap-10">
                    <div className="text-center">
                        <div className="text-3xl font-bold text-gold">200+</div>
                        <div className="text-sm text-light">Timeless Sculptures</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-gold">1,500+</div>
                        <div className="text-sm text-light">Unique Pieces</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-gold">98%</div>
                        <div className="text-sm text-light">Verified Provenance</div>
                    </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex gap-6 flex-wrap justify-center">
                    <Button
                        as="a"
                        href="/auctions"
                        iconLeft={<FaArrowAltCircleRight size={18} />}
                        className="bg-gold text-dark font-bold hover:bg-light-gold transition-all transform hover:scale-105"
                    >
                        View Current Auctions
                    </Button>

                </div>

                {/* Additional Text */}
                <p className="mt-12 max-w-2xl text-sm text-light/80 border-t border-light/10 pt-6">
                    Featured in prestigious collections worldwide. Each sculpture undergoes rigorous
                    authentication and comes with lifetime provenance documentation.
                </p>
            </div>
        </section>
    );
}
