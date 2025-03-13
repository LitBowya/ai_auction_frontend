import Link from "next/link";

export default function CallToAction() {
  return (
    <section className="py-16 px-6 bg-blue-600 text-white text-center">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-4">Join Our Auction Community</h2>
        <p className="text-lg mb-6">
          Bid on exclusive artworks, sell your own, and be part of an exciting digital auction experience.
        </p>
        <Link href="/register">
          <button className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-md hover:bg-gray-200 transition">
            Register Now
          </button>
        </Link>
      </div>
    </section>
  );
}
