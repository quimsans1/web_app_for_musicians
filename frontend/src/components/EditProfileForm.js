import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  IconButton,
  Autocomplete,
  Avatar,
  Chip,
  Select,
  InputLabel,
  MenuItem,
  FormControl,
  Alert,
  Snackbar
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
];

const allMusicStyles = ['Blues', 'Funk', 'Jazz', 'Rock', 'Pop', 'Classical', 'Hip-Hop'];
const allLanguages = ['Spanish', 'English', 'French', 'German'];
const allInstruments = ['Piano', 'Guitar', 'Violin'];
const allGroups = ['Band', 'Orchestra', 'Choir', 'Quartet'];
const allServices = ['Production', 'Music Production', 'Sound Engineering'];

const EditProfileForm = ({ mainUser, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    ...mainUser,
    links: mainUser.links,
    userType: mainUser.userType,
  });
  const [currentLink, setCurrentLink] = useState('');
  const [uploadingProfileImage, setUploadingProfileImage] = useState(false);
  const [uploadingBackgroundImage, setUploadingBackgroundImage] = useState(false);

  // Alerts of Links
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('success'); // Puede ser 'error', 'warning', 'info', 'success'
  const [alertOpen, setAlertOpen] = useState(false);

  // --- HANDLE CHANGE (For String Values): REAL NAME, LOCATION ---
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // --- UPLOAD IMAGE (PROFILE OR BACKGROUND) --- 
  const handleImageUpload = async (event, imageType) => {
    const file = event.target.files[0];
    if (!file) return;

    imageType === 'profilePicture' ?
    setUploadingProfileImage(true) : setUploadingBackgroundImage(true)
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
      if (imageType === 'profilePicture') {
        setFormData((prev) => ({
          ...prev,
          profilePicture: URL.createObjectURL(compressedFile), // For preview
        }));
      } else if (imageType === 'backgroundImage') {
        setFormData((prev) => ({
          ...prev,
          backgroundImage: URL.createObjectURL(compressedFile), // For preview
        }));
      }
    } catch (error) {
      console.error('Error compressing the image:', error);
    } finally {
      setUploadingProfileImage(false);
      setUploadingBackgroundImage(false);
    }
  };

  // --- LINK --- 
  const handleAddLink = () => {
    const newLink = currentLink.trim(); // Elimina espacios en blanco
    if (!newLink) {
      setAlertMessage('Link cannot be empty');
      setAlertSeverity('error');
      setAlertOpen(true); // Muestra la alerta
      return;
    }
    if (formData.links.some((link) => link.url === newLink)) {
      setAlertMessage('This link already exists');
      setAlertSeverity('warning');
      setAlertOpen(true); // Muestra la alerta
      return;
    }
    setFormData((prev) => ({
      ...prev,
      links: [...prev.links, { url: newLink }],
    }));
    setCurrentLink(''); // Limpia el campo de entrada después de agregar
    setAlertMessage('Link added successfully');
    setAlertSeverity('success');
    setAlertOpen(true); // Muestra la alerta
  };  

  const handleDeleteLink = (index) => {
    setFormData((prev) => ({
      ...prev,
      links: prev.links.filter((_, i) => i !== index),
    }));
  };

  // --- GENERALIZED HANDLERS FOR MUSIC STYLES, LANGUAGES, AND NESTED FIELDS ---
  const handleAddItem = (item, type) => {
    const fieldParts = type.split('.');  // Divide el tipo para obtener los campos anidados
  
    if (fieldParts.length === 1) {
      // Caso sin anidación (como 'musicStyles' o 'languages')
      if (!formData[type].includes(item)) {
        setFormData((prev) => ({
          ...prev,
          [type]: [...prev[type], item],
        }));
      }
    } else if (fieldParts.length === 2) {
      // Caso con una propiedad anidada (como 'musicianInfo.instruments')
      const [parentField, childField] = fieldParts;
  
      if (parentField === 'groupInfo' && childField === 'groupType') {
        // Reemplazar el grupo si ya existe uno
        setFormData((prev) => ({
          ...prev,
          [parentField]: {
            ...prev[parentField],
            [childField]: [item],  // Reemplaza el grupo existente
          },
        }));
      } else {
        // Si no es 'groupInfo', agregar el item normalmente
        if (!formData[parentField][childField].includes(item)) {
          setFormData((prev) => ({
            ...prev,
            [parentField]: {
              ...prev[parentField],
              [childField]: [...prev[parentField][childField], item],
            },
          }));
        }
      }
    }
  };

  const handleDeleteItem = (item, type) => {
    const fieldParts = type.split('.');  // Divide el tipo para obtener los campos anidados
  
    if (fieldParts.length === 1) {
      // Caso sin anidación (como 'musicStyles' o 'languages')
      setFormData((prev) => ({
        ...prev,
        [type]: prev[type].filter((i) => i !== item),
      }));
    } else if (fieldParts.length === 2) {
      // Caso con una propiedad anidada (como 'musicianInfo.instruments')
      const [parentField, childField] = fieldParts;
  
      if (parentField === 'groupInfo' && childField === 'groupType') {
        // Eliminar el grupo al vaciar el array
        setFormData((prev) => ({
          ...prev,
          [parentField]: {
            ...prev[parentField],
            [childField]: [],  // Vaciar el grupo seleccionado
          },
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          [parentField]: {
            ...prev[parentField],
            [childField]: prev[parentField][childField].filter((i) => i !== item),
          },
        }));
      }
    }
  };  

  // --- SAVE --- 
  const handleSave = () => {
    const updatedUser = { ...formData };
    onSave(updatedUser);
  };

  return (
    <Box>
      {/* REAL NAME */}
      <TextField
        label="Real Name"
        value={formData.name}
        onChange={(e) => handleChange('name', e.target.value)}
        fullWidth
        sx={{ marginBottom: 2 }}
      />

      {/* LOCATION */}
      <Autocomplete
        options={locationsList}
        value={formData.location}
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

      {/* DESCRIPTION */}
      <TextField
        label="Description"
        value={formData.description}
        onChange={(e) => handleChange('description', e.target.value)}
        fullWidth
        sx={{ marginBottom: 2 }}
      />

      {/* USER TYPE */}
      <FormControl fullWidth sx={{ marginBottom: 2 }}>
        <InputLabel id="mainUser-type-label">User Type</InputLabel>
        <Select
          labelId="mainUser-type-label"
          id="mainUser-type"
          value={formData.userType}
          onChange={(e) => handleChange('userType', e.target.value)} // Use handleChange for userType
          label="User Type"
        >
          <MenuItem value="Musician">Musician</MenuItem>
          <MenuItem value="Group">Group</MenuItem>
          <MenuItem value="Service">Service</MenuItem>
        </Select>
      </FormControl>

      {/* Show instruments if mainUser type is Musician */}
      {formData.userType === 'Musician' && (
        <>
          <Typography variant="h6">
            Instruments
          </Typography>
          <Box display="flex" flexWrap="wrap" gap={1} sx={{ marginBottom: 2, marginTop: 1 }}>
            {formData.musicianInfo.instruments.length > 0 &&
              formData.musicianInfo.instruments.map((instrument, index) => (
                <Chip
                  key={index}
                  label={instrument}
                  onDelete={() => handleDeleteItem(instrument, 'musicianInfo.instruments')}
                  color="primary"
                />
              ))}
          </Box>
          <Box display="flex" gap={1} sx={{ marginBottom: 3 }}>
            {allInstruments.map((instrument) => (
              <Button
                key={instrument}
                variant="outlined"
                onClick={() => handleAddItem(instrument, 'musicianInfo.instruments')}
                disabled={formData.musicianInfo.instruments.includes(instrument)}
              >
                {instrument}
              </Button>
            ))}
          </Box>
        </>
      )}

      {/* Show groups if mainUser type is Group */}
      {formData.userType === 'Group' && (
        <>
          <Typography variant="h6">
            Group
          </Typography>
          <Box display="flex" flexWrap="wrap" gap={1} sx={{ marginBottom: 2, marginTop: 1 }}>
            {formData.groupInfo.groupType.length > 0 &&
              formData.groupInfo.groupType.map((group, index) => (
                <Chip
                  key={index}
                  label={group}
                  onDelete={() => handleDeleteItem(group, 'groupInfo.groupType')}
                  color="primary"
                />
              ))}
          </Box>
          <Box display="flex" gap={1} sx={{ marginBottom: 3}}>
            {allGroups.map((group) => (
              <Button
                key={group}
                variant="outlined"
                onClick={() => handleAddItem(group, 'groupInfo.groupType')}
                disabled={formData.groupInfo.groupType.includes(group)}
              >
                {group}
              </Button>
            ))}
          </Box>
        </>
      )}

      {/* Show services if mainUser type is Service */}
      {formData.userType === 'Service' && (
        <>
          <Typography variant="h6">
            Services
          </Typography>
          <Box display="flex" flexWrap="wrap" gap={1} sx={{ marginBottom: 2, marginTop: 1 }}>
            {formData.serviceInfo.serviceType.length > 0 &&
              formData.serviceInfo.serviceType.map((service, index) => (
                <Chip
                  key={index}
                  label={service}
                  onDelete={() => handleDeleteItem(service, 'serviceInfo.serviceType')}
                  color="primary"
                />
              ))}
          </Box>
          <Box display="flex" gap={1} sx={{ marginBottom: 3 }}>
            {allServices.map((service) => (
              <Button
                key={service}
                variant="outlined"
                onClick={() => handleAddItem(service, 'serviceInfo.serviceType')}
                disabled={formData.serviceInfo.serviceType.includes(service)}
              >
                {service}
              </Button>
            ))}
          </Box>
        </>
      )}

      {/* MUSIC STYLES */}
      <Typography variant="h6" sx={{ marginTop: 3 }}>
        Music Styles
      </Typography>
      <Box display="flex" flexWrap="wrap" gap={1} sx={{ marginBottom: 2 }}>
        {formData.musicStyles.map((style, index) => (
          <Chip
            key={index}
            label={style}
            onDelete={() => handleDeleteItem(style, 'musicStyles')}
            color="primary"
          />
        ))}
      </Box>
      <Box display="flex" gap={1}>
        {allMusicStyles.map((style) => (
          <Button
            key={style}
            variant="outlined"
            onClick={() => handleAddItem(style, 'musicStyles')}
            disabled={formData.musicStyles.includes(style)}
          >
            {style}
          </Button>
        ))}
      </Box>

      {/* LANGUAGES */}
      <Typography variant="h6" sx={{ marginTop: 3 }}>
        Languages
      </Typography>
      <Box display="flex" flexWrap="wrap" gap={1} sx={{ marginBottom: 2 }}>
        {formData.languages.map((language, index) => (
          <Chip
            key={index}
            label={language}
            onDelete={() => handleDeleteItem(language, 'languages')}
            color="primary"
          />
        ))}
      </Box>
      <Box display="flex" gap={1}>
        {allLanguages.map((language) => (
          <Button
            key={language}
            variant="outlined"
            onClick={() => handleAddItem(language, 'languages')}
            disabled={formData.languages.includes(language)}
          >
            {language}
          </Button>
        ))}
      </Box>

      {/* SOCIAL LINKS */}
      <Typography variant="h6">Social Links</Typography>
      {formData.links.map((link, index) => (
        <Box key={index} display="flex" alignItems="center" sx={{ marginBottom: 1 }}>
          <TextField value={link.url} fullWidth sx={{ marginRight: 1 }} disabled />
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
        <IconButton onClick={handleAddLink} disabled={!currentLink.trim()}>
          <AddIcon />
        </IconButton>
      </Box>

      {/* PROFILE PICTURE */}
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        Profile Picture
      </Typography>
      <Box display="flex" flexDirection="column" alignItems="center" sx={{ marginBottom: 2 }}>
        <Avatar
          src={formData.profilePicture}
          alt="Profile Preview"
          sx={{
            width: { xs: 90, md: 120 },
            height: { xs: 90, md: 120 },
            border: '2px solid white',
            marginBottom: 0,
            boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
          }}
        />
        <Button
          variant="contained"
          component="label"
          disabled={uploadingProfileImage}
          sx={{
            marginTop: '25px',
          }}
        >
          {uploadingProfileImage ? 'Processing...' : 'Upload New Picture'}
          <input type="file" hidden accept="image/*" onChange={(e) => handleImageUpload(e, 'profilePicture')} />
        </Button>
      </Box>

      {/* BACKGROUND IMAGE */}
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        Background Image
      </Typography>
      <Box display="flex" flexDirection="column" alignItems="center" sx={{ marginBottom: 2 }}>
        <img
          src={formData.backgroundImage}
          alt="Background"
          style={{
            width: '100%',
            height: '200px',
            objectFit: 'cover',
            borderRadius: '10px',
          }}
        />
        <Button
          variant="contained"
          component="label"
          disabled={uploadingBackgroundImage}
          sx={{
            marginTop: '25px',
          }}
        >
          {uploadingBackgroundImage ? 'Processing...' : 'Upload New Picture'}
          <input type="file" hidden accept="image/*" onChange={(e) => handleImageUpload(e, 'backgroundImage')} />
        </Button>
      </Box>

      {/* SAVE OR CANCEL */}
      <Button variant="contained" color="primary" onClick={handleSave} sx={{ marginTop: 3 }}>
        Save Changes
      </Button>
      <Button onClick={onClose} sx={{ marginTop: 1, marginLeft: 2 }}>
        Cancel
      </Button>

      <Snackbar
        open={alertOpen}
        autoHideDuration={4000} // Oculta automáticamente después de 4 segundos
        onClose={() => setAlertOpen(false)} // Cierra la alerta
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} // Posición de la alerta
      >
        <Alert onClose={() => setAlertOpen(false)} severity={alertSeverity} sx={{ width: '100%' }}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default EditProfileForm;
