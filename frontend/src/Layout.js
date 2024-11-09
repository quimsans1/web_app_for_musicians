// Layout.js
import React, { useState, useEffect } from 'react';
import { Box, CssBaseline, Drawer, List, ListItem, ListItemText, Typography, Toolbar, AppBar, Button, TextField, InputAdornment, Select, MenuItem, IconButton } from '@mui/material';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { getUserById, getMainUser } from './services/userService';

const drawerWidth = 240;

const Layout = ({mainUser}) => {
  const [userMain, setUserMain] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [languageFilter, setLanguageFilter] = useState('');
  const [countryFilter, setCountryFilter] = useState('');
  const [musicStyleFilter, setMusicStyleFilter] = useState('');
  const [profileUserName, setProfileUserName] = useState(null);

  useEffect(() => {
    setUserMain(mainUser[0])
  }, [mainUser]);

  // If we're on a Profile Page, gets user's nickname to display in the Toolbar
  useEffect(() => {
    const pathMatch = location.pathname.match(/^\/profile\/([a-zA-Z0-9-]+)$/);  
    if (pathMatch) {
      const userId = pathMatch[1];
  
      const fetchProfileUserName = async () => {
        try {
          // Obtener el usuario principal
          const mainUserDataArray = await getMainUser();
          const mainUser = mainUserDataArray[0];
  
          if (mainUser && userId === mainUser.id) {
            // Si el userId en el path coincide con el id del mainUser, usar su nickname
            setProfileUserName(mainUser.nickname);
          } else {
            // Si no, buscar el usuario por ID y obtener su nickname
            const otherUserData = await getUserById(userId);
            setProfileUserName(otherUserData.nickname);
          }
        } catch (error) {
          console.error('Error fetching profile user nickname:', error);
          setProfileUserName(null);
        }
      };
  
      fetchProfileUserName();
    } else {
      setProfileUserName(null); // No estamos en una página de perfil
    }
  }, [location]);

  const menuItems = [
    { text: 'Home', path: '/' },
    { text: 'Advertisements', path: '/advertisements' },
    { text: 'Chats', path: '/chats' },
    { text: 'News', path: '/news' },
    { text: 'Profile', path: `/profile/${userMain?.id || ''}` },
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}>
        <Toolbar>
          {profileUserName ? (
            // Mostrar la flecha y el nombre del usuario en la página de perfil
            <>
              <IconButton edge="start" color="inherit" onClick={() => navigate(-1)} sx={{ mr: 2 }}>
                <ArrowBackIcon />
              </IconButton>
              <Typography variant="h6" noWrap>{profileUserName}</Typography>
            </>
          ) : (
            // Filtros y búsqueda para la pantalla de inicio
            location.pathname === '/' && (
              <>
                <TextField
                  variant="outlined"
                  size="small"
                  placeholder="User Name"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Typography sx={{ marginRight: 1 }}>@</Typography>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    backgroundColor: 'white',
                    borderRadius: '4px',
                    width: '200px',
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': { borderColor: 'grey.400' },
                      '&:hover fieldset': { borderColor: 'primary.main' },
                      '&.Mui-focused fieldset': { borderColor: 'primary.main' },
                    },
                  }}
                />
                {/* Filtros de lenguaje, país y estilo musical */}
                <Select
                  value={languageFilter}
                  onChange={(e) => setLanguageFilter(e.target.value)}
                  displayEmpty
                  variant="outlined"
                  size="small"
                  sx={{
                    marginLeft: 2,
                    backgroundColor: 'white',
                    height: '36px',
                    width: '170px',
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': { borderColor: 'grey.400' },
                      '&:hover fieldset': { borderColor: 'primary.main' },
                      '&.Mui-focused fieldset': { borderColor: 'primary.main' },
                      '& input': { padding: '6px 10px' },
                    },
                  }}
                >
                  <MenuItem value=""><em>Select Language</em></MenuItem>
                  <MenuItem value="English">English</MenuItem>
                  <MenuItem value="Spanish">Spanish</MenuItem>
                  <MenuItem value="French">French</MenuItem>
                </Select>
                <Select
                  value={countryFilter}
                  onChange={(e) => setCountryFilter(e.target.value)}
                  displayEmpty
                  variant="outlined"
                  size="small"
                  sx={{
                    marginLeft: 2,
                    backgroundColor: 'white',
                    height: '36px',
                    width: '170px',
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': { borderColor: 'grey.400' },
                      '&:hover fieldset': { borderColor: 'primary.main' },
                      '&.Mui-focused fieldset': { borderColor: 'primary.main' },
                      '& input': { padding: '6px 10px' },
                    },
                  }}
                >
                  <MenuItem value=""><em>Select Country</em></MenuItem>
                  <MenuItem value="USA">USA</MenuItem>
                  <MenuItem value="France">France</MenuItem>
                </Select>
                <Select
                  value={musicStyleFilter}
                  onChange={(e) => setMusicStyleFilter(e.target.value)}
                  displayEmpty
                  variant="outlined"
                  size="small"
                  sx={{
                    marginLeft: 2,
                    backgroundColor: 'white',
                    height: '36px',
                    width: '170px',
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': { borderColor: 'grey.400' },
                      '&:hover fieldset': { borderColor: 'primary.main' },
                      '&.Mui-focused fieldset': { borderColor: 'primary.main' },
                      '& input': { padding: '6px 10px' },
                    },
                  }}
                >
                  <MenuItem value=""><em>Select Style</em></MenuItem>
                  <MenuItem value="Rock">Rock</MenuItem>
                  <MenuItem value="Jazz">Jazz</MenuItem>
                  <MenuItem value="Classical">Classical</MenuItem>
                  <MenuItem value="Pop">Pop</MenuItem>
                  <MenuItem value="Electronic">Electronic</MenuItem>
                </Select>
              </>
            )
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <Button
                component={Link}
                to={item.path}
                sx={{
                  width: '100%',
                  justifyContent: 'center',
                  backgroundColor: location.pathname === item.path ? 'primary.main' : 'transparent',
                  color: location.pathname === item.path ? 'white' : 'inherit',
                  '&:hover': {
                    backgroundColor: location.pathname === item.path ? 'primary.dark' : 'rgba(0, 0, 0, 0.08)',
                  },
                }}
              >
                <ListItemText primary={item.text} sx={{ textAlign: 'center' }} />
              </Button>
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        <Outlet context={{ searchTerm, languageFilter, countryFilter, musicStyleFilter }} />
      </Box>
    </Box>
  );
};

export default Layout;