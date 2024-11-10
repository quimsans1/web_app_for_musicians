import axios from 'axios';

const API_URL = 'https://backend-server-wwk3.onrender.com/api/advertisements';

// Función para obtener todos los advertisements
export const getAdvertisements = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Función para obtener un advertisement por su ID
export const getAdvertisementById = async (advertisementId) => {
  const response = await axios.get(`${API_URL}/${advertisementId}`);
  return response.data;
};
