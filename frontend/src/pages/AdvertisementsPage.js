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
  const [successAlertOpen, setSuccessAlertOpen] = useState(false);
  const [errorAlertOpen, setErrorAlertOpen] = useState(false);
  const [deleteAlertOpen, setDeleteAlertOpen] = useState(false);

  const fetchAdvertisements = async () => {
    const data = await getAdvertisements();
    setAdvertisements(data);
  };

  useEffect(() => {    
    fetchAdvertisements();
  }, []);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleSuccessAlertClose = () => setSuccessAlertOpen(false);
  const handleErrorAlertClose = () => setErrorAlertOpen(false);
  const handleDeleteAlertClose = () => setDeleteAlertOpen(false);

  const handleDeleteAlert = () => {
    setDeleteAlertOpen(true)
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePublish = async () => {
    if (Object.values(formValues).some((value) => !value.trim())) {
      setErrorAlertOpen(true);
      return;
    }

    try {
      const newAd = await createAdvertisement(formValues);
      setAdvertisements((prev) => [...prev, newAd]);
      setIsModalOpen(false);
      setSuccessAlertOpen(true);
      setFormValues({ title: '', location: '', type: '', image: '', description: '', link: '' });
    } catch (error) {
      console.error('Error creating advertisement:', error);
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
          backgroundColor: '#f5f5f5',
        }}
      >
        <CircularProgress
          size={60}
          thickness={5}
          sx={{ color: '#1e88e5', marginBottom: 2 }}
        />
        <Typography variant="h6" color="textSecondary">
          Loading Advertisements...
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 3 }}>
      {/* BUTTON TO CREATE ADVERTISEMENT */}
      <Box sx={{ marginBottom: 5, textAlign: 'left' }}>
        <Button variant="outlined" color="primary" onClick={handleOpenModal}>
          Create Advertisement
        </Button>
      </Box>

      {/* ADVERTISEMENT CARDS */}
      <Grid container spacing={2}>
        {advertisements.map((ad) => (
          <AdvertisementCard
            key={ad.id}
            ad={ad}
            mainUser={mainUser}
            fetchAdvertisements={fetchAdvertisements}
            handleDeleteAlert={handleDeleteAlert}
          />
        ))}
      </Grid>
      
      {/* MODAL: CREATE AD */}
      <CreateAdvertisementModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        formValues={formValues}
        onChange={handleChange}
        onPublish={handlePublish}
      />

      {/* ALERTS */}
      <Snackbar
        open={successAlertOpen}
        autoHideDuration={4000}
        onClose={handleSuccessAlertClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <Alert onClose={handleSuccessAlertClose} severity="success" sx={{ width: '100%' }}>
          Advertisement created successfully!
        </Alert>
      </Snackbar>

      <Snackbar
        open={errorAlertOpen}
        autoHideDuration={4000}
        onClose={handleErrorAlertClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleErrorAlertClose} severity="warning" sx={{ width: '100%' }}>
          All fields are required!
        </Alert>
      </Snackbar>

      <Snackbar
        open={deleteAlertOpen}
        autoHideDuration={4000}
        onClose={handleDeleteAlertClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleDeleteAlertClose} severity="success" sx={{ width: '100%' }}>
          Advertisement deleted successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AdvertisementsPage;
