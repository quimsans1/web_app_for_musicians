import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Grid, Box, Snackbar, Alert, CircularProgress, Typography } from '@mui/material';
import { getUsers } from '../services/userService';
import UserCard from '../components/UserCard';
import { getFavorites } from '../services/favoritesService';

const HomePage = () => {
  const { searchTerm, userTypeFilter, instrumentFilter, groupTypeFilter, serviceTypeFilter, languageFilter, countryFilter, musicStyleFilter } = useOutletContext();
  
  const [users, setUsers] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [alertOpen, setAlertOpen] = useState(false);  // Estado para mostrar el alert
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('success');

  const fetchFavorites = async () => {
    const data = await getFavorites();
    setFavorites(data);
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const filters = {
          userType: userTypeFilter,
          instrument: instrumentFilter,
          groupType: groupTypeFilter,
          serviceType: serviceTypeFilter,
          language: languageFilter,
          country: countryFilter,
          musicStyle: musicStyleFilter,
          searchTerm: searchTerm,
        };
        const users = await getUsers(filters);
        setUsers(users);
      } catch (error) {
        console.error('Error al obtener todos los usuarios:', error);
      }
    };
    fetchUsers();
  }, [searchTerm, userTypeFilter, instrumentFilter, groupTypeFilter, serviceTypeFilter, languageFilter, countryFilter, musicStyleFilter]);
  
  // Función para mostrar el alert cuando un usuario es seleccionado
  const handleFavoritedAlert = (message) => {
    fetchFavorites();
    setAlertMessage(message);
    setAlertSeverity('success');
    setAlertOpen(true);
  };

  // Función para mostrar el alert cuando un usuario es deseleccionado
  const handleUnFavoritedAlert = (message) => {
    fetchFavorites();
    setAlertMessage(message);
    setAlertSeverity('success');
    setAlertOpen(true);
  };

  if (users.length === 0) {
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
          Loading Users...
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 2, minWidth: '300px' }}>
      <Grid container spacing={3}>
        {users.map(user => (
          <Grid item xs={12} sm={6} md={4} lg={12 / 4} key={user.id}>
            <UserCard 
              user={user} 
              onFavorited={handleFavoritedAlert}
              onUnFavorited={handleUnFavoritedAlert}
              favorites={favorites}
            />
          </Grid>
        ))}
      </Grid>

      {/* Snackbar para mostrar el alert */}
      <Snackbar
        open={alertOpen}
        autoHideDuration={6000}
        onClose={() => setAlertOpen(false)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <Alert onClose={() => setAlertOpen(false)} severity={alertSeverity}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default HomePage;
