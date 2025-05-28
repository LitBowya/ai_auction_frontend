import { apiService } from "./apiService";
import { BIDS_URL } from "../constants";

export const bidApi = apiService.injectEndpoints({
  endpoints: (builder) => ({
    getUserBids: builder.query({
      query: () => `${BIDS_URL}/user`,
    }),
    getAllBids: builder.query({
      query: () => `${BIDS_URL}`,
    }),
    getAuctionBids: builder.query({
      query: (auctionId) => `${BIDS_URL}/${auctionId}`,
    }),
    getAuctionHighestBid: builder.query({
      query: (auctionId) => `${BIDS_URL}/highest/${auctionId}`,
    }),
    placeBid: builder.mutation({
      query: ({ auctionId, ...body }) => ({
        url: `${BIDS_URL}/${auctionId}`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useGetUserBidsQuery,
  useGetAllBidsQuery,
  useGetAuctionBidsQuery,
  useGetAuctionHighestBidQuery,
  usePlaceBidMutation,
} = bidApi;
