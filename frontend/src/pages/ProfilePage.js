import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Avatar,
  Typography,
  Card,
  CardContent,
  Chip,
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
import { getUserById } from '../services/userService';
import { getAdvertisements } from '../services/advertisementsService';
import AdvertisementCard from '../components/AdvertisementCard';
import EditProfileForm from '../components/EditProfileForm';
import { updateMainUser } from '../services/userService';
import { useNavigate } from 'react-router-dom';

const ProfilePage = ({ mainUser, getMainUserAgain }) => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [isFavorited, setIsFavorited] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [userAdvertisements, setUserAdvertisements] = useState([]);
  const [userType, setUserType] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const navigate = useNavigate();

  // --- GET USER INFORMATION ---
  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (mainUser && userId === mainUser.id) {
          setUser(mainUser);
        } else {
          fetchUserById();
        }
      } catch (error) {
        console.error('Error fetching main user data:', error);
      }
    };
    const fetchUserById = async () => {
      try {
        const user = await getUserById(userId);
        setUser(user);
      } catch (error) {
        console.error('Error al obtener todos los usuarios:', error);
      }
    };
    fetchUser();
  }, [userId, mainUser]);

  // --- GET ADVERTISEMENTS OF USER ---
  useEffect(() => {
    if (user) {
      const fetchAdvertisements = async () => {
        const allAdvertisements = await getAdvertisements();
        const userAdvertisements = allAdvertisements.filter(adv => adv.userId === userId);
        setUserAdvertisements(userAdvertisements);
      };
      fetchAdvertisements();
      setUserType(user.userType)
    }
  }, [user, userId]);

  // -- HANDLE FAVORITE BUTTON---
  const handleFavoriteToggle = () => setIsFavorited(!isFavorited);
  
  // -- HANDLE GALLERY DIALOG---
  const handleDialogOpen = (index) => {
    setCurrentImageIndex(index);
    setModalOpen(true);
  };
  const handleDialogClose = () => setModalOpen(false);
  const handleNextImage = () => setCurrentImageIndex((currentImageIndex + 1) % user.photos.length);
  const handlePreviousImage = () => setCurrentImageIndex((currentImageIndex + user.photos.length - 1) % user.photos.length);

  // -- HANDLE LINK ICON ---
  const getLinkIcon = (url) => {
    if (url.includes('youtube.com')) return <YouTubeIcon color="primary" />;
    if (url.includes('instagram.com')) return <InstagramIcon color="primary" />;
    if (url.includes('twitter.com')) return <TwitterIcon color="primary" />;
    return <LanguageIcon />;
  };

  // -- HANDLE CHAT BUTTON ---
  const handleChatClick = (e) => {
    e.stopPropagation(); // Evita que se dispare el evento de clic en la tarjeta
    navigate('/chats', { state: { selectedChatId: user.id } }); // Navega a la página de chats con el ID del usuario
  };

  // -- EDIT BUTTON ---
  const handleEditModalClose = () => setEditModalOpen(false);

  const handleEditSave = async (updatedUser) => {
    try {
      const response = await updateMainUser(updatedUser); // Envia el PUT al backend
      //getMainUserAgain(response.user)
      console.log('response', response)
      setUser(updatedUser); // Actualiza el estado del usuario
      getMainUserAgain(true);
      setEditModalOpen(false); // Cierra el modal de edición
    } catch (error) {
      console.error('Error al guardar los cambios:', error);
    }
  };

  // --- LOADIN USER ---
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
            {/* PROFILE PICTURE */}
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
            {/* NICKNAME & USER TYPE */}
            <Box sx={{ display: 'inline-block', textAlign: 'center', position: 'relative', top: '80px'}}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 'bold',
                  display: 'inline-block',
                }}
              >
                {user.nickname}
              </Typography>
              {/* USER TYPE */}
              <Chip
                label={userType}
                variant="filled"
                size="medium"
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '100%', // Placing the chip directly after the nickname
                  transform: 'translateY(-50%)', // Align vertically with the nickname
                  marginLeft: 1, // Add some space between the nickname and the chip
                  padding: '0px 9px',
                  height: '22px',
                  borderColor: '#1e88e5',
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  color: '#1e88e5',
                  backgroundColor: 'white',
                }}
              />
            </Box>
            {/* REAL NAME */}
            <Typography color="textSecondary" variant="subtitle1" sx={{position: 'relative', top: '85px'}}>
              {user.name}
            </Typography>
            {/* FAVORITE & MESSAGE BUTTONS */}
            { user !== mainUser && (
              <Box display="flex" flexDirection="column" alignItems="center" mt={11}>
                <IconButton color={isFavorited ? 'secondary' : 'default'} onClick={handleFavoriteToggle}>
                  <FavoriteIcon fontSize="large" />
                </IconButton>
                <Button
                  aria-label="send message"
                  variant="contained"
                  color="primary"
                  startIcon={<MessageIcon />}
                  sx={{ mt: 4 }}
                  onClick={handleChatClick}
                >
                  Message
                </Button>
              </Box>
            )}
          </Box>
          {userId === mainUser.id && (
            <Button
              variant="outlined"
              color="primary"
              onClick={() => setEditModalOpen(true)}
              sx={{ marginTop: 2 }}
            >
              Edit Profile
            </Button>
          )}
          {/* PERSONAL INFORMATION */}
          <Box sx={{ position: 'relative', textAlign: 'left', width: '49%', float: 'right' }}>
            <Card sx={{ padding: 3, marginTop: 0.2 }}>
              <CardContent>
                <>
                  {user?.userType === 'Musician' && user.musicianInfo?.instruments && (
                    <>
                      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Instruments</Typography>
                      <Typography sx={{ mb: 1.5 }}>
                        <MusicNoteIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 1 }} />
                        {user.musicianInfo.instruments.join(', ')}
                      </Typography>
                    </>
                  )}
                  {user?.userType === 'Group' && user.groupInfo?.groupType && (
                    <>
                      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Group Type</Typography>
                      <Typography sx={{ mb: 1.5 }}>
                        <MusicNoteIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 1 }} />
                        {user.groupInfo.groupType.join(', ')}
                      </Typography>
                    </>
                  )}
                  {user?.userType === 'Service' && user.serviceInfo?.serviceType && (
                    <>
                      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Activities</Typography>
                      <Typography sx={{ mb: 1.5 }}>
                        <MusicNoteIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 1 }} />
                        {user.serviceInfo.serviceType.join(', ')}
                      </Typography>
                    </>
                  )}
                  {/* MUSIC STYLES, LANGUAGES, LOCATION */}
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Music Styles</Typography>
                  <Typography sx={{ mb: 1.5 }}>
                    <MusicNoteIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 1 }} />
                    {user.musicStyles.join(', ')}
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Languages</Typography>
                  <Typography sx={{ mb: 1.5 }}>
                    <PublicIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 1 }} />
                    {user.languages.join(', ')}
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Location</Typography>
                  <Typography sx={{ mb: 1.5 }}>
                    <PlaceIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 1 }} />
                    {user.location}
                  </Typography>
                  {/* DESCRIPTION */}
                  <Divider sx={{ my: 3 }} />
                  <Typography variant="body1" sx={{ textAlign: 'justify' }}>{user.description}</Typography>

                  {/* SOCIAL LINKS */}
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 2 }}>Social Links</Typography>
                  <Grid container spacing={1} direction="column" justifyContent="flex-start" mt={1}>
                    {user.links.map((link, index) => (
                      <Grid item key={index}>
                        <Box display="flex" alignItems="center" mb={-1}>
                          <IconButton
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            color="primary"
                            sx={{ mr: 0.5 }}
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
                </>
              </CardContent>
            </Card>
          </Box>
        </Grid>
      </Grid>

      {/* GALLERY */}
      <Box
        sx={{
          marginTop: 4,
          width: userAdvertisements.length === 0 ? '100%' : '50%', // Occupies all Width if no advertisements
          margin: 'auto',
          padding: 1.2,
          float: userAdvertisements.length === 0 ? 'none' : 'right',
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>Gallery</Typography>
        <ImageList cols={userAdvertisements.length === 0 ? 5 : 4} gap={8}>
          {user.photos.map((photo, index) => (
            <ImageListItem
              key={index}
              onClick={() => handleDialogOpen(index)}
              sx={{
                cursor: 'pointer',
                position: 'relative',
                overflow: 'visible',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.01)',
                  zIndex: 1,
                },
              }}
            >
              <img
                src={photo}
                alt={`Photo ${index + 1}`}
                style={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                  boxShadow: '0px 2px 10px rgba(0,0,0,0.1)',
                  transition: 'transform 0.3s ease',
                }}
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>

      {/* ADVERTISEMENTS */}
      {userAdvertisements.length > 0 && (
        <Box sx={{ marginTop: 4, width: '50%', margin: 'auto', padding: 1.2, float: 'left' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>Advertisements</Typography>
          <Grid container spacing={2}>
            {userAdvertisements.map((advertisement) => (
              <Grid item xs={12} key={advertisement.id}>
                <AdvertisementCard ad={advertisement} mainUser={mainUser} />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

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
      
      {/* EDIT MODAL */}
      <Dialog open={editModalOpen} onClose={handleEditModalClose} maxWidth="md" fullWidth>
        <DialogContent>
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            Edit Profile
          </Typography>
          <EditProfileForm
            user={mainUser}
            onClose={handleEditModalClose}
            onSave={handleEditSave}
          />
        </DialogContent>
      </Dialog>

    </Box>
  );
};

export default ProfilePage;
