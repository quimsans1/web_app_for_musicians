import axios from 'axios';

const API_URL = 'https://backend-server-wwk3.onrender.com/api/users';
const API_URL_MAIN_USER = 'https://backend-server-wwk3.onrender.com/api/mainUser';

// Función para obtener todos los usuarios
export const getUsers = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    throw error;
  }
};

// Función para obtener un usuario por su ID
export const getUserById = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/${userId}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener el usuario con ID ${userId}:`, error);
    throw error;
  }
};

// Get Main User
export const getMainUser = async () => {
  try {
    const response = await axios.get(API_URL_MAIN_USER);
    return response.data;
  } catch (error) {
    console.error("Error al obtener usuario principal:", error);
    throw error;
  }
};
