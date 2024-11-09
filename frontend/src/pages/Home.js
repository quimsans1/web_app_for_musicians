import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Grid, Box } from '@mui/material';
import { getUsers } from '../services/userService';
import UserCard from '../components/UserCard';

const Home = () => {
  const { searchTerm, languageFilter, countryFilter, musicStyleFilter } = useOutletContext();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [columns, setColumns] = useState(4); // Estado para el número de columnas (lg)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await getUsers();
        setUsers(users);
        setFilteredUsers(users);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const filtered = users.filter(user => {
      const matchesNickname = user.nickname.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLanguage = languageFilter ? user.languages.includes(languageFilter) : true;
      const matchesCountry = countryFilter ? user.location.includes(countryFilter) : true;
      const matchesMusicStyle = musicStyleFilter ? user.musicStyles.includes(musicStyleFilter) : true;
      return matchesNickname && matchesLanguage && matchesCountry && matchesMusicStyle;
    });
    setFilteredUsers(filtered);
  }, [searchTerm, languageFilter, countryFilter, musicStyleFilter, users]);

  useEffect(() => {
    // Función para ajustar el número de columnas en función del ancho
    const updateColumns = () => {
      if (window.innerWidth < 1000) {
        setColumns(6); // Cambia a 6 columnas en pantallas pequeñas
      } else {
        setColumns(4); // 4 columnas en pantallas grandes
      }
    };

    // Configura el evento resize
    window.addEventListener('resize', updateColumns);

    // Llama a la función de actualización una vez al cargar el componente
    updateColumns();

    // Limpia el listener en el desmontaje del componente
    return () => {
      window.removeEventListener('resize', updateColumns);
    };
  }, []);

  return (
    <Box sx={{ padding: 2, minWidth: '300px' }}>
      <Grid container spacing={3}>
        {filteredUsers.map(user => (
          <Grid item xs={12} sm={6} md={4} lg={columns} key={user.id}>
            <UserCard user={user} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Home;
