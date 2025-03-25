"use client";

import React from "react";
import useApi from "@/hooks/useApi";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "sonner";

const CategoryTable = ({ categories, onEdit, refetch }) => {
  const { deleteData: deleteCategory, loading: deletingCategory } = useApi("/category");

  const handleDeleteCategory = async (categoryId, categoryName) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete "${categoryName}"?`);
    if (!confirmDelete) return;

    try {
      await deleteCategory({id: categoryId});

      toast.success("Category deleted successfully", {
        description: `"${categoryName}" has been removed.`,
      });
      refetch();
    } catch (error) {
      const errorMessage = error.response?.data?.message || 
                         error.message || 
                         "Failed to delete category";
      
      toast.error("Delete failed", {
        description: errorMessage,
      });
      console.error("Delete error:", errorMessage);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden mt-5">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {categories.map((category) => (
            <tr key={category._id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {category.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                <button
                  onClick={() => onEdit(category)}
                  className="text-blue-500 hover:text-blue-700 transition-colors"
                  aria-label={`Edit ${category.name}`}
                >
                  <FaEdit className="text-lg" />
                </button>
                <button
                  onClick={() => handleDeleteCategory(category._id, category.name)}
                  disabled={deletingCategory}
                  className="text-red-500 hover:text-red-700 transition-colors disabled:opacity-50"
                  aria-label={`Delete ${category.name}`}
                >
                  <FaTrash className="text-lg" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryTable;