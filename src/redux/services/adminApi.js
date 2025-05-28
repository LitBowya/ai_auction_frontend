import { apiService } from "./apiService";
import { ADMIN_URL } from "../constants";

export const adminApi = apiService.injectEndpoints({
  endpoints: (builder) => ({
    getAdminInsights: builder.query({
      query: () => `${ADMIN_URL}`,
    }),
    getAdminGraphInsights: builder.query({
      query: () => `${ADMIN_URL}/insights`,
    }),
  }),
});

export const {
  useGetAdminInsightsQuery,
  useGetAdminGraphInsightsQuery,
} = adminApi;
