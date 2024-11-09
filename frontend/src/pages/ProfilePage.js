import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Avatar,
  Typography,
  Card,
  CardContent,
  IconButton,
  Button,
  Grid,
  Box,
  Divider,
  Dialog,
  DialogContent,
  ImageList,
  ImageListItem,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import LanguageIcon from '@mui/icons-material/Language';
import PlaceIcon from '@mui/icons-material/Place';
import MessageIcon from '@mui/icons-material/Message';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import PublicIcon from '@mui/icons-material/Public';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import { getUserById, getMainUser } from '../services/userService';
import { getAdvertisements } from '../services/advertisementsService';
import AdvertisementCard from '../components/AdvertisementCard';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [isFavorited, setIsFavorited] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [userAdvertisements, seUserAdvertisements] = useState([]);

  // Get User Information
  useEffect(() => {
    const fetchMainUser = async () => {
      try {
        const mainUserDataArray = await getMainUser();
        const mainUserData = mainUserDataArray[0]; // Extrae el primer objeto del array
  
        if (mainUserData && userId === mainUserData.id) {
          setUser(mainUserData);
        } else {
          fetchUser();
        }
      } catch (error) {
        console.error('Error fetching main user data:', error);
      }
    };
  
    const fetchUser = async () => {
      try {
        const userData = await getUserById(userId);
        setUser(userData);
      } catch (error) {
        console.error(`Error fetching user with ID ${userId}:`, error);
      }
    };
  
    fetchMainUser();
  }, [userId]);

  // Get Advertisements of User
  useEffect(() => {
    const fetchAdvertisements = async () => {
      const userAdvertisements = await getAdvertisements();
      const filteredAdvertisements = userAdvertisements.filter(adv => adv.userId === userId);
      seUserAdvertisements(filteredAdvertisements)
    };
    fetchAdvertisements();    
  }, [user, userId]);

  const handleFavoriteToggle = () => setIsFavorited(!isFavorited);
  const handleDialogOpen = (index) => {
    setCurrentImageIndex(index);
    setModalOpen(true);
  };
  const handleDialogClose = () => setModalOpen(false);
  const handleNextImage = () => setCurrentImageIndex((currentImageIndex + 1) % user.photos.length);
  const handlePreviousImage = () => setCurrentImageIndex((currentImageIndex + user.photos.length - 1) % user.photos.length);

  const getLinkIcon = (url) => {
    if (url.includes('youtube.com')) return <YouTubeIcon color="primary" />;
    if (url.includes('instagram.com')) return <InstagramIcon color="primary" />;
    if (url.includes('twitter.com')) return <TwitterIcon color="primary" />;
    return <LanguageIcon />;
  };

  const navigate = useNavigate();

  const handleChatClick = (e) => {
    e.stopPropagation(); // Evita que se dispare el evento de clic en la tarjeta
    navigate('/chats', { state: { selectedChatId: user.id } }); // Navega a la página de chats con el ID del usuario
  };

  if (!user) return <div>Loading user...</div>; // Més currat

  return (
    <Box sx={{ backgroundColor: 'white', padding: 4 }}>
      <Grid container spacing={2} justifyContent="center">
        {/* USER PRESENTATION */}
        <Grid item xs={12} md={12}>
          <Box sx={{ position: 'relative', textAlign: 'center', width: '49%', float: 'left' }}>
            {/* BACKGROUND IMAGE */}
            <img
              src={user.backgroundImage}
              alt="Background"
              style={{
                width: '100%',
                height: '200px',
                objectFit: 'cover',
                borderRadius: '10px',
              }}
            />
            {/* NICKNAME & NAME */}
            <Avatar
              src={user.profilePicture}
              alt={user.nickname}
              sx={{
                width: { xs: 90, md: 120 },
                height: { xs: 90, md: 120 },
                border: '3px solid white',
                position: 'absolute',
                top: '160px',
                left: '50%',
                transform: 'translateX(-50%)',
                boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
              }}
            />
            <Typography variant="h5" sx={{ fontWeight: 'bold', mt: 10 }}>
              {user.nickname}
            </Typography>
            <Typography color="textSecondary" variant="subtitle2">
              {user.name}
            </Typography>
            {/* FAVORITE & MESSAGE BUTTONS */}
            <Box display="flex" flexDirection="column" alignItems="center" mt={2}>
              <IconButton color={isFavorited ? 'secondary' : 'default'} onClick={handleFavoriteToggle}>
                <FavoriteIcon fontSize="large" />
              </IconButton>
              <Button
                aria-label="send message"
                variant="contained"
                color="primary"
                startIcon={<MessageIcon />}
                sx={{ mt: 1 }}
                onClick={handleChatClick}
              >
                Message
              </Button>
            </Box>
          </Box>
          
          {/* PERSONAL INFORMATION */}
          <Box sx={{ position: 'relative', textAlign: 'left', width: '49%', float: 'right' }}>
            <Card sx={{ padding: 3, marginTop: 0.2 }}>
              {/* Instruments, Music Styles, Languages, Location */}
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Instruments</Typography>
                <Typography sx={{ mb: 1 }}>
                  <MusicNoteIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 1 }} />
                  {user.instrument.join(', ')}
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Music Styles</Typography>
                <Typography sx={{ mb: 1 }}>
                  <MusicNoteIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 1 }} />
                  {user.musicStyles.join(', ')}
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Languages</Typography>
                <Typography sx={{ mb: 1 }}>
                  <PublicIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 1 }} />
                  {user.languages.join(', ')}
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Location</Typography>
                <Typography sx={{ mb: 1 }}>
                  <PlaceIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 1 }} />
                  {user.location}
                </Typography>

                <Divider sx={{ my: 3 }} />
                <Typography variant="body1">{user.description}</Typography>

                {/* LINKS */}
                <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 2 }}>Social Links</Typography>
                <Grid container spacing={1} direction="column" justifyContent="flex-start" mt={1}>
                  {user.links.map((link, index) => (
                    <Grid item key={index}>
                      <Box display="flex" alignItems="center" mb={1}> {/* Agregué un margen en la parte inferior para separar los elementos */}
                        <IconButton
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          color="primary"
                          sx={{ mr: 1 }}
                        >
                          {getLinkIcon(link.url)}
                        </IconButton>
                        <Typography
                          component="a"
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          color="primary"
                          sx={{ textDecoration: 'none', fontSize: '0.9rem' }}
                        >
                          {link.url}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Box>
        </Grid>
      </Grid>

      {/* GALLERY */}
      <Box sx={{ marginTop: 4, width: '50%', margin: 'auto', padding: 1.2, float: 'right' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>Gallery</Typography>
        <ImageList cols={4} gap={8}>
          {user.photos.map((photo, index) => (
            <ImageListItem
              key={index}
              onClick={() => handleDialogOpen(index)}
              sx={{
                cursor: 'pointer',
                position: 'relative', // Asegura que el contenedor esté posicionado correctamente
                overflow: 'visible',  // Permite que la imagen se salga del contenedor sin ser recortada
                transition: 'transform 0.3s ease', // Transición suave
                '&:hover': {
                  transform: 'scale(1.01)', // Aumenta el tamaño de la imagen al hacer hover
                  zIndex: 1, // Asegura que la imagen esté por encima de otros elementos
                },
              }}
            >
              <img
                src={photo}
                alt={`Photo ${index + 1}`}
                style={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover', // Asegura que la imagen se recorte de manera proporcional
                  borderRadius: '8px',
                  boxShadow: '0px 2px 10px rgba(0,0,0,0.1)',
                  transition: 'transform 0.3s ease', // Suaviza la transición al hacer hover
                }}
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>

      {/* ADVERTISEMENTS */}
      <Box sx={{ marginTop: 4, width: '50%', margin: 'auto', padding: 1.2, float: 'left' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>Advertisements</Typography>
        <Grid container spacing={1} >
          {userAdvertisements.map((advertisement) => (
            <Grid item xs={12} md={12} lg={12} key={advertisement.id} >
              <AdvertisementCard ad={advertisement} />
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* IMAGE VIEWER MODAL */}
      <Dialog open={modalOpen} onClose={handleDialogClose} maxWidth="md" fullWidth>
        <DialogContent sx={{ position: 'relative', textAlign: 'center', padding: 0 }}>
          <IconButton
            onClick={handlePreviousImage}
            sx={{
              position: 'absolute',
              top: '50%',
              left: '10px',
              transform: 'translateY(-50%)',
              backgroundColor: 'rgba(0,0,0,0.5)',
              color: 'white',
            }}
          >
            <ArrowBackIosIcon />
          </IconButton>

          <img
            src={user.photos[currentImageIndex]}
            alt={`Photo ${currentImageIndex + 1}`}
            style={{ width: '100%', maxHeight: '80vh', objectFit: 'contain' }}
          />

          <IconButton
            onClick={handleNextImage}
            sx={{
              position: 'absolute',
              top: '50%',
              right: '10px',
              transform: 'translateY(-50%)',
              backgroundColor: 'rgba(0,0,0,0.5)',
              color: 'white',
            }}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default ProfilePage;
