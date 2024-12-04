import React, { useState, useEffect } from 'react';
import { Box, CssBaseline, Drawer, List, ListItem, Typography, Toolbar, AppBar, IconButton } from '@mui/material';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HomeIcon from '@mui/icons-material/Home';
import CampaignIcon from '@mui/icons-material/Campaign';
import ChatIcon from '@mui/icons-material/Chat';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { getUserById } from './services/userService';
import SearchUserFilters from './components/SearchUserFilters';

const Layout = ({ mainUser }) => {
  const drawerWidth = 240;
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

  // If in Profile Page, display the user's Nickname in the Header (AppBar)
  useEffect(() => {
    const pathMatch = location.pathname.match(/^\/profile\/([a-zA-Z0-9-]+)$/);
    if (pathMatch) {
      const userId = pathMatch[1];
      const fetchProfileUserName = async () => {
        try {
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
  }, [location, mainUser]);

  // --- MENU ITEMS ---
  const menuItems = [
    { text: 'HomePage', path: '/', icon: <HomeIcon /> },
    { text: 'Advertisements', path: '/advertisements', icon: <CampaignIcon /> },
    { text: 'Chats', path: '/chats', icon: <ChatIcon /> },
    { text: 'News', path: '/news', icon: <NewspaperIcon /> },
    { text: 'Profile', path: `/profile/${mainUser?.id || ''}`, icon: <AccountCircleIcon /> },
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      {/* HEADER */}
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
          backgroundColor: 'white',
          color: 'black',
          boxShadow: 'none',
          borderBottom: '1px solid gray',
        }}
      >
        {/* DISPLAY HEADER INFORMATION DEPENDING ON THE PATH */}
        <Toolbar sx={{ display: 'flex', alignItems: 'center', paddingLeft: 0, paddingRight: 0 }}>
          {profileUserName ? (
            <>
              <IconButton
                edge="start"
                onClick={() => navigate(-1)}
                sx={{ mr: 1 }}
              >
                <ArrowBackIcon
                  sx={{
                    color: '#1e88e5',
                    fontSize: '30px',
                    fontWeight: 'bold',
                  }}
                />
              </IconButton>
              <Typography variant="h6" noWrap>
                {profileUserName}
              </Typography>
            </>
          ) : location.pathname === '/' ? (
            <>
              <Box sx={{ display: 'flex', alignItems: 'center', marginRight: -32 }}>
                <img src="/LogoMusync.svg" alt="Logo" style={{ width: '10%', height: 'auto' }} />
              </Box>
              <Typography variant="h6" noWrap sx={{ marginRight: 4 }}>
                Home
              </Typography>
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
            </>
          ) : location.pathname === '/advertisements' ? (
            <>
              <Box sx={{ display: 'flex', alignItems: 'center', marginRight: -32 }}>
                <img src="/LogoMusync.svg" alt="Logo" style={{ width: '10%', height: 'auto' }} />
              </Box>
              <Typography variant="h6" noWrap>
                Advertisements
              </Typography>
            </>
          ) : location.pathname === '/chats' ? (
            <>
              <Box sx={{ display: 'flex', alignItems: 'center', marginRight: -32 }}>
                <img src="/LogoMusync.svg" alt="Logo" style={{ width: '10%', height: 'auto' }} />
              </Box>
              <Typography variant="h6" noWrap>
                Chats
              </Typography>
            </>
          ) : null}
        </Toolbar>
      </AppBar>
      
      {/* NAVIGATION MENU */}
      <Drawer sx={{ width: drawerWidth, flexShrink: 0, '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' } }} variant="permanent" anchor="left">
        <Toolbar />
        {/* LOGO */}
        <Box sx={{ textAlign: 'center', mt: 2 }}>
          <img src="/LogoMusync.svg" alt="Logo" style={{ width: '40%', height: 'auto', marginTop: '-50px', marginBottom: '30px' }} />
        </Box>
        {/* MENU LIST */}
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {menuItems.map((item) => {
              // Check if current path matches with the menu path
              const isPathActive = location.pathname === item.path;

              return (
                <ListItem
                  button
                  component={Link}
                  to={item.path}
                  key={item.text}
                  sx={{
                    display: 'flex',
                    justifyContent: 'left',
                    alignItems: 'left',
                    backgroundColor: isPathActive ? '#f0f0f0' : 'transparent',
                    padding: 1,
                  }}
                >
                  <IconButton
                    sx={{
                      color: isPathActive ? '#1e88e5' : 'gray',
                      marginLeft: 3,
                    }}
                  >
                    {React.cloneElement(item.icon, { sx: { fontSize: '2rem' } })}
                  </IconButton>
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: isPathActive ? 'bold' : 'normal',
                      color: isPathActive ? '#1e88e5' : 'black',
                      marginLeft: 2,
                      fontSize: 17,
                    }}
                  >
                    {item.text}
                  </Typography>
                </ListItem>
              );
            })}
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
