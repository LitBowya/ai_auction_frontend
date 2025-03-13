import axios from "axios";

// Base API configuration
const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // Uses environment variable
    headers: {
        "Content-Type": "application/json",
    },
    
});

export default api;
