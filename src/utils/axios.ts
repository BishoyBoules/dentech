import axios from 'axios';

// Determine the base URL based on the environment
const getBaseUrl = () => {
    if (process.env.NODE_ENV === 'production') {
        // Use the deployed API URL in production
        return 'https://truemedfin-testing.onrender.com';
    }
    // Use localhost in development with the correct backend port
    return 'http://localhost:5173';  // or whatever port your Django backend is running on
};

// Create axios instance with base URL
const api = axios.create({
    baseURL: getBaseUrl(),
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
