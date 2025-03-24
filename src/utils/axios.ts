import axios from 'axios';

// Determine the base URL based on the environment
const getBaseUrl = () => {
    if (process.env.NODE_ENV === 'production') {
        // Use the deployed API URL in production
        return 'https://dentech-amb.netlify.app';
    }
    // Use localhost in development
    return 'http://localhost:5173';
};

// Create axios instance with base URL
const api = axios.create({
    baseURL: getBaseUrl(),
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
