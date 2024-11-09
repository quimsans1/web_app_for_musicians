import React, { useEffect, useState } from 'react';
import { getAdvertisements } from '../services/advertisementsService'; // Asegúrate de importar el nuevo servicio
import { Box, Card, CardContent, Typography, Chip, Grid } from '@mui/material';
import AdvertisementCard from '../components/AdvertisementCard';

const AdvertisementsPage = () => {
  const [advertisements, setAdvertisements] = useState([]);

  useEffect(() => {
    const fetchAdvertisements = async () => {
      const data = await getAdvertisements();
      setAdvertisements(data);
    };
    fetchAdvertisements();
  }, []);

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Anuncios
      </Typography>
      <Grid container spacing={2}>
        {advertisements.map((ad) => (
          <AdvertisementCard ad={ad}/>
        ))}
      </Grid>
    </Box>
  );
};

export default AdvertisementsPage;
