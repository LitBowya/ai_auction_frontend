import Image from "next/image";
import Link from "next/link";

const ArtworkCard = ({ artwork }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden transform hover:scale-105 transition duration-300">
      {/* Auction Image */}
      <div className="relative w-full h-52">
        <Image
          src={artwork?.imageUrl || "/default-image.png"}
          alt={artwork?.title || "Artwork"}
          layout="fill"
          objectFit="cover"
        />
      </div>

      {/* Auction Details */}
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-900">{artwork?.title || "Untitled"}</h3>

        <p className="text-gray-600 text-sm truncate italic">Owner</p>
        <p className="text-black text-md truncate">{artwork?.owner.name || "No owner available"}</p>

        {/* View Auction Button */}
        <Link href="#">
          <button className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-semibold w-full">
            View Artwork
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ArtworkCard;
