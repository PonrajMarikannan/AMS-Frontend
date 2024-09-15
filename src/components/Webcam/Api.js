import axios from 'axios';

const API_URL = 'http://localhost:8888/api'; 

export const registerUser = async (username, photo) => {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('photo', photo);

    try {
        const response = await axios.post(`${API_URL}/register`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log('Registration Success:', response.data); // Log successful response
        return response.data;
    } catch (error) {
        // Detailed error logging
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error('Error Response Data:', error.response.data);
            console.error('Error Response Status:', error.response.status);
            console.error('Error Response Headers:', error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            console.error('Error Request:', error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error Message:', error.message);
        }
        console.error('Error Config:', error.config);
        throw error; // Re-throw the error after logging
    }
};

export const verifyFace = async (username, photo) => {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('photo', photo);

    try {
        const response = await axios.post(`${API_URL}/verify`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log('Verification Success:', response.data); // Log successful response
        return response.data;
    } catch (error) {
        // Detailed error logging
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error('Error Response Data:', error.response.data);
            console.error('Error Response Status:', error.response.status);
            console.error('Error Response Headers:', error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            console.error('Error Request:', error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error Message:', error.message);
        }
        console.error('Error Config:', error.config);
        throw error; // Re-throw the error after logging
    }
};
