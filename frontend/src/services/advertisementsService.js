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

export const deleteAdvertisementById = async (id) => {
  try {
      const response = await axios.delete(`${API_URL}/api/advertisements`, {
        data: { [id]: "" }
      });
      return response.data;
  } catch (error) {
      console.error('Error deleting advertisement:', error.response?.data || error.message);
      throw error;
  }
};

/**
 * Elimina un anuncio por ID
 * @param {number} id - ID del anuncio que se desea eliminar
 * @returns {Promise<Object>} - Respuesta del servidor
 
export const deleteAdvertisementById = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/api/advertisements/${id}`);
    return response.data; // Retorna la respuesta del servidor
  } catch (error) {
    console.error('Error deleting advertisement:', error);
    throw error; // Lanza el error para manejarlo donde se llame esta función
  }
};*/