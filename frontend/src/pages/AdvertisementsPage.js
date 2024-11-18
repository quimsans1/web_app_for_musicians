import React, { useEffect, useState } from 'react';
import { getAdvertisements, createAdvertisement } from '../services/advertisementsService'; // Importar servicio
import { Box, Grid, Button, Modal, TextField, Typography, Chip, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import AdvertisementCard from '../components/AdvertisementCard';

const AdvertisementsPage = () => {
  const [advertisements, setAdvertisements] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formValues, setFormValues] = useState({
    title: '',
    location: '',
    type: '',
    image: '',
    description: '',
    link: ''
  });

  useEffect(() => {
    const fetchAdvertisements = async () => {
      const data = await getAdvertisements();
      setAdvertisements(data);
    };
    fetchAdvertisements();
  }, []);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePublish = async () => {
    if (Object.values(formValues).some((value) => !value.trim())) {
      alert('Todos los campos son obligatorios');
      return;
    }
  
    try {
      console.log('Form values:', formValues); // Comprova els valors del formulari
      const newAd = await createAdvertisement(formValues);
      console.log('Nou anunci creat:', newAd);
      
      // Si la publicació és exitosa, actualitza el conjunt d'anuncis
      setAdvertisements((prev) => [...prev, newAd]);
      setIsModalOpen(false); // Tanca el modal després de publicar
      setFormValues({ title: '', location: '', type: '', image: '', description: '', link: '' }); // Reinicia el formulari
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
          <AdvertisementCard key={ad.id} ad={ad} />
        ))}
      </Grid>

      {/* Modal para crear advertisement */}
      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="create-advertisement-modal"
        aria-describedby="create-advertisement-form"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            width: 400,
          }}
        >
          <Typography variant="h6" component="h2" gutterBottom>
            Create Advertisement
          </Typography>
          <TextField
            label="Title"
            name="title"
            fullWidth
            margin="normal"
            value={formValues.title}
            onChange={handleChange}
          />
          <TextField
            label="Description"
            name="description"
            fullWidth
            margin="normal"
            value={formValues.description}
            onChange={handleChange}
          />
          <TextField
            label="Image URL"
            name="image"
            fullWidth
            margin="normal"
            value={formValues.image}
            onChange={handleChange}
          />
          <TextField
            label="Link (optional)"
            name="link"
            fullWidth
            margin="normal"
            value={formValues.link}
            onChange={handleChange}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Location</InputLabel>
            <Select
              label="Location"
              name="location"
              value={formValues.location}
              onChange={handleChange}
            >
              <MenuItem value="Barcelona, Spain">Barcelona, Spain</MenuItem>
              <MenuItem value="Madrid, Spain">Madrid, Spain</MenuItem>
              <MenuItem value="Valencia, Spain">Valencia, Spain</MenuItem>
              {/* Agrega más ubicaciones aquí */}
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel>Type</InputLabel>
            <Select
              label="Type"
              name="type"
              value={formValues.type}
              onChange={handleChange}
            >
              <MenuItem value="Offer">Offer</MenuItem>
              <MenuItem value="Event">Event</MenuItem>
            </Select>
          </FormControl>

          <Box sx={{ marginTop: 2, textAlign: 'right' }}>
            <Button variant="outlined" onClick={handleCloseModal} sx={{ marginRight: 1 }}>
              Cancel
            </Button>
            <Button variant="contained" color="primary" onClick={handlePublish}>
              Publish
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default AdvertisementsPage;
