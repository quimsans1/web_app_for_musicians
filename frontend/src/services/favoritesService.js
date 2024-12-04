import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const getFavorites = async () => {
    const response = await axios.get(`${API_URL}/api/favorites`);
    return response.data;
};

export const addUserToFavorites = async (userId) => {
    try {
        const response = await axios.post(`${API_URL}/api/favorites`, userId);
        return response.data;
    } catch (error) {
        console.error('Error adding user to favorites:', error.response);
        throw error;
    }
};

export const deleteUserFromFavorites = async (userId) => {
    try {
        const response = await axios.delete(`${API_URL}/api/favorites`, {
            data: { [userId]: "" }
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting user from favorites:', error.response?.data || error.message);
        throw error;
    }
};



