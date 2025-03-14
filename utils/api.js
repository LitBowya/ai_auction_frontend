import axios from "axios";

// Base API configuration
const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true, // CORRECT - This sends credentials with every request
});

export default api;