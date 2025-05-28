import { apiService } from "./apiService";
import { AUDITS_URL } from "../constants";

export const auditApi = apiService.injectEndpoints({
  endpoints: (builder) => ({
    getAuditLogs: builder.query({
      query: () => `${AUDITS_URL}`,
    }),
  }),
});

export const {
  useGetAuditLogsQuery,
} = auditApi;
