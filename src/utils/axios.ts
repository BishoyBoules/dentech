import axios from 'axios';

// Determine the base URL based on the environment
const getBaseUrl = () => {
    if (process.env.NODE_ENV === 'production') {
        // Use the deployed API URL in production
        return 'https://truemedfin-testing.onrender.com';
    }
    // Use localhost in development with the correct backend port
    return 'https://truemedfin-testing.onrender.com';  // or whatever port your Django backend is running on
};

// Create axios instance with base URL
const api = axios.create({
    baseURL: getBaseUrl(),
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add request interceptor to include auth token in requests
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            // Try using 'Token' format instead of 'Bearer' which is common in Django REST Framework
            config.headers['Authorization'] = `Token ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add response interceptor to handle token expiration
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Handle 401 unauthorized errors (usually due to token expiration)
        if (error.response && error.response.status === 401) {
            // Clear token from storage
            localStorage.removeItem('token');
            
            // Redirect to login page if needed
            // You can uncomment this if you want automatic redirection
            // window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;
