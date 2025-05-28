import {apiService} from "./apiService";
import {SHIPPING_URL} from "../constants";

export const shippingApi = apiService.injectEndpoints({
    endpoints: (builder) => ({
        getDefaultShipping: builder.query({
            query: () => `${SHIPPING_URL}/default`,
        }),
        getAllUserShipping: builder.query({
            query: () => `${SHIPPING_URL}`,
        }),
        setShippingDetails: builder.mutation({
            query: (data) => ({
                url: `${SHIPPING_URL}`,
                method: "POST",
                body: data,
            }),
        }),
    }),
});

export const {
    useGetDefaultShippingQuery,
    useGetAllUserShippingQuery,
    useSetShippingDetailsMutation,
} = shippingApi;
