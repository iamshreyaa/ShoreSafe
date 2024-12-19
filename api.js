// api.js
import axios from 'axios';

const API_URL = 'http://localhost:3000'; // Update this to your backend server URL

// Function to register a new user
export const registerUser = async (name, email, password) => {
    try {
        const response = await axios.post(`${API_URL}/auth/register`, { name, email, password });
        return response.data;
    } catch (error) {
        // Handle error response properly
        const errorMessage = error.response?.data?.message || 'An error occurred';
        throw new Error(errorMessage);
    }
};

// Function to login a user
export const loginUser = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, { email, password });
        return response.data;
    } catch (error) {
        // Handle error response properly
        const errorMessage = error.response?.data?.message || 'An error occurred';
        throw new Error(errorMessage);
    }
};