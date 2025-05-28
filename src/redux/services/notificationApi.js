import { apiService } from "./apiService";
import { NOTIFICATIONS_URL } from "../constants";

export const notificationApi = apiService.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query({
      query: () => `${NOTIFICATIONS_URL}`,
    }),
    markNotificationsAsRead: builder.mutation({
      query: () => ({
        url: `${NOTIFICATIONS_URL}`,
        method: "PUT",
      }),
    }),
  }),
});

export const {
  useGetNotificationsQuery,
  useMarkNotificationsAsReadMutation,
} = notificationApi;
