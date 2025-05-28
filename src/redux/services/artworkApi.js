import { apiService } from "./apiService";
import { ARTWORKS_URL } from "../constants";

export const artworkApi = apiService.injectEndpoints({
  endpoints: (builder) => ({
    getAllArtworks: builder.query({
      query: ({ page = 1, limit = 10, search = "" }) => `${ARTWORKS_URL}?page=${page}&limit=${limit}&search=${search}`,
    }),
    getArtwork: builder.query({
      query: (id) => `${ARTWORKS_URL}/${id}`,
    }),
    uploadArtwork: builder.mutation({
      query: (data) => ({
        url: `${ARTWORKS_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    updateArtwork: builder.mutation({
      query: ({ id, body }) => ({
        url: `${ARTWORKS_URL}/${id}`,
        method: "PUT",
        body
      }),
    }),
    deleteArtwork: builder.mutation({
      query: (id) => ({
        url: `${ARTWORKS_URL}/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllArtworksQuery,
  useGetArtworkQuery,
  useUploadArtworkMutation,
  useUpdateArtworkMutation,
  useDeleteArtworkMutation,
} = artworkApi;
