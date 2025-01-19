import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Grid,
  Modal,
  Box,
  Avatar,
  IconButton,
} from '@mui/material';
import MessageIcon from '@mui/icons-material/Message';
import { getUserById } from '../services/userService';
import { deleteAdvertisementById } from '../services/advertisementsService';
import { useNavigate, useLocation } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';

const AdvertisementsCard = ({ ad, mainUser, fetchAdvertisements, handleDeleteAlert }) => {
  const { userId, title, description, location, image, type } = ad;
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const locationURL = useLocation();
  // --- ADJUST AD WIDTH ---
  const isProfilePage = locationURL.pathname.includes('profile');
  const gridSize = isProfilePage ? 12 : 4;

  // --- GET USER DATA ---
  useEffect(() => {
    if (userId === mainUser.id) {
      setUser(mainUser);
    } else {
      const fetchUser = async () => {
        try {
          const userData = await getUserById(userId);
          setUser(userData);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
      fetchUser();
    }
  }, [userId, mainUser]);

  // --- MODAL VIEW ---
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  // --- CHAT CLICK ---
  const handleChatClick = (e) => {
    e.stopPropagation();
    navigate('/chats', { state: { selectedChatId: userId } }); // Navigate to chat page by the user ID
  };

  const handleDeleteClick = async (e, id) => {
    e.stopPropagation();
    // eslint-disable-next-line
    const response = await deleteAdvertisementById(id);
    handleCloseModal();
    fetchAdvertisements();
    handleDeleteAlert();
  };  

  return (
    <>
      <Grid item xs={12} md={12} lg={gridSize}>
        {/* ADVERTISEMENT CARD */}
        <Card
          onClick={handleOpenModal}
          sx={{
            display: 'flex',
            height: '150px',
            transition: 'transform 0.2s, box-shadow 0.2s',
            '&:hover': {
              transform: 'scale(1.02)',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
              cursor: 'pointer',
            },
            padding: 0,
            borderRadius: 2,
            position: 'relative',
          }}
        >
          <img
            src={image}
            alt={title}
            style={{
              width: '150px',
              height: '150px',
              objectFit: 'cover',
              marginRight: '8px',
              flexShrink: 0,
            }}
          />
          <CardContent
            sx={{
              flex: 1,
              padding: '8px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <Typography variant="h6" component="div" sx={{ marginBottom: '4px' }}>
                {title}
              </Typography>
              <Typography color="textSecondary" sx={{ marginBottom: '4px' }}>
                {location}
              </Typography>
            </div>

            {user && !isProfilePage && (
              <div
                style={{
                  position: 'absolute',
                  top: '110px',
                  left: '165px',
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                  transition: 'transform 0.3s ease-in-out',
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/profile/${user.id}`); // Navigate to user profile page
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    transition: 'transform 0.3s ease-in-out, color 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'scale(1.2)',
                    },
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.2)';
                    e.currentTarget.style.color = 'blue';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.color = '';
                  }}
                >
                  <Avatar
                    src={user.profilePicture}
                    alt={user.nickname}
                    sx={{
                      width: 30,
                      height: 30,
                      transition: 'transform 0.3s ease-in-out',
                    }}
                  />
                  <Typography
                    variant="subtitle2"
                    color="textSecondary"
                    sx={{
                      transition: 'color 0.3s ease-in-out',
                    }}
                  >
                    {user.nickname}
                  </Typography>
                </div>
              </div>
            )}

            <div style={{ position: 'absolute', bottom: '12px', right: '10px' }}>
              <Chip
                label={type}
                variant="filled"
                size="medium"
                sx={{
                  padding: '0px 9px',
                  height: '22px',
                  borderColor: type === 'Offer' ? '#1e88e5' : '#8e24aa',
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  color: type === 'Offer' ? '#1e88e5' : '#8e24aa',
                  backgroundColor: 'white',
                }}
              />
            </div>
          </CardContent>
        </Card>
      </Grid>

      {/* MODAL - ADVERTISEMENT VIEWER */}
      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="advertisement-details-title"
        aria-describedby="advertisement-details-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            width: 500,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '8px',
              marginTop: '10px',
              marginBottom: '10px'
            }}
          >
            <Typography
              id="advertisement-details-title"
              variant="h6"
              component="h2"
              gutterBottom
            >
              {title}
            </Typography>
            <Chip
              label={type}
              variant="filled"
              size="medium"
              sx={{
                padding: '0px 9px',
                height: '22px',
                borderColor: type === 'Offer' ? '#1e88e5' : '#8e24aa',
                borderWidth: '1px',
                borderStyle: 'solid',
                color: type === 'Offer' ? '#1e88e5' : '#8e24aa',
                backgroundColor: 'white',
              }}
            />
          </div>
          <img
            src={image}
            alt={title}
            style={{
              width: '100%',
              height: '200px',
              objectFit: 'cover',
              borderRadius: '8px',
              marginBottom: '16px',
            }}
          />
          <Typography
            id="advertisement-details-description"
            variant="body1"
            gutterBottom
            sx={{ textAlign: 'justify', marginBottom: '10px' }}
          >
            {description}
          </Typography>
          <Typography color="textSecondary" variant="body2" gutterBottom>
            <strong>Location:</strong> {location}
          </Typography>
          <Typography color="textSecondary" variant="body2" gutterBottom>
            <strong>Type:</strong> {type}
          </Typography>
          {user && (
            <Typography color="textSecondary" variant="body2">
              <strong>Posted by:</strong> {user.nickname}
            </Typography>
          )}

          {/* DELETE ICON */}
          {userId === mainUser.id && (
            <IconButton
              onClick={(e) => handleDeleteClick(e, ad.id)}
              sx={{
                position: 'absolute',
                top: '8px',
                right: '8px',
                backgroundColor: 'rgba(255, 0, 0, 0)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: 'rgba(255, 0, 0, 0.2)',
                  transform: 'scale(1.1)',
                  color: '#e53935',
                },
                color: 'gray',
              }}
            >
              <DeleteIcon />
            </IconButton>
          )}

          {/* MESSAGE ICON */}
          {userId !== mainUser.id && (
            <Box
              sx={{
                position: 'absolute',
                bottom: 20,
                right: 20,
                display: 'flex',
                gap: 1,
              }}
            >
              <IconButton
                aria-label="send message"
                size="small"
                onClick={handleChatClick}
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
            </Box>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default AdvertisementsCard;
