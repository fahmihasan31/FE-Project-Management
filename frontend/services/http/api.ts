import axios from 'axios';

// Create an instance of Axios with custom configuration
const baseURL = process.env.NEXT_PUBLIC_API_URL;

const http = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json', // Set default content type
        // 'cache-control': 'no-cache, private',
        // Add other default headers as needed
    },
});

// Add a request interceptor
http.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token != null) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    async (error) => {
        // Handle request error
        return await Promise.reject(error);
    }
);

// Add a response interceptor
http.interceptors.response.use(
    (response) => {
        // console.log(`[Response] Connected to ${response.config.baseURL}:`, response);
        // You can modify the response data here
        return response;
    },
    async (error) => {
        if (error.response) {
            if (error.response.data.message.includes('invalid token') || error.response.data.message === 'You are not logged in') {
                localStorage.removeItem('token');
            }

            return await Promise.reject(error.response.data);
        } else {
            return await Promise.reject({ message: 'Network error' });
        }
    }
);

export default http;
