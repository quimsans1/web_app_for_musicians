// Home.js
import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Grid, Box } from '@mui/material';
import { getUsers } from '../services/userService';
import UserCard from '../components/UserCard';

const Home = () => {
  const { searchTerm, userTypeFilter, instrumentFilter, groupTypeFilter, serviceTypeFilter, languageFilter, countryFilter, musicStyleFilter } = useOutletContext();
  
  const [users, setUsers] = useState([]);

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

  return (
    <Box sx={{ padding: 2, minWidth: '300px' }}>
      <Grid container spacing={3}>
        {users.map(user => (
          <Grid item xs={12} sm={6} md={4} lg={12 / 4} key={user.id}>
            <UserCard user={user} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Home;
