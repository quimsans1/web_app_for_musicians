import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Avatar, Card, CardContent, Chip, Box, IconButton, Snackbar, Alert } from '@mui/material';
import MessageIcon from '@mui/icons-material/Message';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MusicNoteIcon from '@mui/icons-material/MusicNote'; // Nota musical
import PlaceIcon from '@mui/icons-material/Place';
import PublicIcon from '@mui/icons-material/Public';
import { addUserToFavorites, deleteUserFromFavorites } from '../services/favoritesService';

const UserCard = ({ user, onFavorited, onUnFavorited, favorites }) => {
  const checkIncludedInFavorites = (id) => {
    const isIncluded = favorites.includes(id)
    return isIncluded;
  };

  const navigate = useNavigate();
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    setIsFavorited(favorites.includes(user.id));
  }, [favorites, user.id]);

  const handleChatClick = (e) => {
    e.stopPropagation(); // Evita que se dispare el evento de clic en la tarjeta
    navigate('/chats', { state: { selectedChatId: user.id } }); // Navega a la página de chats con el ID del usuario
  };

  const handleFavoriteClick = async (e) => {
    e.stopPropagation();
    const isIncludedInFavorites = checkIncludedInFavorites(user.id)
    if (isFavorited) {
      if (isIncludedInFavorites) {
        await deleteUserFromFavorites(user.id);        
        setIsFavorited(false);
        onUnFavorited(`${user.nickname} removed from your favorites!`);
      }      
    } else {
      try {        
        if (!isIncludedInFavorites) {
          await addUserToFavorites(user.id);
          //setIsFavorited(true);
          onFavorited(`${user.nickname} added to your favorites.`);
        }
      } catch ( error) {
        alert('Failed to add user to favorites. Please try again.');
      }
    }
  };

  return (
    <>
      <Card
        onClick={() => navigate(`/profile/${user.id}`)}
        sx={{
          position: 'relative',
          overflow: 'hidden',
          transition: 'transform 0.2s, box-shadow 0.2s',
          width: '100%',
          height: '200px',
          '&:hover': {
            cursor: 'pointer',
            transform: 'scale(1.05)',
            boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)',
            '&::after': {
              opacity: 0.4,
            },
            '.icon': {
              color: 'black',
            },
            '.favorite-icon': {
              color: isFavorited ? 'red' : 'black',
            },
            '.location-text': {
              color: 'black',
            },
          },
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '80px',
            height: '80px',
            backgroundColor: '#1E88E5',
            clipPath: 'polygon(0 0, 100% 0, 0 100%)',
            zIndex: 1,
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: `url(${user.backgroundImage || 'defaultImage.jpg'})`, // Imagen predeterminada si no existe
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0,
            transition: 'opacity 0.3s ease-in-out',
            zIndex: 0,
          },
        }}
      >
        <CardContent
          sx={{
            position: 'relative',
            zIndex: 2,
          }}
        >
          {/* PROFILE PICTURE, NICKNAME & LOCATION */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Avatar
              src={user.profilePicture}
              alt={user.nickname}
              style={{ width: 80, height: 80, marginRight: 20 }}
            />
            <div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Typography
                  variant="h6"
                  className="nickname"
                  sx={{ fontWeight: 600 }}
                >
                  {user.nickname}
                </Typography>
                <Chip
                  label={user.userType}
                  variant="outlined"
                  size="small"
                  sx={{
                    marginLeft: '8px',
                    padding: '0px 8px',
                    height: '24px',
                    borderColor: '#1e88e5',
                    color: '#1e88e5',
                    backgroundColor: 'transparent',
                    fontSize: '12px',
                    fontWeight: 'bold',
                  }}
                />
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <PlaceIcon
                  className="icon"
                  sx={{
                    fontSize: '19px',
                    marginRight: '4px',
                    color: 'gray',
                    transition: 'color 0.2s ease-in-out, transform 0.2s ease-in-out',
                    '&:hover': {
                      color: 'blue',
                    },
                  }}
                />
                <Typography
                  className="location-text"
                  color="textSecondary"
                  sx={{ transition: 'color 0.2s ease-in-out' }}
                >
                  {user.location || 'No location'}
                </Typography>
              </div>
            </div>
          </div>

          {/* USER INFORMATION */}
          <div style={{ marginTop: 10 }}>
            {/* Mostrar música estilos */}
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
              <MusicNoteIcon
                className="icon"
                sx={{
                  fontSize: '19px',
                  marginRight: '4px',
                  color: 'gray',
                  transition: 'color 0.2s ease-in-out, transform 0.2s ease-in-out', // Añadir transición
                }}
              />
              <Typography>
                {user.musicStyles && user.musicStyles.length > 0
                  ? user.musicStyles.join(', ')
                  : 'No music styles'}
              </Typography>
            </div>

            {/* Music Info (Conditional Rendering) */}
            <div>
              {user.userType === 'Musician' ? (
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
                  <MusicNoteIcon
                    className="icon"
                    sx={{
                      fontSize: '19px',
                      marginRight: '4px',
                      color: 'gray',
                      transition: 'color 0.2s ease-in-out, transform 0.2s ease-in-out',
                    }}
                  />
                  <Typography>
                    {user.musicianInfo.instruments?.length > 0
                      ? user.musicianInfo.instruments.join(', ')
                      : 'No instruments'}
                  </Typography>
                </div>
              ) : user.userType === 'Group' ? (
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
                  <MusicNoteIcon
                    className="icon"
                    sx={{
                      fontSize: '19px',
                      marginRight: '4px',
                      color: 'gray',
                      transition: 'color 0.2s ease-in-out, transform 0.2s ease-in-out',
                    }}
                  />
                  <Typography>
                    {user.groupInfo.groupType?.length > 0
                      ? user.groupInfo.groupType.join(', ')
                      : 'No group type'}
                  </Typography>
                </div>
              ) : user.userType === 'Service' ? (
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
                  <MusicNoteIcon
                    className="icon"
                    sx={{
                      fontSize: '19px',
                      marginRight: '4px',
                      color: 'gray',
                      transition: 'color 0.2s ease-in-out, transform 0.2s ease-in-out',
                    }}
                  />
                  <Typography>
                    {user.serviceInfo.serviceType?.length > 0
                      ? user.serviceInfo.serviceType.join(', ')
                      : 'No group type'}
                  </Typography>
                </div>
              ) : null}
            </div>

            {/* Mostrar idiomas */}
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
              <PublicIcon
                className="icon"
                sx={{
                  fontSize: '19px',
                  marginRight: '4px',
                  color: 'gray',
                  transition: 'color 0.2s ease-in-out, transform 0.2s ease-in-out',
                }}
              />
              <Typography>
                {user.languages && user.languages.length > 0
                  ? user.languages.join(', ')
                  : 'No languages'}
              </Typography>
            </div>
          </div>

          {/* CHAT MESSAGE & FAVORITE BUTTONS */}
          <Box
            sx={{
              position: 'absolute',
              bottom: 20,
              right: 8,
              display: 'flex',
              gap: 1,
              zIndex: 3,
            }}
          >
            <IconButton
              aria-label="send message"
              size="small"
              onClick={handleChatClick} // Navega a la página de chats
              className="icon"
              sx={{
                color: 'gray',
                transition: 'color 0.2s ease-in-out, transform 0.2s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.2)',
                  color: 'blue !important',
                },
              }}
            >
              <MessageIcon />
            </IconButton>
            <IconButton
              aria-label="favorite"
              size="small"
              onClick={handleFavoriteClick}
              className="favorite-icon"
              sx={{
                color: isFavorited ? 'red' : 'gray',
                transition: 'color 0.2s ease-in-out, transform 0.2s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.2)',
                },
              }}
            >
              {isFavorited ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default UserCard;
