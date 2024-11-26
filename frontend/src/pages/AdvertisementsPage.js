import React, { useEffect, useState } from 'react';
import { getAdvertisements, createAdvertisement } from '../services/advertisementsService';
import {
  Box,
  Grid,
  Button,
  Snackbar,
  Alert,
  CircularProgress,
  Typography,
} from '@mui/material';
import AdvertisementCard from '../components/AdvertisementCard';
import CreateAdvertisementModal from '../components/CreateAdvertisementModal';

const AdvertisementsPage = ({ mainUser }) => {
  const [advertisements, setAdvertisements] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formValues, setFormValues] = useState({
    title: '',
    location: '',
    type: '',
    image: '',
    description: '',
    link: '',
  });
  const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);
  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);

  const fetchAdvertisements = async () => {
    const data = await getAdvertisements();
    setAdvertisements(data);
  };

  useEffect(() => {    
    fetchAdvertisements();
  }, []);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleSuccessSnackbarClose = () => setSuccessSnackbarOpen(false);
  const handleErrorSnackbarClose = () => setErrorSnackbarOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePublish = async () => {
    if (Object.values(formValues).some((value) => !value.trim())) {
      setErrorSnackbarOpen(true); // Mostrar mensaje de error
      return;
    }

    try {
      console.log('formValues', formValues)
      const newAd = await createAdvertisement(formValues);
      setAdvertisements((prev) => [...prev, newAd]);
      setIsModalOpen(false); // Cierra el modal
      setSuccessSnackbarOpen(true); // Mostrar mensaje de éxito
      setFormValues({ title: '', location: '', type: '', image: '', description: '', link: '' }); // Reinicia el formulario
    } catch (error) {
      console.error('Error al crear el advertisement (Ad Page):', error);
    }
  };

  if (advertisements.length === 0) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          backgroundColor: '#f5f5f5', // Fondo suave
        }}
      >
        <CircularProgress
          size={60}
          thickness={5}
          sx={{ color: '#1e88e5', marginBottom: 2 }} // Personaliza el color y tamaño
        />
        <Typography variant="h6" color="textSecondary">
          Loading Advertisements...
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 3 }}>
      <Box sx={{ marginBottom: 2, textAlign: 'right' }}>
        <Button variant="contained" color="primary" onClick={handleOpenModal}>
          Create Advertisement
        </Button>
      </Box>

      <Grid container spacing={2}>
        {advertisements.map((ad) => (
          <AdvertisementCard
            key={ad.id}
            ad={ad}
            mainUser={mainUser}
            fetchAdvertisements={fetchAdvertisements}
          />
        ))}
      </Grid>

      <CreateAdvertisementModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        formValues={formValues}
        onChange={handleChange}
        onPublish={handlePublish}
      />

      <Snackbar
        open={successSnackbarOpen}
        autoHideDuration={4000}
        onClose={handleSuccessSnackbarClose}
        anchorOrigin={{
          vertical: 'bottom',  // Position it at the top of the screen
          horizontal: 'center',  // Center it horizontally
        }}
      >
        <Alert onClose={handleSuccessSnackbarClose} severity="success" sx={{ width: '100%' }}>
          Advertisement created successfully!
        </Alert>
      </Snackbar>

      <Snackbar
        open={errorSnackbarOpen}
        autoHideDuration={4000}
        onClose={handleErrorSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleErrorSnackbarClose} severity="error" sx={{ width: '100%' }}>
          All fields are required!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AdvertisementsPage;
