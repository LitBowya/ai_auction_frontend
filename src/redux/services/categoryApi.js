import { apiService } from "./apiService";
import { CATEGORY_URL } from "../constants";

export const categoryApi = apiService.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => `${CATEGORY_URL}`,
    }),
    createCategory: builder.mutation({
      query: (data) => ({
        url: `${CATEGORY_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    updateCategory: builder.mutation({
      query: ({ categoryId, data }) => ({
        url: `${CATEGORY_URL}/${categoryId}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteCategory: builder.mutation({
      query: (categoryId) => ({
        url: `${CATEGORY_URL}/${categoryId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
