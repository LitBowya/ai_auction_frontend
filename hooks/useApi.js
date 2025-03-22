"use client";

import {useCallback, useEffect, useState} from "react";
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
      const response = await api.get(endpoint);
      setData(response.data);
    } catch (err) {
      setError(err.message || "An error occurred while fetching data.");
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  // Handle POST, PUT, DELETE actions
  const sendRequest = async (data = requestData, customMethod = method) => {
    setLoading(true);
    setError(null);

    try {
      // Log the request payload for debugging
      console.log("Request Payload:", { method: customMethod, url: endpoint, data });

      const response = await api({
        method: customMethod,
        url: endpoint,
        data: data || undefined, // Avoid sending null or undefined
      });

      // Log the response for debugging
      console.log("Response Data:", response.data);

      // Ensure response is valid JSON
      if (!response || !response.data) {
        throw new Error("No response from server");
      }

      setData(response.data);
      return response.data;
    } catch (err) {
      // Log the error for debugging
      console.error("API Error:", err);

      setError(err.message || "An error occurred while sending the request.");
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
