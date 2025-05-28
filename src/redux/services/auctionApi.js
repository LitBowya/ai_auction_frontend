import { apiService } from "./apiService";
import { AUCTIONS_URL } from "../constants";

export const auctionApi = apiService.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // GET /api/Auctions/active
    getActiveAuctions: builder.query({
      query: () => ({
        url: `${AUCTIONS_URL}/active`,
        method: "GET",
      }),
    }),

    // GET /api/Auctions
    getAllAuctions: builder.query({
      query: () => ({
        url: `${AUCTIONS_URL}`,
        method: "GET",
      }),
    }),

    // GET /api/Auctions/latest
    getLatestAuction: builder.query({
      query: () => ({
        url: `${AUCTIONS_URL}/latest`,
        method: "GET",
      }),
    }),

    // GET /api/Auctions/completed
    getCompletedAuctions: builder.query({
      query: () => ({
        url: `${AUCTIONS_URL}/completed`,
        method: "GET",
      }),
    }),

    // GET /api/Auctions/insights (requires auth)
    getAuctionInsights: builder.query({
      query: () => ({
        url: `${AUCTIONS_URL}/insights`,
        method: "GET",
      }),
    }),

    // POST /api/Auctions (requires auth)
    createAuction: builder.mutation({
      query: (newAuction) => ({
        url: `${AUCTIONS_URL}`,
        method: "POST",
        body: newAuction,
      }),
    }),

    // GET /api/Auctions/:id
    getAuctionById: builder.query({
      query: (id) => ({
        url: `${AUCTIONS_URL}/${id}`,
        method: "GET",
      }),
    }),

    // PUT /api/Auctions/:id (requires auth)
    endAuction: builder.mutation({
      query: (id) => ({
        url: `${AUCTIONS_URL}/${id}`,
        method: "PUT",
      }),
    }),

    // DELETE /api/Auctions/:id (requires auth)
    deleteAuction: builder.mutation({
      query: (id) => ({
        url: `${AUCTIONS_URL}/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetActiveAuctionsQuery,
  useGetAllAuctionsQuery,
  useGetLatestAuctionQuery,
  useGetCompletedAuctionsQuery,
  useGetAuctionInsightsQuery,
  useCreateAuctionMutation,
  useGetAuctionByIdQuery,
  useEndAuctionMutation,
  useDeleteAuctionMutation,
} = auctionApi;
