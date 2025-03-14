"use client";

import { useCallback, useEffect, useState } from "react";
import api from "../utils/api";

const useApi = (endpoint, method = "GET", requestData = null) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch data (GET request)
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // No need to add withCredentials here since it's already in the api instance
      const response = await api.get(endpoint);
      setData(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  // Handle POST, PUT, DELETE actions
  const sendRequest = async (data = requestData, customMethod = method) => {
    setLoading(true);
    setError(null);

    try {
      const response = await api({
        method: customMethod,
        url: endpoint,
        data,
        
      });

      console.log('Response', response)

      // ✅ Ensure response is valid JSON
      if (!response || !response.data) {
        return { success: false, message: "No response from server" };
      }

      setData(response.data);
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Refetch function to refresh data
  const refetch = async () => {
    await fetchData();
  };

  useEffect(() => {
    if (typeof window !== "undefined" && method === "GET") fetchData();
  }, [fetchData, method]);

  return { data, loading, error, sendRequest, refetch };
};

export default useApi;