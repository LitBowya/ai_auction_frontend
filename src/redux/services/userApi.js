import {apiService} from "./apiService";
import {USERS_URL} from "../constants";

export const userApi = apiService.injectEndpoints({
    endpoints: (builder) => ({
        getAllUsers: builder.query({
            query: () => `${USERS_URL}`,
        }),
        getUserProfile: builder.query({
            query: (userId) => `${USERS_URL}/${userId}/profile`,
        }),
        updateUserProfile: builder.mutation({
            query: ({userId, ...data}) => ({
                url: `${USERS_URL}/${userId}/profile`,
                method: "PUT",
                body: data,
            }),
        }),
        getUserOrders: builder.query({
            query: (userId) => `${USERS_URL}/${userId}/orders`,
        }),
        getUserPayments: builder.query({
            query: (userId) => `${USERS_URL}/${userId}/payments`,
        }),
        getUserAuctions: builder.query({
            query: (userId) => `${USERS_URL}/${userId}/auctions`,
        }),
    }),
});

export const {
    useGetAllUsersQuery,
    useGetUserProfileQuery,
    useUpdateUserProfileMutation,
    useGetUserOrdersQuery,
    useGetUserPaymentsQuery,
    useGetUserAuctionsQuery,
} = userApi;
