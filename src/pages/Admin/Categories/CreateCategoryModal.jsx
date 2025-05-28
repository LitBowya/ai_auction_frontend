

import React, { useState } from "react";
import ReactModal from "react-modal";
import useApi from "../../../hooks/useApi.js";
import {toast} from "react-toastify";
import Spinner from "../../../components/Spinner.jsx";

ReactModal.setAppElement("body");

const CreateCategoryModal = ({ isOpen, onRequestClose, }) => {
  const [formData, setFormData] = useState({ name: "" });
  const [error, setError] = useState("");

  // Using the new postData method from useApi
  const { postData: createCategory, loading: creatingCategory } = useApi("/category");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError(""); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.name.trim()) {
      setError("Category name is required");
      return;
    }

    try {
      await createCategory(formData);
      toast.success("Category created");
      resetForm();
      onRequestClose();
    } catch (err) {
      const errorMessage = err.response?.data?.message || 
                         err.message || 
                         "Failed to create category";
      
      setError(errorMessage);
      toast.error("Creation failed", {
        description: errorMessage,
      });
    }
  };

  const resetForm = () => {
    setFormData({ name: "" });
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={() => {
        resetForm();
        onRequestClose();
      }}
      contentLabel="Create Category Modal"
      className="bg-white p-6 rounded-lg shadow-xl mx-auto mt-20 outline-none max-w-md w-full"
      overlayClassName="fixed inset-0 bg-black/50 flex items-center justify-center"
    >
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-700 mb-4">Add Category</h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              aria-label="Category name"
            />
          </div>
          {
            creatingCategory ? (<Spinner />) : (<button
                type="submit"
                disabled={creatingCategory}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:bg-blue-300 disabled:cursor-not-allowed"
            >
              Add Category
            </button>)
          }
        </form>
      </div>
    </ReactModal>
  );
};

export default CreateCategoryModal;
