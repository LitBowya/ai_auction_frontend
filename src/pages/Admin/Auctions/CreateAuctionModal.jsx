

import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import useApi from "../../../hooks/useApi.js";
import {toast} from "react-toastify";
import Spinner from "../../../components/Spinner.jsx";

ReactModal.setAppElement("body");

const CreateAuctionModal = ({ isOpen, onRequestClose, refetch }) => {
  const [formData, setFormData] = useState({
    artworkId: "",
    category: "",
    startingPrice: 0,
    maxBidLimit: 0,
    startingTime: "",
    biddingEndTime: "",
  });

  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredArtworks, setFilteredArtworks] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  // Using new hook methods
  const { postData: createAuction, loading: creatingAuction } = useApi("/Auctions");
  const { data: fetchedArtworks, loading: fetchingArtworks, fetchData: fetchArtworks } = useApi("/Artworks");
  const { 
    data: categories, 
    loading: categoriesLoading, 
    error: categoriesError,
    fetchData: fetchCategories
  } = useApi("/category");

  // Filter Artworks based on search term
  useEffect(() => {
    if (fetchedArtworks?.artworks) {
      const filtered = searchTerm
        ? fetchedArtworks.artworks.filter(artwork =>
            artwork.title.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : fetchedArtworks.artworks;
      
      setFilteredArtworks(filtered);
    } else {
      setFilteredArtworks([]);
    }
  }, [searchTerm, fetchedArtworks]);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleArtworkSearch = (e) => {
    setSearchTerm(e.target.value);
    setShowDropdown(true);
  };

  const selectArtwork = (artwork) => {
    setFormData(prev => ({
      ...prev,
      artworkId: artwork._id
    }));
    setSearchTerm(artwork.title);
    setShowDropdown(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
  
    // Convert startingPrice and maxBidLimit to integers
    const updatedFormData = {
      ...formData,
      startingPrice: Number(formData.startingPrice), // Ensures the value is an integer
      maxBidLimit: Number(formData.maxBidLimit), // Ensures the value is an integer
    };
  
    if (!updatedFormData.artworkId) {
      setError("Please select a valid artwork.");
      return;
    }
  
    try {
      await createAuction(updatedFormData);
      toast.success("Auction Created Successfully");
      resetForm();
      onRequestClose();
      refetch();
    } catch (err) {
      toast.error(err.response?.data?.message);
      setError(err.response?.data?.message || err.message || "Failed to create auction");
    }
  };
  

  const resetForm = () => {
    setFormData({
      artworkId: "",
      category: "",
      startingPrice: 0,
      maxBidLimit: 0,
      startingTime: "",
      biddingEndTime: "",
    });
    setSearchTerm("");
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Create Auction Modal"
      className="bg-white p-6 rounded-lg shadow-xl mx-auto mt-20 outline-none max-w-md w-full"
      overlayClassName="fixed inset-0 bg-black/50 flex items-center justify-center"
    >
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-700 mb-4">Create Auction</h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Artwork Search */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Search Artwork
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={handleArtworkSearch}
              onFocus={() => setShowDropdown(true)}
              placeholder="Type to search artworks..."
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            
            {showDropdown && (
              <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded shadow-lg max-h-60 overflow-y-auto">
                {fetchingArtworks ? (
                  <div className="p-2 text-gray-500">Loading artworks...</div>
                ) : filteredArtworks.length === 0 ? (
                  <div className="p-2 text-gray-500">No artworks found</div>
                ) : (
                  filteredArtworks.map((artwork) => (
                    <div
                      key={artwork._id}
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => selectArtwork(artwork)}
                    >
                      {artwork.title}
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            {categoriesLoading ? (
              <p className="text-gray-500">Loading categories...</p>
            ) : categoriesError ? (
              <p className="text-red-500">Failed to load categories</p>
            ) : (
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select a category</option>
                {categories?.categories?.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Starting Price */}
          <div>
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
              required
            />
          </div>

          {/* Max Bid Limit */}
          <div>
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
              required
            />
          </div>

          {/* Starting Time */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Starting Time
            </label>
            <input
              type="datetime-local"
              name="startingTime"
              value={formData.startingTime}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Bidding End Time */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bidding End Time
            </label>
            <input
              type="datetime-local"
              name="biddingEndTime"
              value={formData.biddingEndTime}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Submit Button */}
          {creatingAuction ? (<Spinner />) : (<button
              type="submit"
              className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:bg-blue-300 disabled:cursor-not-allowed"
          >
            Create Auction
          </button>)}
        </form>
      </div>
    </ReactModal>
  );
};

export default CreateAuctionModal;
