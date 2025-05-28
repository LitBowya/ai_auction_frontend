import {apiService} from "./apiService";
import {PAYMENTS_URL} from "../constants";

export const paymentApi = apiService.injectEndpoints({
    endpoints: (builder) => ({
        getAllPayments: builder.query({
            query: () => `${PAYMENTS_URL}`,
        }),
        initiatePayment: builder.mutation({
            query: ({auctionId, shippingId}) => ({
                url: `${PAYMENTS_URL}/${auctionId}/pay`,
                method: "POST",
                body: {shippingId}
            }),
        }),
        verifyPayment: builder.mutation({
            query: ({auctionId, reference, shippingId}) => ({
                url: `${PAYMENTS_URL}/${auctionId}/verify?reference=${reference}`,
                method: "POST",
                body: {shippingId}
            }),
        }),
        confirmShipment: builder.mutation({
            query: ({paymentId, ...body}) => ({
                url: `${PAYMENTS_URL}/${paymentId}/shipment`,
                method: "PUT",
                body,
            }),
        }),
    }),
});

export const {
    useGetAllPaymentsQuery,
    useInitiatePaymentMutation,
    useVerifyPaymentMutation,
    useConfirmShipmentMutation,
} = paymentApi;
