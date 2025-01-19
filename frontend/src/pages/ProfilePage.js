import React, { useState, useEffect, useCallback } from 'react';
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
  Snackbar,
  Alert,
  CircularProgress,
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
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import { getUserById } from '../services/userService';
import { getUsers } from '../services/userService';
import { getAdvertisements } from '../services/advertisementsService';
import { getFavorites } from '../services/favoritesService';
import AdvertisementCard from '../components/AdvertisementCard';
import EditProfileForm from '../components/EditProfileForm';
import { updateMainUser } from '../services/userService';
import { useNavigate } from 'react-router-dom';
import UserCard from '../components/UserCard';
import { addUserToFavorites, deleteUserFromFavorites } from '../services/favoritesService';

const ProfilePage = ({ mainUser, getMainUserAgain }) => {
  const { userId } = useParams();
  const [user, setUser] = useState({});
  const [isFavorited, setIsFavorited] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [userAdvertisements, setUserAdvertisements] = useState([]);
  const [userPhotos, setUserPhotos] = useState([]);
  const [userType, setUserType] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [favoritesModalOpen, setFavoritesModalOpen] = useState(false);
  const [favoritedUsers, setFavoritedUsers] = useState(false);
  const [isMainUser, setIsMainUser] = useState(false);

  const navigate = useNavigate();

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");

  const fetchFavorites = async () => {
    const data = await getFavorites();
    setFavorites(data);
  };

  // --- GET USER INFORMATION ---
  useEffect(() => {
    if (userId && mainUser) {
      const fetchUser = async () => {
        try {
          if (mainUser && userId === mainUser.id) {
            setUser(mainUser);          
            fetchFavorites();
            setIsMainUser(true)
            setUserType(mainUser.userType)
          } else {
            fetchUserById();
            setIsMainUser(false)
            setFavoritesModalOpen(false)
            fetchFavorites();
          }
        } catch (error) {
          console.error('Error fetching main user data:', error);
        }
      };
      const fetchUserById = async () => {
        try {
          const user = await getUserById(userId);
          setUser(user);
          setUserType(user.userType)
        } catch (error) {
          console.error('Error obtaining all users:', error);
        }
      };
      fetchUser();
    }
  }, [userId, mainUser]);

  // -- HANDLE FAVORITE BUTTON ---
  const handleFavoriteToggle = async (id) => {
    try {  
      if (isFavorited) {
        await deleteUserFromFavorites(id);
        fetchFavorites();
        // Alert Success Delete
        setAlertMessage(`${user.nickname} removed from your favorites!`);
        setAlertSeverity("success");
        setAlertOpen(true);
      } else {
        await addUserToFavorites(id);
        fetchFavorites();
        // Alert Success Add
        setAlertMessage(`${user.nickname} added to your favorites!`);
        setAlertSeverity("success");
        setAlertOpen(true);
      }
    } catch (error) {
      console.error('Error toggling favorite button:', error);
    }
  };

  // --- GET FAVORITED USERS & CHECK IF USER IS FAVORITED ---
  useEffect(() => {
    const getFavoritedUsers = async () => {
      try {
        const allUsers = await getUsers();
        const filteredByFavorites = allUsers.filter(user => favorites.includes(user.id));
        setFavoritedUsers(filteredByFavorites);
      } catch (error) {
        console.error('Error obtaining all the users:', error);
      }
    };
    getFavoritedUsers();

    // Check if the User is Favorited
    if (favorites.includes(userId)) {
      setIsFavorited(true)
    } else {
      setIsFavorited(false)
    }
  }, [favorites, userId]);

  // --- GET ADVERTISEMENTS OF USER ---
  const fetchAdvertisements = useCallback(async () => {
    const allAdvertisements = await getAdvertisements();
    const userAdvertisements = allAdvertisements.filter(adv => adv.userId === userId);
    setUserAdvertisements(userAdvertisements);
  }, [userId]);

  useEffect(() => {
    if (user && Object.keys(user).length > 0) {
      fetchAdvertisements();
    }
  }, [user, fetchAdvertisements]);

  // --- GET GALLERY IMAGES ---
  useEffect(() => {
    if (user?.photos?.length > 0) {
      setUserPhotos(user.photos)
    }
  }, [user]);

  // -- HANDLE GALLERY MODAL ---
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
    e.stopPropagation();
    navigate('/chats', { state: { selectedChatId: user.id } }); // Navigate to chat page by ID
  };

  // -- EDIT BUTTON ---
  const handleEditModalClose = () => setEditModalOpen(false);

  const handleEditSave = async (updatedUser) => {
    const areUsersEqual = JSON.stringify(updatedUser) === JSON.stringify(mainUser);
    try {
      if (!areUsersEqual) {
        // eslint-disable-next-line no-unused-vars
        const response = await updateMainUser(updatedUser);
        if (JSON.stringify(response.user) === JSON.stringify(updatedUser)) {
          setUser(updatedUser);
          getMainUserAgain(true);
          setEditModalOpen(false);
        
          // Set the success alert message
          setAlertMessage("Profile updated successfully!");
          setAlertSeverity("success");
          setAlertOpen(true);
        } else {
          console.error('Update of profile failed', response);
        }
      } else {
        setAlertMessage("No changes were made.");
        setAlertSeverity("error");
        setAlertOpen(true);
      }
    } catch (error) {
      console.error('Error al guardar los cambios:', error);
      
      // Set the error alert message
      setAlertMessage("Failed to update profile!");
      setAlertSeverity("error");
      setAlertOpen(true);
    }
  };

  // --- ALERTS: FAVORITED ---
  const handleFavoritedAlert = (message) => {
    fetchFavorites();
    setAlertMessage(message);
    setAlertSeverity('success');
    setAlertOpen(true);
  };

  const handleUnFavoritedAlert = (message) => {
    fetchFavorites();
    setAlertMessage(message);
    setAlertSeverity('success');
    setAlertOpen(true);
  };

  // ALERT: DELETED ADVERTISEMENT
  const handleDeleteAlert = () => {
    setAlertMessage('Advertisement successfully deleted');
    setAlertSeverity('success');
    setAlertOpen(true);
  };

  // --- LOADING USER ---
  if (
    !user ||
    (Object.keys(user).length === 0)
    )
  {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          backgroundColor: '#f5f5f5',
        }}
      >
        <CircularProgress
          size={60}
          thickness={5}
          sx={{ color: '#1e88e5', marginBottom: 2 }}
        />
        <Typography variant="h6" color="textSecondary">
          Loading user...
        </Typography>
      </Box>
    );
  }

  return (
    Object.keys(user).length > 0 && (
      <Box sx={{ backgroundColor: 'white', padding: 1 }}>
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
                  width: 150,
                  height: 150,
                  border: '3px solid white',
                  position: 'absolute',
                  top: '160px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
                }}
              />            
              {/* NICKNAME & USER TYPE */}
              <Box sx={{ display: 'inline-block', textAlign: 'center', position: 'relative', top: '115px'}}>
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
                    left: '100%',
                    transform: 'translateY(-50%)',
                    marginLeft: 1,
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
              <Typography color="textSecondary" variant="subtitle1" sx={{position: 'relative', top: '120px'}}>
                {user.name}
              </Typography>
              {/* FAVORITE & MESSAGE BUTTONS */}
              { user !== mainUser && (
                <Box display="flex" flexDirection="column" alignItems="center" mt={15}>
                  <IconButton color={isFavorited ? 'error' : '#e53935'} onClick={() => handleFavoriteToggle(userId)}>
                    <FavoriteIcon fontSize="large" />
                  </IconButton>
                  <Button
                    aria-label="send message"
                    variant="outlined"
                    color="primary"
                    startIcon={<MessageIcon />}
                    sx={{ mt: 2 }}
                    onClick={handleChatClick}
                  >
                    Message
                  </Button>
                </Box>
              )}
              {userId === mainUser.id && (
                <>
                  <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<EditIcon />}
                    onClick={() => setEditModalOpen(true)}
                    sx={{ marginTop: 20 }}
                  >
                    Edit Profile
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<FavoriteIcon />}
                    onClick={() => setFavoritesModalOpen(true)}
                    sx={{ marginTop: 20, marginLeft: 2 }}
                  >
                    Favorites
                  </Button>
                </>
              )}
            </Box>

            {/* PERSONAL INFORMATION */}
            <Box sx={{ position: 'relative', textAlign: 'left', width: '49%', float: 'right' }}>
              <Card sx={{ padding: 3, marginTop: 0.2 }}>
                <CardContent>
                  <>
                    {/* INSTRUMENTS, GROUP OR SERVICE (Conditionally rendered by User Type) */}
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
            marginTop: 2,
            width: userAdvertisements.length === 0 ? '100%' : '50%', // Occupies all Width if no advertisements
            //margin: 'auto',
            padding: 0,
            float: userAdvertisements.length === 0 ? 'none' : 'right',
          }}
        >
          <Card sx={{ padding: 2, marginTop: 0.2 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>Gallery</Typography>
            <ImageList cols={userAdvertisements.length === 0 ? 5 : 4} gap={8}>
              {userPhotos.map((photo, index) => (
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
                    alt={`Gallery Item ${index + 1}`}
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
          </Card>
        </Box>

        {/* ADVERTISEMENTS */}
        {userAdvertisements.length > 0 && (
          <Box sx={{ marginTop: 1, width: '50%', padding: 1.2, float: 'left' }}>
            <Card sx={{ padding: 2, marginTop: 0 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>Advertisements</Typography>
              <Grid container spacing={2}>
                {userAdvertisements.map((advertisement) => (
                  <Grid item xs={12} key={advertisement.id}>
                    <AdvertisementCard ad={advertisement} mainUser={mainUser} fetchAdvertisements={fetchAdvertisements} handleDeleteAlert={handleDeleteAlert}/>
                  </Grid>
                ))}
              </Grid>
            </Card>
          </Box>
        )}

        {/* --- MODALS --- */}

        {/* IMAGE VIEWER - MODAL */}
        {modalOpen && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 1300,
            }}
            onClick={handleDialogClose}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                position: 'relative',
                textAlign: 'center',
                padding: 0,
                backgroundColor: 'transparent',
                width: '70vw',
                height: '80vh',
                overflow: 'hidden',
                borderRadius: '8px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                aspectRatio: '16/9',
              }}
            >
              {/* CLOSE ICON (X) */}
              <IconButton
                onClick={handleDialogClose}
                sx={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  color: 'white',
                  zIndex: 3,
                }}
              >
                <CloseIcon />
              </IconButton>

              {/* ARROW LEFT */}
              <IconButton
                onClick={handlePreviousImage}
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '10px',
                  transform: 'translateY(-50%)',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  color: 'white',
                  zIndex: 2,
                }}
              >
                <ArrowBackIosIcon sx={{ position: 'relative', left: '4px' }} />
              </IconButton>

              {/* IMAGE CONTAINER */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <img
                  src={user.photos[currentImageIndex]}
                  alt={`Gallery item ${currentImageIndex + 1}`}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    objectFit: 'contain',
                    display: 'block',
                  }}
                />
              </div>

              {/* ARROW RIGHT */}
              <IconButton
                onClick={handleNextImage}
                sx={{
                  position: 'absolute',
                  top: '50%',
                  right: '10px',
                  transform: 'translateY(-50%)',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  color: 'white',
                  zIndex: 2,
                }}
              >
                <ArrowForwardIosIcon sx={{ position: 'relative', left: '2px' }} />
              </IconButton>
            </div>
          </div>
        )}

        {/* EDIT PROFILE FORM - MODAL */}
        <Dialog open={editModalOpen} onClose={handleEditModalClose} maxWidth="md" fullWidth>
          <DialogContent>
            <Typography variant="h6" sx={{ marginBottom: 4, fontWeight: 'bold' }}>
              Edit Profile
            </Typography>
            <EditProfileForm
              mainUser={mainUser}
              onClose={handleEditModalClose}
              onSave={handleEditSave}
            />
          </DialogContent>
        </Dialog>
        
        {/* FAVORITES - MODAL */}
        {isMainUser && (
          <Dialog
            open={favoritesModalOpen} 
            onClose={() => setFavoritesModalOpen(false)}
            maxWidth={false}
            fullWidth={false}
            sx={{ '& .MuiDialog-paper': { width: '1500px', maxWidth: '1500px' } }}
          >
            <DialogContent>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
                Favorites
              </Typography>
              <Grid container spacing={3}>
                {favoritedUsers && favoritedUsers.length > 0 ? (
                  favoritedUsers.map(user => (
                    <Grid item xs={12} sm={12} md={6} lg={4} key={user.id}>
                      <UserCard 
                        user={user} 
                        onFavorited={handleFavoritedAlert}
                        onUnFavorited={handleUnFavoritedAlert}
                        favorites={favorites}
                      />
                    </Grid>
                  ))
                ) : (
                  <Grid item xs={12}>
                    <Box 
                      display="flex" 
                      flexDirection="column" 
                      justifyContent="center" 
                      alignItems="center" 
                      textAlign="center"
                      sx={{ marginTop: 4, marginBottom: 6 }}
                    >
                      <img
                        src="/LogoMusyncGray.svg"
                        alt="Logo"
                        style={{ width: '150px', height: 'auto', marginBottom: '20px' }}
                      />
                      <Typography variant="h6" color="textSecondary">
                        No users currently selected as favorites.
                      </Typography>
                    </Box>
                  </Grid>
                )}
              </Grid>
            </DialogContent>
          </Dialog>
        )}
        
        {/* ALERT */}
        <Snackbar
          open={alertOpen}
          autoHideDuration={6000}
          onClose={() => setAlertOpen(false)}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
        >
          <Alert
            onClose={() => setAlertOpen(false)}
            severity={alertSeverity}
            sx={{ width: '100%' }}
          >
            {alertMessage}
          </Alert>
        </Snackbar>
      </Box>
    )
  );
}
export default ProfilePage;

