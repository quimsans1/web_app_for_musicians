import React, { useEffect, useState } from 'react';
import { getAdvertisements, createAdvertisement } from '../services/advertisementsService';
import {
  Box,
  Grid,
  Button,
  Snackbar,
  Alert,
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

  useEffect(() => {
    const fetchAdvertisements = async () => {
      const data = await getAdvertisements();
      setAdvertisements(data);
    };
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
      const newAd = await createAdvertisement(formValues);
      setAdvertisements((prev) => [...prev, newAd]);
      setIsModalOpen(false); // Cierra el modal
      setSuccessSnackbarOpen(true); // Mostrar mensaje de éxito
      setFormValues({ title: '', location: '', type: '', image: '', description: '', link: '' }); // Reinicia el formulario
    } catch (error) {
      console.error('Error al crear el advertisement:', error);
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Box sx={{ marginBottom: 2, textAlign: 'right' }}>
        <Button variant="contained" color="primary" onClick={handleOpenModal}>
          Create Advertisement
        </Button>
      </Box>

      <Grid container spacing={2}>
        {advertisements.map((ad) => (
          <AdvertisementCard key={ad.id} ad={ad} mainUser={mainUser} />
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
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
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
