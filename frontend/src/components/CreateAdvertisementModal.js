import React from 'react';
import {
  Box,
  Modal,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

const locationsList = [
  'New York, USA',
  'Los Angeles, USA',
  'Chicago, USA',
  'San Francisco, USA',
  'Miami, USA',
  'London, UK',
  'Manchester, UK',
  'Edinburgh, UK',
  'Paris, France',
  'Lyon, France',
  'Marseille, France',
  'Tokyo, Japan',
  'Osaka, Japan',
  'Kyoto, Japan',
  'Barcelona, Spain',
  'Madrid, Spain',
  'Valencia, Spain',
  'Berlin, Germany',
  'Munich, Germany',
  'Hamburg, Germany',
  'Sydney, Australia',
  'Melbourne, Australia',
  'Brisbane, Australia',
  'Toronto, Canada',
  'Vancouver, Canada',
  'Montreal, Canada',
  'Beijing, China',
  'Shanghai, China',
  'Guangzhou, China',
  'Rio de Janeiro, Brazil',
  'São Paulo, Brazil',
  'Brasília, Brazil',
  'Cape Town, South Africa',
  'Johannesburg, South Africa',
  'Durban, South Africa',
  'Moscow, Russia',
  'Saint Petersburg, Russia',
  'Kazan, Russia',
  'Mumbai, India',
  'Delhi, India',
  'Bangalore, India',
  'Seoul, South Korea',
  'Busan, South Korea',
  'Daegu, South Korea',
  'Dubai, UAE',
  'Abu Dhabi, UAE',
  'Sharjah, UAE',
  'Rome, Italy',
  'Milan, Italy',
  'Florence, Italy',
  'Mexico City, Mexico',
  'Guadalajara, Mexico',
  'Monterrey, Mexico',
  'Bangkok, Thailand',
  'Phuket, Thailand',
  'Chiang Mai, Thailand',
  'Istanbul, Turkey',
  'Ankara, Turkey',
  'Izmir, Turkey',
  'Buenos Aires, Argentina',
  'Córdoba, Argentina',
  'Rosario, Argentina',
  'Singapore, Singapore',
  'Kuala Lumpur, Malaysia',
  'Penang, Malaysia',
  'Jakarta, Indonesia',
  'Bali, Indonesia',
  'Surabaya, Indonesia',
  'Cairo, Egypt',
  'Alexandria, Egypt',
  'Giza, Egypt',
  'Athens, Greece',
  'Thessaloniki, Greece',
  'Santorini, Greece',
  'Hanoi, Vietnam',
  'Ho Chi Minh City, Vietnam',
  'Da Nang, Vietnam',
  'Lisbon, Portugal',
  'Porto, Portugal',
  'Faro, Portugal',
  'Stockholm, Sweden',
  'Gothenburg, Sweden',
  'Malmö, Sweden',
  'Oslo, Norway',
  'Bergen, Norway',
  'Stavanger, Norway',
  'Copenhagen, Denmark',
  'Aarhus, Denmark',
  'Odense, Denmark',
  'Dublin, Ireland',
  'Cork, Ireland',
  'Galway, Ireland',
  'Vienna, Austria',
  'Salzburg, Austria',
  'Innsbruck, Austria',
  'Amsterdam, Netherlands',
  'Rotterdam, Netherlands',
  'The Hague, Netherlands',
  'Brussels, Belgium',
  'Antwerp, Belgium',
  'Ghent, Belgium',
  'Warsaw, Poland',
  'Krakow, Poland',
  'Gdańsk, Poland',
  'Helsinki, Finland',
  'Espoo, Finland',
  'Tampere, Finland',
  'Zurich, Switzerland',
  'Geneva, Switzerland',
  'Bern, Switzerland',
  'Prague, Czech Republic',
  'Brno, Czech Republic',
  'Ostrava, Czech Republic'
];
const CreateAdvertisementModal = ({
  isOpen,
  onClose,
  formValues,
  onChange,
  onPublish,
}) => {
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="create-advertisement-modal"
      aria-describedby="create-advertisement-form"
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
          width: 400,
        }}
      >
        <Typography variant="h6" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
          Create Advertisement
        </Typography>
        <TextField
          label="Title"
          name="title"
          fullWidth
          margin="normal"
          value={formValues.title}
          onChange={onChange}
        />
        <TextField
          label="Description"
          name="description"
          fullWidth
          margin="normal"
          value={formValues.description}
          onChange={onChange}
        />
        <TextField
          label="Image URL"
          name="image"
          fullWidth
          margin="normal"
          value={formValues.image}
          onChange={onChange}
        />
        <TextField
          label="Link (optional)"
          name="link"
          fullWidth
          margin="normal"
          value={formValues.link}
          onChange={onChange}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Location</InputLabel>
          <Select
            label="Location"
            name="location"
            value={formValues.location}
            onChange={onChange}
          >
            {locationsList.map((location) => (
              <MenuItem key={location} value={location}>
                {location}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel>Type</InputLabel>
          <Select
            label="Type"
            name="type"
            value={formValues.type}
            onChange={onChange}
          >
            <MenuItem value="Offer">Offer</MenuItem>
            <MenuItem value="Event">Event</MenuItem>
          </Select>
        </FormControl>

        <Box sx={{ marginTop: 2, textAlign: 'right' }}>
          <Button variant="outlined" onClick={onClose} sx={{ marginRight: 1 }}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={onPublish}>
            Publish
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default CreateAdvertisementModal;
