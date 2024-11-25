import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// Función para obtener todos los usuarios, con o sin filtros
export const getUsers = async (filters = {}) => {
  try {
    console.log('filters', filters)
    const queryParams = new URLSearchParams(filters).toString();
    const url = queryParams ? `${API_URL}/api/users?${queryParams}` : `${API_URL}/api/users`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    throw error;
  }
};

// Función para obtener un usuario por su ID
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

/*export const updateMainUser = async (updatedUser) => {
  console.log('updatedUser', updatedUser)
  try {
    const response = await axios.put(`${API_URL}/api/mainUser`, updatedUser);
    return response.data;
  } catch (error) {
    console.error('Error updating main user:', error);
    throw error;
  }
};*/

// Function to update the main user
export const updateMainUser = async (updatedUser) => {
  console.log('service updatedUser:', updatedUser);  // Log updated user data

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
            // Ensure links are serialized as JSON string before appending
            formData.append(key, JSON.stringify(updatedUser[key]));
          } else {
            updatedUser[key].forEach((item) => {
              formData.append(key, item);  // Append each array element
            });
          }
        } else if (typeof updatedUser[key] === 'object') {
          if (key === 'links') {
            // Serialize the links array into JSON string
            formData.append(key, JSON.stringify(updatedUser[key]));
          } else {
            // Serialize any other object fields (e.g., musicianInfo, groupInfo)
            formData.append(key, JSON.stringify(updatedUser[key]));  // Serialize objects
          }
        } else {
          formData.append(key, updatedUser[key]);  // Regular key-value pair
        }
      }
    });

    // Append the profile picture file if available
    if (updatedUser.profilePictureFile) {
      formData.append('profilePicture', updatedUser.profilePictureFile);
    }

    // Logging FormData content for debugging purposes
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }
    console.log('service formData:', formData)
    // Make the PUT request with the FormData
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



