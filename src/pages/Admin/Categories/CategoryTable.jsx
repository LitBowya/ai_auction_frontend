

import React, {useState} from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import useApi from "../../../hooks/useApi.js";
import {toast} from "react-toastify";
import EmptyState from "../../../components/EmptyState.jsx";
import Modal from "../../../components/Modal.jsx";

const CategoryTable = ({ categories, onEdit, refetch }) => {
  const { deleteData: deleteCategory, loading: deletingCategory } = useApi("/category");

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedDeleteId, setSelectedDeleteId] = useState(null);

  const openDeleteModal = (id) => {
    setSelectedDeleteId(id);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setSelectedDeleteId(null);
  };

  const handleDeleteCategory = async () => {


    try {
      await deleteCategory({id: selectedDeleteId});
      toast.success("Category deleted successfully",);
      refetch();
    } catch (error) {
      const errorMessage = error.response?.data?.message || 
                         error.message || 
                         "Failed to delete category";
      
      toast.error("Delete failed", {
        description: errorMessage,
      });
      console.error("Delete error:", errorMessage);
    }  finally {
      setSelectedDeleteId(null);
      setDeleteModalOpen(false);
    }

  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden mt-5">
      {!categories.length ? (<EmptyState title={`No categories found`} message={`Start by creating a category`}/>) : (<table className="min-w-full divide-y divide-gray-200">
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
                    onClick={() => openDeleteModal(category._id)}
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
      </table>)}

      <Modal isOpen={deleteModalOpen} onClose={closeDeleteModal}>
        <h2 className="text-lg font-semibold mb-4">
          Are you sure you want to delete this auction?
        </h2>
        <div className="flex justify-end gap-4 mt-6">
          <button
              onClick={closeDeleteModal}
              className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
              onClick={handleDeleteCategory}
              className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default CategoryTable;
