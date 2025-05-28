import { Button } from "../../../components/Button";
import { FaArrowCircleRight } from "react-icons/fa";

export default function AboutSection() {
  return (
    <section className="w-full bg-primary py-24 text-gray-100 px-4 md:px-8 relative overflow-hidden">
      <div className="max-width grid md:grid-cols-2 gap-12 md:gap-16 lg:gap-24 items-center">
        {/* Image Grid */}
        <div className="grid grid-cols-8 grid-rows-6 gap-4 md:gap-6 h-[300px] md:h-[450px] xl:h-[600px]">
          {/* Main Image - Large area */}
          <div className="col-span-4 row-span-6 rounded-2xl overflow-hidden relative">
            <img
              src="https://cdn.shopify.com/s/files/1/0621/7207/0104/t/2/assets/description_image_hb_200178.jpg?v=1642480817"
              alt="Digital art showcase"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
          </div>

          {/* Top-right Image */}
          <div className="col-span-4 row-span-3 rounded-2xl overflow-hidden relative">
            <img
              src="https://www.housedigest.com/img/gallery/10-ways-to-incorporate-sculpture-art-in-your-home/intro-1654181132.jpg"
              alt="Community member 1"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-secondary/20 to-primary/40" />
          </div>

          {/* Bottom-right Image 1 */}
          <div className="col-span-2 row-span-3 rounded-2xl overflow-hidden relative">
            <img
              src="https://medias.artmajeur.com/standard/14789744_img-20210808-200234.jpg?v=1738747218"
              alt="Community member 2"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-secondary/20 to-primary/40" />
          </div>

          {/* Bottom-right Image 2 */}
          <div className="col-span-2 row-span-3 rounded-2xl overflow-hidden relative">
            <img
              src="https://d1zdxptf8tk3f9.cloudfront.net/ckeditor_assets/pictures/4964/content_Untitled_design.png"
              alt="Community member 3"
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-b from-secondary/20 to-primary/40" />
          </div>
        </div>

        {/* Text Content */}
        <div className="flex flex-col justify-center space-y-6">
          <h2 className="heading-2 text-heading">
            Revolutionizing Digital Art Exchange
          </h2>
          <p className="text max-w-xl">
            At Artbid, we've created a vibrant marketplace where cutting-edge
            technology meets extraordinary creativity. Join over 250,000
            collectors and artists shaping the future of digital ownership.
          </p>

          <div className="space-y-4">
            {[
              "Top notch asset",
              "Exclusive personal art collections",
              "One-of-a-kind digital pieces",
              "Secure and transparent transactions",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span className="text font-medium">{item}</span>
              </div>
            ))}
          </div>

          <Button
            as="a"
            href="/about"
            iconLeft={<FaArrowCircleRight size={18} />}
            className="bg-secondary text-primary font-bold cursor-pointer transition  hover:bg-primary-light"
          >
            Explore Our Story
          </Button>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute -bottom-32 -right-32 w-[600px] h-[600px] rounded-full bg-secondary/10 blur-3xl -z-10" />
    </section>
  );
}
