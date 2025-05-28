

import { useState, useEffect, useCallback } from "react";
import api from "../utils/api";

const useApi = (endpoint = "") => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getContentType = (payload) => {
    if (payload instanceof FormData) {
      return undefined; // Let browser set multipart/form-data with boundary
    }
    return payload ? "application/json" : undefined;
  };

  const fetchData = useCallback(async (id = "") => {
    setLoading(true);
    setError(null);
    try {
      // Dynamically build the endpoint based on whether an ID is provided or not
      const url = id ? `${endpoint}/${id.id}` : endpoint;

      // Make GET request with the updated URL
      const response = await api.get(url); 
      setData(response.data);
    } catch (err) {
      setError(err.message || "An error occurred while fetching data.");
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      fetchData(); // You can pass the ID here if needed
    }
  }, [fetchData]);

  const postData = async (payload = null, id = "") => {
    setLoading(true);
    setError(null);
    try {
      // Dynamically build the endpoint based on whether an ID is provided or not
      const url = id ? `${endpoint}/${id.id}` : endpoint;


      // Make POST request with the updated URL
      const response = await api.post(url, payload, {
        headers: {
          "Content-Type": getContentType(payload),
        },
      });
      setData(response.data);
      return response.data;
    } catch (err) {
      setError(err.message || "An error occurred while posting data.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const putData = async (payload = null, id = "") => {
    setLoading(true);
    setError(null);
    try {
      // Dynamically build the endpoint based on whether an ID is provided or not
      const url = id ? `${endpoint}/${id.id}` : endpoint;

      // Make PUT request with the updated URL
      const response = await api.put(url, payload, {
        headers: {
          "Content-Type": getContentType(payload),
        },
      });
      setData(response.data);
      return response.data;
    } catch (err) {
      setError(err.message || "An error occurred while updating data.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteData = async (id = "") => {
    setLoading(true);
    setError(null);
    try {
      // Dynamically build the endpoint based on whether an ID is provided or not
      const url = id ? `${endpoint}/${id.id}` : endpoint;


      // Make DELETE request with the updated URL
      const response = await api.delete(url);
      setData(response.data);
      return response.data;
    } catch (err) {
      setError(err.message || "An error occurred while deleting data.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    fetchData,
    postData,
    putData,
    deleteData,
    refetch,
  };
};

export default useApi;
