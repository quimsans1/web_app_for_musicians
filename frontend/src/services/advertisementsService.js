import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// Función para obtener todos los advertisements
export const getAdvertisements = async () => {
  const response = await axios.get(`${API_URL}/api/advertisements`);
  return response.data;
};

// Función para obtener un advertisement por su ID
export const getAdvertisementById = async (advertisementId) => {
  const response = await axios.get(`${API_URL}/api/advertisements/${advertisementId}`);
  return response.data;
};
