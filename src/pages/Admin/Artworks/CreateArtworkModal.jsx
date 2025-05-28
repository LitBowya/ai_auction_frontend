

import React, { useState } from "react";
import ReactModal from "react-modal";
import useApi from "../../../hooks/useApi.js";
import {toast} from "react-toastify";
import Spinner from "../../../components/Spinner.jsx";

ReactModal.setAppElement("body");

const CreateArtworkModal = ({ isOpen, onRequestClose, refetch }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
  });
  const [images, setImages] = useState([]);
  const [pptxFile, setPptxFile] = useState(null);
  const [error, setError] = useState("");
  const [aiRejectionReasons, setAiRejectionReasons] = useState([]);

  const { postData: createArtwork, loading: creatingArtwork } = useApi("/Artworks");
  const {
    data: categories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useApi("/category");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  const handlePptxChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type !== "application/vnd.openxmlformats-officedocument.presentationml.presentation") {
      setError("Only .pptx files are allowed");
      setPptxFile(null);
      return;
    }
    setError("");
    setPptxFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setAiRejectionReasons([]);

    if (!formData.category) {
      setError("Please select a category");
      return;
    }

    if (images.length === 0) {
      setError("Please upload at least one image");
      return;
    }

    try {
      toast.warning("Uploading artwork...");

      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("category", formData.category);

      images.forEach((file) => {
        formDataToSend.append("images", file);
      });

      if (pptxFile) {
        formDataToSend.append("pptx", pptxFile);
      }

      await createArtwork(formDataToSend);

      resetForm();
      onRequestClose();
      refetch();
      toast.success("Artwork uploaded successfully");
    } catch (err) {
      if (err.response?.data?.error?.type === "AI_DETECTION") {
        setAiRejectionReasons(err.response.data.error.reasons);
        toast.error("AI-generated images are not allowed", {
          description: `Your artwork was rejected for the following reasons: ${err.response.data.error.reasons}`,
          duration: 10000,
        });
      } else {
        const errorMsg =
          err.response?.data?.message || err.message || "Failed to upload artwork";
        setError(errorMsg);
        toast.error(errorMsg);
      }
    }
  };

  const resetForm = () => {
    setFormData({ title: "", description: "", category: "" });
    setImages([]);
    setPptxFile(null);
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Create Artwork Modal"
      className="bg-white p-6 rounded-lg shadow-xl mx-auto mt-20 outline-none max-w-md w-full"
      overlayClassName="fixed inset-0 bg-black/50 flex items-center justify-center"
    >
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-700 mb-4">Add Artwork</h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {categoriesError && (
          <p className="text-red-500 text-sm mb-4">Failed to load categories</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            {categoriesLoading ? (
              <p className="text-gray-500">Loading categories...</p>
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upload Images (Multiple allowed)
            </label>
            <input
              type="file"
              name="images"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upload PPTX File
            </label>
            <input
              type="file"
              name="pptx"
              accept=".pptx"
              onChange={handlePptxChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>



          {
            creatingArtwork ? (<Spinner />) : (<button
                type="submit"
                disabled={creatingArtwork}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:bg-blue-300 disabled:cursor-not-allowed"
            >
              Add Artwork
            </button>)
          }
        </form>
      </div>
    </ReactModal>
  );
};

export default CreateArtworkModal;
