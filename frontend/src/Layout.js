// Layout.js
import React, { useState, useEffect } from 'react';
import { Box, CssBaseline, Drawer, List, ListItem, ListItemText, Typography, Toolbar, AppBar, IconButton } from '@mui/material';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { getUserById, getMainUser } from './services/userService';
import SearchUserFilters from './components/SearchUserFilters';

const drawerWidth = 240;

const Layout = ({ mainUser }) => {
  const [userMain, setUserMain] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [languageFilter, setLanguageFilter] = useState('');
  const [countryFilter, setCountryFilter] = useState('');
  const [musicStyleFilter, setMusicStyleFilter] = useState('');
  const [userTypeFilter, setUserTypeFilter] = useState('');
  const [instrumentFilter, setInstrumentFilter] = useState('');
  const [groupTypeFilter, setGroupTypeFilter] = useState('');
  const [serviceTypeFilter, setServiceTypeFilter] = useState('');

  const [profileUserName, setProfileUserName] = useState(null);

  useEffect(() => {
    setUserMain(mainUser);
  }, [mainUser]);

  useEffect(() => {
    const pathMatch = location.pathname.match(/^\/profile\/([a-zA-Z0-9-]+)$/);
    if (pathMatch) {
      const userId = pathMatch[1];
      const fetchProfileUserName = async () => {
        try {
          const mainUserDataArray = await getMainUser();
          const mainUser = mainUserDataArray[0];
          if (mainUser && userId === mainUser.id) {
            setProfileUserName(mainUser.nickname);
          } else {
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
      setProfileUserName(null);
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
            <>
              <IconButton edge="start" color="inherit" onClick={() => navigate(-1)} sx={{ mr: 2 }}>
                <ArrowBackIcon />
              </IconButton>
              <Typography variant="h6" noWrap>{profileUserName}</Typography>
            </>
          ) : (
            location.pathname === '/' && (
              <SearchUserFilters
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                userTypeFilter={userTypeFilter}
                setUserTypeFilter={setUserTypeFilter}
                instrumentFilter={instrumentFilter}
                setInstrumentFilter={setInstrumentFilter}
                groupTypeFilter={groupTypeFilter}
                setGroupTypeFilter={setGroupTypeFilter}
                serviceTypeFilter={serviceTypeFilter}
                setServiceTypeFilter={setServiceTypeFilter}
                languageFilter={languageFilter}
                setLanguageFilter={setLanguageFilter}
                countryFilter={countryFilter}
                setCountryFilter={setCountryFilter}
                musicStyleFilter={musicStyleFilter}
                setMusicStyleFilter={setMusicStyleFilter}
              />
            )
          )}
        </Toolbar>
      </AppBar>

      <Drawer sx={{ width: drawerWidth, flexShrink: 0, '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' } }} variant="permanent" anchor="left">
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {menuItems.map((item) => (
              <ListItem button key={item.text} component={Link} to={item.path}>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Outlet context={{ searchTerm, userTypeFilter, instrumentFilter, groupTypeFilter, serviceTypeFilter, languageFilter, countryFilter, musicStyleFilter }} />
      </Box>
    </Box>
  );
};

export default Layout;
