import { apiService } from "./apiService";
import { CONTACT_URL } from "../constants";

export const contactApi = apiService.injectEndpoints({
  endpoints: (builder) => ({
    sendMessage: builder.mutation({
      query: (data) => ({
        url: `${CONTACT_URL}/send`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useSendMessageMutation,
} = contactApi;
