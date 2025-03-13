import Image from "next/image";

const AboutSection = () => {
  return (
    <section className="py-16 bg-gray-100 text-gray-800">
      <div className="max_width mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
        {/* Left Side: Text Content */}
        <div className="md:w-1/2 text-center md:text-left">
          <h2 className="text-4xl font-bold mb-4 text-gray-900">About ArtBid</h2>
          <p className="text-lg mb-6 leading-relaxed">
            Welcome to <span className="font-semibold">ArtBid</span>, the premier auction platform for art lovers and collectors.
            Discover exclusive artworks, place competitive bids, and connect with talented artists. Our platform offers **secure** transactions and a seamless **bidding experience** for everyone.
          </p>
          <a href="/auction" className="px-6 py-3 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition-all">
            Explore Auctions
          </a>
        </div>

        {/* Right Side: Images */}
        <div className="md:w-1/2 flex justify-center mt-8 md:mt-0 relative">
          <div className="relative w-[350px] h-[400px]">
            {/* Main Image */}
            <Image 
              src="/art1.jpeg" 
              alt="Auction Artwork"
              width={350}
              height={400}
              className="rounded-lg shadow-lg object-cover"
            />
            {/* Overlay Small Image */}
            <Image 
              src="/art2.jpeg" 
              alt="Bidding"
              width={150}
              height={150}
              className="absolute -bottom-10 -right-10 rounded-lg shadow-md border-4 border-white"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
