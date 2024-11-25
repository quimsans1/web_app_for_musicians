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

export const createAdvertisement = async (advertisement) => {
  try {
    console.log('advertisement recieved in service', advertisement)
    const response = await axios.post(`${API_URL}/api/advertisements`, advertisement);
    console.log('Anuncio creado:', response.data); // Comprova la resposta
    return response.data;
  } catch (error) {
    console.error('Error al crear el advertisement (service):', error.response ? error.response.data : error);
    throw error; // Llenca l'error per a que el component pugui gestionar-lo
  }
};
