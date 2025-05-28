
import React, { useState } from "react";
import CategoryTable from "./CategoryTable";
import CreateCategoryModal from "./CreateCategoryModal";
import EditCategoryModal from "./EditCategoryModal";
import { FaPlus } from "react-icons/fa";
import useApi from "../../../hooks/useApi.js";
import Spinner from "../../../components/Spinner.jsx";
import ErrorMessage from "../../../components/ErrorMessage.jsx";
import {Button} from "../../../components/Button.jsx";

export default function Categories() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Using the new useApi hook
  const { 
    data, 
    loading, 
    error, 
    fetchData: fetchCategories 
  } = useApi("/category");

  // Modal handlers
  const handleOpenCreateModal = () => setIsCreateModalOpen(true);
  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
    fetchCategories(); // Refresh data after creation
  };

  const handleOpenEditModal = (category) => {
    setSelectedCategory(category);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setSelectedCategory(null);
    setIsEditModalOpen(false);
    fetchCategories(); // Refresh data after edit
  };

  // Handle loading state
  if (loading) {
    return (
      <div className="max-w-screen-xl mx-auto p-8 flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="max-w-screen-xl mx-auto p-8 flex flex-col justify-center items-center">
        <ErrorMessage
          message={error.message || "Failed to load Categories"}
        />
      </div>
    );
  }

  return (
    <div className="max-width bg-gray-100 rounded-lg p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Categories Management</h1>
          <Button onClick={handleOpenCreateModal}
                  iconLeft={<FaPlus />} className={`text-secondary bg-primary`}>
              Create Category
          </Button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <CategoryTable
          categories={data?.categories || []}
          onEdit={handleOpenEditModal}
          refetch={fetchCategories}
        />
      </div>

      <CreateCategoryModal
        isOpen={isCreateModalOpen}
        onRequestClose={handleCloseCreateModal}
      />

      {selectedCategory && (
        <EditCategoryModal
          isOpen={isEditModalOpen}
          onRequestClose={handleCloseEditModal}
          category={selectedCategory}
        />
      )}
    </div>
  );
}
