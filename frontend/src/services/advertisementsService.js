import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'https://pac3.onrender.com';

// Get All Ads
export const getAdvertisements = async () => {
  const response = await axios.get(`${API_URL}/api/advertisements`);
  return response.data;
};

// Get Ad by ID
export const getAdvertisementById = async (advertisementId) => {
  const response = await axios.get(`${API_URL}/api/advertisements/${advertisementId}`);
  return response.data;
};

// Create Ad
export const createAdvertisement = async (advertisement) => {
  try {
    const response = await axios.post(`${API_URL}/api/advertisements`, advertisement);
    console.log('Anuncio creado:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error al crear el advertisement (service):', error.response ? error.response.data : error);
    throw error;
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