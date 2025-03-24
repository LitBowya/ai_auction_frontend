import React, { useState } from "react";
import ReactModal from "react-modal";
import useApi from "@/hooks/useApi";

ReactModal.setAppElement("body");

const CreateAuctionModal = ({ isOpen, onRequestClose, refetch }) => {
  const [formData, setFormData] = useState({
    artworkId: "",
    category: "",
    startingPrice: "",
    maxBidLimit: "",
    startingTime: "",
    biddingEndTime: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [artworkSearchError, setArtworkSearchError] = useState(""); // Error for artwork search
  const [artworks, setArtworks] = useState([]); // List of fetched artworks

  const { sendRequest: createAuction } = useApi("/auction", "POST");
  const { data: fetchedArtworks, loading: fetchingArtworks } = useApi("/artworks", "GET"); // Fetch all artworks

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear artwork search error when user starts typing
    if (name === "artworkId") {
      setArtworkSearchError("");
    }
  };

  const handleArtworkSearch = async (value) => {
    try {
      // Filter artworks by name (case-insensitive)
      const matchedArtwork = fetchedArtworks?.find(
        (artwork) => artwork.title.toLowerCase() === value.toLowerCase()
      );

      if (!matchedArtwork) {
        setArtworkSearchError("Artwork not found");
        setFormData({ ...formData, artworkId: "" }); // Reset artworkId if no match
      } else {
        setArtworkSearchError(""); // Clear error if artwork is found
        setFormData({ ...formData, artworkId: matchedArtwork._id }); // Set artworkId
      }
    } catch (err) {
      setArtworkSearchError("Error searching for artwork");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");

      // Validate artworkId before submitting
      if (!formData.artworkId) {
        throw new Error("Please select a valid artwork.");
      }

      // Call the backend API to create an auction
      await createAuction(formData);

      onRequestClose(); // Close the modal
      setFormData({
        artworkId: "",
        category: "",
        startingPrice: "",
        maxBidLimit: "",
        startingTime: "",
        biddingEndTime: "",
      }); // Reset the form
      refetch(); // Refresh the auction list
    } catch (err) {
      setError(err.message || "An error occurred while creating the auction.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Create Auction Modal"
      className="bg-white p-6 rounded-lg shadow-xl mx-auto mt-20 outline-none"
      overlayClassName="fixed inset-0 bg-black/50 flex items-center justify-center"
    >
      <div className="bg-white rounded-lg shadow-lg p-6 w-full min-w-md">
        <h2 className="text-xl font-bold text-gray-700 mb-4">Create Auction</h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          {/* Artwork Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Artwork Name
            </label>
            <input
              type="text"
              name="artworkName"
              value={formData.artworkName || ""}
              onChange={(e) => {
                handleChange(e);
                handleArtworkSearch(e.target.value); // Search for artwork
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {artworkSearchError && (
              <p className="text-red-500 text-sm mt-1">{artworkSearchError}</p>
            )}
          </div>

          {/* Category */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Starting Price */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Starting Price
            </label>
            <input
              type="number"
              step="0.01"
              name="startingPrice"
              value={formData.startingPrice}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Max Bid Limit */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Max Bid Limit
            </label>
            <input
              type="number"
              step="0.01"
              name="maxBidLimit"
              value={formData.maxBidLimit}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Starting Time */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Starting Time
            </label>
            <input
              type="datetime-local"
              name="startingTime"
              value={formData.startingTime}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Bidding End Time */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bidding End Time
            </label>
            <input
              type="datetime-local"
              name="biddingEndTime"
              value={formData.biddingEndTime}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:bg-gray-300"
          >
            {loading ? "Creating..." : "Create Auction"}
          </button>
        </form>
      </div>
    </ReactModal>
  );
};

export default CreateAuctionModal;