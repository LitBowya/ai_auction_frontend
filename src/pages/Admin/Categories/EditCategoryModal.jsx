

import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import useApi from "../../../hooks/useApi.js";
import {toast} from "react-toastify";

ReactModal.setAppElement("body");

const EditCategoryModal = ({ isOpen, onRequestClose, category,  }) => {
  const [formData, setFormData] = useState({ name: "" });
  const [error, setError] = useState("");

  // Initialize form with category data when it changes
  useEffect(() => {
    if (category) {
      setFormData({ name: category.name });
    }
  }, [category]);

  // Using the new putData method from useApi
  const { putData: updateCategory, loading: updatingCategory } = useApi("/category");

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

    if (formData.name === category?.name) {
      onRequestClose();
      return;
    }

    try {
      await updateCategory(formData, {id: category?._id} ,
      );

      toast.success("Category updated", {
        description: `"${category?.name}" has been updated to "${formData.name}".`,
      });

      onRequestClose();
    } catch (err) {
      const errorMessage = err.response?.data?.message || 
                         err.message || 
                         "Failed to update category";
      
      setError(errorMessage);
      toast.error("Update failed", {
        description: errorMessage,
      });
    }
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Edit Category Modal"
      className="bg-white p-6 rounded-lg shadow-xl mx-auto mt-20 outline-none max-w-md w-full"
      overlayClassName="fixed inset-0 bg-black/50 flex items-center justify-center"
    >
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-700 mb-4">
          Edit {category?.name}
        </h2>

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

          <button
            type="submit"
            disabled={updatingCategory}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:bg-blue-300 disabled:cursor-not-allowed"
          >
            {updatingCategory ? "Updating..." : "Update Category"}
          </button>
        </form>
      </div>
    </ReactModal>
  );
};

export default EditCategoryModal;
