import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'https://pac3.onrender.com';

// Get All Users, with filters or without
export const getUsers = async (filters = {}) => {
  try {
    const queryParams = new URLSearchParams(filters).toString();
    const url = queryParams ? `${API_URL}/api/users?${queryParams}` : `${API_URL}/api/users`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    throw error;
  }
};

// Get a User by it's ID
export const getUserById = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/api/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener el usuario con ID ${userId}:`, error);
    throw error;
  }
};

// Get Main User
export const getMainUser = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/mainUser`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener usuario principal:", error);
    throw error;
  }
};

// Update the main user information
export const updateMainUser = async (updatedUser) => {

  try {
    // Create FormData object to handle file upload
    const formData = new FormData();

    // Append non-file fields to FormData
    Object.keys(updatedUser).forEach((key) => {
      if (key !== 'profilePictureFile' && updatedUser[key] !== null) {
        // Handle arrays and objects
        if (Array.isArray(updatedUser[key])) {
          // If it's an array (like links), handle them properly
          if (key === 'links') {
            formData.append(key, JSON.stringify(updatedUser[key]));
          } else {
            updatedUser[key].forEach((item) => {
              formData.append(key, item);
            });
          }
        } else if (typeof updatedUser[key] === 'object') {
          if (key === 'links') {
            formData.append(key, JSON.stringify(updatedUser[key]));
          } else {
            formData.append(key, JSON.stringify(updatedUser[key]));
          }
        } else {
          formData.append(key, updatedUser[key]);
        }
      }
    });

    if (updatedUser.profilePictureFile) {
      formData.append('profilePicture', updatedUser.profilePictureFile);
    }

    // For debugging purposes
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }
    // PUT request with the FormData
    const response = await axios.put(`${API_URL}/api/mainUser`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error updating main user:', error);
    throw error;
  }
};



