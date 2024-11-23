import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  IconButton,
  Autocomplete,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import imageCompression from 'browser-image-compression'; // Import the library

const locationsList = [
  'New York, USA',
  'Los Angeles, USA',
  'London, UK',
  'Paris, France',
  'Tokyo, Japan',
  'Barcelona, Spain',
  'Berlin, Germany',
  'Sydney, Australia',
]; // Lista de ubicaciones disponibles

const EditProfileForm = ({ user, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    ...user,
    links: user.links || [], // Links inicializados como array
    profilePictureFile: null, 
  });
  const [currentLink, setCurrentLink] = useState('');

  const [uploading, setUploading] = useState(false); // Indicator for upload/compression

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // --- PROFILE IMAGE ---
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploading(true); // Set uploading state
    try {
      // Compression options
      const options = {
        maxSizeMB: 1, // Maximum size in MB
        maxWidthOrHeight: 1024, // Max width or height in pixels
        useWebWorker: true, // Use web worker for better performance
      };

      // Compress the image
      const compressedFile = await imageCompression(file, options);

      // Update the form data with the compressed image file
      setFormData((prev) => ({
        ...prev,
        profilePicture: URL.createObjectURL(compressedFile), // For preview
        profilePictureFile: compressedFile, // Keep track of the file for upload
      }));
    } catch (error) {
      console.error('Error compressing the image:', error);
    } finally {
      setUploading(false); // Reset uploading state
    }
  };

  // --- LINK ---
  const handleAddLink = () => {
    const newLink = currentLink.trim(); // Asegúrate de eliminar espacios en blanco
    if (!newLink) {
      alert('Link cannot be empty');
      return;
    }
    if (formData.links.some(link => link.url === newLink)) {
      alert('This link already exists');
      return;
    }
    setFormData((prev) => ({
      ...prev,
      links: [...prev.links, { url: newLink }],
    }));
    setCurrentLink(''); // Limpia el campo de entrada después de agregar
  };

  const handleDeleteLink = (index) => {
    setFormData((prev) => ({
      ...prev,
      links: prev.links.filter((_, i) => i !== index),
    }));
  };
  
  // --- SAVE ---
  const handleSave = () => {
    const updatedUser = { ...formData };
    delete updatedUser.profilePictureFile;
    onSave(updatedUser); 
  };

  return (
    <Box>
      <TextField
        label="Real Name"
        value={formData.name}
        onChange={(e) => handleChange('name', e.target.value)}
        fullWidth
        sx={{ marginBottom: 2 }}
      />

      <Autocomplete
        options={locationsList}
        value={formData.location || null}
        onChange={(event, newValue) => handleChange('location', newValue)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Location"
            fullWidth
            sx={{ marginBottom: 2 }}
          />
        )}
      />

      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        Profile Picture
      </Typography>
      <Box display="flex" flexDirection="column" alignItems="center" sx={{ marginBottom: 2 }}>
        {formData.profilePicture && (
          <img
            src={formData.profilePicture}
            alt="Profile Preview"
            style={{ width: 100, height: 100, borderRadius: '50%', marginBottom: 10 }}
          />
        )}
        <Button variant="contained" component="label" disabled={uploading}>
          {uploading ? 'Processing...' : 'Upload New Picture'}
          <input type="file" hidden accept="image/*" onChange={handleImageUpload} />
        </Button>
      </Box>

      <Typography variant="h6">Social Links</Typography>
      {formData.links.map((link, index) => (
        <Box key={index} display="flex" alignItems="center" sx={{ marginBottom: 1 }}>
          <TextField
            value={link.url}
            fullWidth
            sx={{ marginRight: 1 }}
            disabled
          />
          <IconButton onClick={() => handleDeleteLink(index)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      ))}

      <Box display="flex" alignItems="center">
        <TextField
          label="Enter URL for New Link"
          value={currentLink} // Manejamos el valor temporalmente
          onChange={(e) => setCurrentLink(e.target.value)} // Actualizamos el estado temporal
          fullWidth
          placeholder="https://example.com"
        />
        <IconButton 
          onClick={handleAddLink} 
          disabled={!currentLink.trim()} // Deshabilitado si está vacío
        >
          <AddIcon />
        </IconButton>
      </Box>

      <Button variant="contained" color="primary" onClick={handleSave} sx={{ marginTop: 3 }}>
        Save Changes
      </Button>
      <Button onClick={onClose} sx={{ marginTop: 1, marginLeft: 2 }}>
        Cancel
      </Button>
    </Box>
  );
};

export default EditProfileForm;
