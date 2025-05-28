import { apiService } from "./apiService";
import { AUTH_URL } from "../constants";

export const authApi = apiService.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/register`,
        method: "POST",
        body: data,
      }),
    }),
    verifyUserOTP: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/verify-otp`,
        method: "POST",
        body: data,
      }),
    }),
    loginUser: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: `${AUTH_URL}/logout`,
        method: "POST",
      }),
    }),
    requestPasswordReset: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/forgot-password`,
        method: "POST",
        body: data,
      }),
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/reset-password`,
        method: "POST",
        body: data,
      }),
    }),

  }),
});

export const {
  useRegisterUserMutation,
  useVerifyUserOTPMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useRequestPasswordResetMutation,
  useResetPasswordMutation,
} = authApi;
