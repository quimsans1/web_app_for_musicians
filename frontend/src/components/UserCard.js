import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Avatar, Card, CardContent, Box, IconButton } from '@mui/material';
import MessageIcon from '@mui/icons-material/Message';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MusicNoteIcon from '@mui/icons-material/MusicNote';  // Nota musical
import PlaceIcon from '@mui/icons-material/Place';
import LanguageIcon from '@mui/icons-material/Language';  // Mundo
import GuitarIcon from '@mui/icons-material/MusicNote';  // Sustitución de guitarra por música (icono alternativo)
import PublicIcon from '@mui/icons-material/Public';

const UserCard = ({ user }) => {
  const navigate = useNavigate();

  const handleChatClick = (e) => {
    e.stopPropagation(); // Evita que se dispare el evento de clic en la tarjeta
    navigate('/chats', { state: { selectedChatId: user.id } }); // Navega a la página de chats con el ID del usuario
  };

  return (
    <Card
      onClick={() => navigate(`/profile/${user.id}`)}
      sx={{
        position: 'relative',
        overflow: 'hidden',
        transition: 'transform 0.2s, box-shadow 0.2s',
        width: '100%',
        height: '200px',
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)',
          '&::after': {
            opacity: 0.4,
          },
          '.icon': {
            color: 'black',
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
          backgroundImage: `url(${user.backgroundImage})`,
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
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {user.nickname}
            </Typography>
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
                    transform: 'scale(1.1)',
                  },
                }}
              />
              <Typography
                className="location-text"
                color="textSecondary"
                sx={{ transition: 'color 0.2s ease-in-out' }}
              >
                {user.location}
              </Typography>
            </div>
          </div>
        </div>

        {/* MUSIC STYLES, INSTRUMENTS & LANGUAGES */}
        <div style={{ marginTop: 10 }}>
          <div            
            style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}
          >
            <MusicNoteIcon
              className="icon"
              sx={{
                fontSize: '19px',
                marginRight: '4px',
                color: 'gray',
                transition: 'color 0.2s ease-in-out, transform 0.2s ease-in-out', // Añadir transición
              }}
            />
            <Typography>{user.musicStyles.join(', ')}</Typography>
          </div>
          <div
            style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}
          >
            <MusicNoteIcon
              className="icon"
              sx={{
                fontSize: '19px',
                marginRight: '4px',
                color: 'gray',
                transition: 'color 0.2s ease-in-out, transform 0.2s ease-in-out', // Añadir transición
              }}
            />
            <Typography>{user.instrument.join(', ')}</Typography>
          </div>
          <div
            style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}
          >
            <PublicIcon
              className="icon"
              sx={{
                fontSize: '19px',
                marginRight: '4px',
                color: 'gray',
                transition: 'color 0.2s ease-in-out, transform 0.2s ease-in-out',
              }}
            />
            <Typography>{user.languages.join(', ')}</Typography>
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
              cursor: 'pointer',
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
            onClick={(e) => e.stopPropagation()} // Evita navegación al hacer clic en favorito
            className="icon"
            sx={{
              color: 'gray',
              transition: 'color 0.2s ease-in-out, transform 0.2s ease-in-out',
              cursor: 'pointer',
              '&:hover': {
                transform: 'scale(1.2)',
                color: 'blue !important',
              },
            }}
          >
            <FavoriteBorderIcon />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
};

export default UserCard;
