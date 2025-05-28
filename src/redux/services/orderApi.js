import { apiService } from "./apiService";
import { ORDERS_URL } from "../constants";

export const orderApi = apiService.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: () => `${ORDERS_URL}`,
    }),
    updateOrders: builder.mutation({
      query: (id) => ({
        url: `${ORDERS_URL}/${id}`,
        method: "PUT",
      })
    })
  }),
});

export const {
  useGetOrdersQuery,
} = orderApi;
