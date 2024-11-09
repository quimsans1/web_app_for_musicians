import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Chip, Grid, Avatar } from '@mui/material';
import { getUserById } from '../services/userService';
import { useNavigate } from 'react-router-dom';

const AdvertisementsCard = ({ ad }) => {
  const navigate = useNavigate();
  const { id, userId, title, location, image, type } = ad;
  const [user, setUser] = useState(null);

  // Determine grid size based on the path
  const isProfilePage = window.location.pathname.includes("profile");
  const gridSizes = isProfilePage 
    ? { xs: 12, md: 12, lg: 12 }  // Full width on profile pages
    : { xs: 12, md: 6, lg: 4 };   // Responsive widths otherwise

  // Get User by ID
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUserById(userId);
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUser();
  }, [userId]);

  return (
    <Grid item xs={gridSizes.xs} md={gridSizes.md} lg={gridSizes.lg} key={id}>
      {/* ADVERTISEMENT IMAGE */}
      <Card
        sx={{
          display: 'flex',
          height: '150px',
          transition: 'transform 0.2s',
          '&:hover': { transform: 'scale(1.02)' },
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
        <CardContent sx={{ flex: 1, padding: '8px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <Typography variant="h6" component="div" sx={{ marginBottom: '4px' }}>
              {title}
            </Typography>
            <Typography color="textSecondary" sx={{ marginBottom: '4px' }}>
              {location}
            </Typography>
          </div>

          {/* USER IMAGE AND NICKNAME (conditionally rendered based on path) */}
          {!isProfilePage && user && (
            <div
              style={{
                position: 'absolute',
                top: '110px',
                left: '165px',
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '0.8';
                e.currentTarget.style.transform = 'scale(1.04)';
                e.currentTarget.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '1';
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
              }}
            >
              <Avatar
                onClick={() => navigate(`/profile/${user.id}`)}
                src={user.profilePicture}
                alt={user.nickname}
                sx={{ width: 30, height: 30, marginRight: '8px' }}
                style={{
                  cursor: 'pointer',
                  transition: 'transform 0.3s ease',
                }}
              />
              <Typography
                onClick={() => navigate(`/profile/${user.id}`)}
                variant="subtitle2"
                color="textSecondary"
                style={{
                  cursor: 'pointer',
                  transition: 'color 0.3s ease',
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#1e88e5'}
                onMouseLeave={(e) => e.currentTarget.style.color = ''}
              >
                {user.nickname}
              </Typography>
            </div>
          )}

          {/* OFFER OR EVENT */}
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
  );
};

export default AdvertisementsCard;
