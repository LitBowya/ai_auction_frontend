"use client";

import React, { useState } from "react";
import useApi from "@/hooks/useApi";
import Button from "@/components/Button";
import CategoryTable from "./CategoryTable";
import CreateCategoryModal from "./CreateCategoryModal";
import EditCategoryModal from "./EditCategoryModal";
import { FaPlus } from "react-icons/fa";
import Spinner from "@/components/Spinner";
import Error from "@/components/Error";

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
        <Error 
          message={error.message || "Failed to load categories"}
          onRetry={fetchCategories}
        />
      </div>
    );
  }

  // Handle empty data state
  if (!data?.categories) {
    return (
      <div className="max-w-screen-xl mx-auto p-8 flex flex-col justify-center items-center">
        <p className="text-gray-500 text-lg mb-4">No categories found</p>
        <Button
          variant="primary"
          text="Retry"
          onClick={fetchCategories}
        />
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl mx-auto p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Categories Management</h1>
        <Button
          variant="primary"
          text="Create Category"
          onClick={handleOpenCreateModal}
          icon={<FaPlus />}
        />
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <CategoryTable
          categories={data.categories}
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