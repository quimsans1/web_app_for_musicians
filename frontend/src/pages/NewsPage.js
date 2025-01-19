import React from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Grid
} from '@mui/material';

const NewsPage = ({ mainUser }) => {
  // Noticias ficticias
  const news = [
    {
        title: 'World Music Festival 2025 Announces Lineup',
        description: 'The highly anticipated festival has revealed its lineup of artists, including legendary names and new promises of the music industry.',
        image: 'https://www.santandersmusic.com/media/magazine/65377d6ce37aaed8664a7a94-w-1.jpg',
    },
    {
        title: 'Vintage Electric Guitars: The New Trend',
        description: 'Vintage electric guitars are gaining popularity among young musicians, with sales skyrocketing in 2025.',
        image: 'https://vintageelectric.com.au/wp-content/uploads/2021/03/1968-Epiphone-Riviera-Cherry-360-TDC.png',
    },
    {
        title: 'Revolution in the Industry: New Algorithm to Discover Talent',
        description: 'A startup has developed an algorithm that promises to revolutionize the way emerging artists are discovered on digital platforms.',
        image: 'https://outragemag.com/wp-content/uploads/2022/03/musical-career.jpg',
    },
  ];

  return (
    <Box sx={{ padding: 2 }}>
      <Grid container direction="column" spacing={2}>
        {news.map((item, index) => (
          <Grid item key={index}>
            <Card
                sx={{
                    transition: 'transform 0.3s',
                    '&:hover': {
                      transform: 'scale(1.01)',
                    },
                }}            
            >
              <CardMedia
                component="img"
                height="350"
                image={item.image}
                alt={item.title}
              />
              <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary">
                  Leer más
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default NewsPage;