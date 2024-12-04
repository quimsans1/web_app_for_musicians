import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  IconButton,
  Autocomplete,
  Avatar,
  Select,
  InputLabel,
  MenuItem,
  FormControl,
  Alert,
  Snackbar,
  Checkbox,
  ListItemText,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import imageCompression from 'browser-image-compression';

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

const allMusicStyles = [
  "Rock",
  "Jazz",
  "Classical",
  "Pop",
  "Hip Hop",
  "Blues",
  "Reggae",
  "Country",
  "Electronic",
  "Folk",
  "R&B",
  "Soul",
  "Punk",
  "Metal",
  "Indie",
  "Alternative",
  "Funk",
  "Disco",
  "Techno",
  "House",
  "Trance",
  "Dubstep",
  "Ambient",
  "Chillout",
  "Experimental",
  "World Music",
  "Latin",
  "Afrobeat",
  "Ska",
  "Swing",
  "Bluegrass",
  "Gospel",
  "Trap",
  "Dancehall",
  "Reggaeton",
  "Salsa",
  "Bossa Nova",
  "Flamenco",
  "Tango",
  "K-Pop",
  "J-Pop",
  "Celtic",
  "Opera",
  "Baroque",
  "Folk Rock",
  "Prog Rock",
  "Post-Rock",
  "Industrial",
  "New Age",
  "Classical Crossover",
  "Hard Rock",
  "Garage Rock",
  "Country Rock",
  "Grunge"
].sort();
const allLanguages = [
  "English",
  "Spanish",
  "French",
  "German",
  "Italian",
  "Portuguese",
  "Dutch",
  "Chinese",
  "Japanese",
  "Russian",
  "Arabic",
  "Korean",
  "Hindi",
  "Bengali",
  "Turkish",
  "Vietnamese",
  "Polish",
  "Swedish",
  "Greek",
  "Czech",
  "Finnish",
  "Danish",
  "Norwegian",
  "Hungarian",
  "Hebrew",
  "Thai",
  "Swahili",
  "Ukrainian",
  "Romanian",
  "Malay",
  "Indonesian",
  "Tamil",
  "Telugu",
  "Punjabi",
  "Marathi"
];
const allInstruments = [
  "Accordion",
  "Acoustic guitar",
  "Alto saxophone",
  "Anklung",
  "Bagpipes",
  "Banjo",
  "Bass",
  "Bassoon",
  "Cello",
  "Clarinet",
  "Congas",
  "Double bass",
  "Drums",
  "Electric guitar",
  "Flute",
  "French horn",
  "Glockenspiel",
  "Guitar",
  "Harmonica",
  "Harpsichord",
  "Horn",
  "Kettledrum",
  "Mandolin",
  "Marimba",
  "Oboe",
  "Organ",
  "Pan flute",
  "Piano",
  "Recorder",
  "Saxophone",
  "Singer",
  "Timpani",
  "Trombone",
  "Trumpet",
  "Tuba",
  "Ukulele",
  "Viola",
  "Violin",
  "Xylophone",
  "Zither"
].sort();
const allGroups = [
  "Band",
  "Orchestra",
  "Choir",
  "Quartet",
  "Trio",
  "Duo",
  "Ensemble",
  "Big Band",
  "Jazz Band",
  "Brass Band",
  "Chamber Orchestra",
  "Symphony Orchestra",
  "Marching Band",
  "Rock Band",
  "Cover Band",
  "String Quartet",
  "Wind Quintet"];
const allServices = [
  "Record Label",
  "Artist Management",
  "Production",
  "Music Production",
  "Sound Engineering",
  "Live Sound",
  "Music Composition",
  "Recording",
  "Mixing",
  "Mastering",
  "Songwriting",
  "Music Licensing",
  "Music Distribution",
  "Concert Promotion",
  "Event Management",
  "Music Video Production",
  "Stage Design",
  "Lighting Design",
  "Audio Post-Production",
  "Broadcasting",
  "Film Scoring"
];

const EditProfileForm = ({ mainUser, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    ...mainUser,
    links: mainUser.links,
    userType: mainUser.userType,
  });
  const [currentLink, setCurrentLink] = useState('');
  const [uploadingProfileImage, setUploadingProfileImage] = useState(false);
  const [uploadingBackgroundImage, setUploadingBackgroundImage] = useState(false);

  // Alerts of Links
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('success');
  const [alertOpen, setAlertOpen] = useState(false);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  

  // --- UPLOAD IMAGE (PROFILE OR BACKGROUND) --- 
  const handleImageUpload = async (event, imageType) => {
    const file = event.target.files[0];
    if (!file) return;

    imageType === 'profilePicture' ?
    setUploadingProfileImage(true) : setUploadingBackgroundImage(true)
    try {
      // Compression options
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1024,
        useWebWorker: true,
      };

      // Compress the image
      const compressedFile = await imageCompression(file, options);

      // Update the form data with the compressed image file
      if (imageType === 'profilePicture') {
        setFormData((prev) => ({
          ...prev,
          profilePicture: URL.createObjectURL(compressedFile),
        }));
      } else if (imageType === 'backgroundImage') {
        setFormData((prev) => ({
          ...prev,
          backgroundImage: URL.createObjectURL(compressedFile),
        }));
      }
    } catch (error) {
      console.error('Error compressing the image:', error);
    } finally {
      setUploadingProfileImage(false);
      setUploadingBackgroundImage(false);
    }
  };

  // --- LINK --- 
  const handleAddLink = () => {
    const newLink = currentLink.trim();
    if (!newLink) {
      setAlertMessage('Link cannot be empty');
      setAlertSeverity('error');
      setAlertOpen(true);
      return;
    }
    if (formData.links.some((link) => link.url === newLink)) {
      setAlertMessage('This link already exists');
      setAlertSeverity('warning');
      setAlertOpen(true);
      return;
    }
    setFormData((prev) => ({
      ...prev,
      links: [...prev.links, { url: newLink }],
    }));
    setCurrentLink('');
    setAlertMessage('Link added successfully');
    setAlertSeverity('success');
    setAlertOpen(true);
  };  

  const handleDeleteLink = (index) => {
    setFormData((prev) => ({
      ...prev,
      links: prev.links.filter((_, i) => i !== index),
    }));
  };

  // --- HANDLERS FOR MUSIC STYLES, LANGUAGES, AND NESTED FIELDS ---
  const handleAddArray = (value, type) => {
    const fieldParts = type.split('.');
    if (fieldParts.length === 2) {
      // In case it has nested fields (Example: 'musicianInfo.instruments')
      const [parentField, childField] = fieldParts;
  
      if (parentField === 'groupInfo' && childField === 'groupType') {
        const array = [value]
        setFormData((prev) => ({
          ...prev,
          [parentField]: {
            ...prev[parentField],
            [childField]: array,
          },
        }));
      } else {
        // If it's not 'groupInfo', add array normally
        const array = value
          setFormData((prev) => ({
            ...prev,
            [parentField]: {
              ...prev[parentField],
              [childField]: array,
            },
          }));
      }
    }
  };

  // --- SAVE --- 
  const handleSave = () => {
    const updatedUser = { ...formData };
    onSave(updatedUser);
  };

  return (
    <Box>
      {/* REAL NAME */}
      <Typography variant="h6" sx={{ marginBottom: 1 }}>
        Real Name
      </Typography>
      <TextField
        label="Real Name"
        value={formData.name}
        onChange={(e) => handleChange('name', e.target.value)}
        fullWidth
        sx={{ marginBottom: 1 }}
        size="small"
      />

      {/* LOCATION */}
      <Typography variant="h6" sx={{ marginBottom: 1 }}>
        Location
      </Typography>
      <Autocomplete
        options={locationsList}
        value={formData.location}
        onChange={(event, newValue) => handleChange('location', newValue)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Location"
            fullWidth
            sx={{ marginBottom: 1 }}
            size="small"
          />
        )}
      />

      {/* DESCRIPTION */}
      <Typography variant="h6" sx={{ marginBottom: 1 }}>
        Description
      </Typography>
      <TextField
        label="Description"
        value={formData.description}
        onChange={(e) => handleChange('description', e.target.value)}
        fullWidth
        sx={{ marginBottom: 2 }}
        size="small"
      />

      {/* USER TYPE */}
      <Typography variant="h6" sx={{ marginTop: 2, marginBottom: 1 }}>
        User Type
      </Typography>
      <FormControl fullWidth>
        <InputLabel id="mainUser-type-label">User Type</InputLabel>
        <Select
          labelId="mainUser-type-label"
          id="mainUser-type"
          value={formData.userType}
          onChange={(e) => handleChange('userType', e.target.value)} // Use handleChange for userType
          label="User Type"
          size="small"
        >
          <MenuItem value="Musician">Musician</MenuItem>
          <MenuItem value="Group">Group</MenuItem>
          <MenuItem value="Service">Service</MenuItem>
        </Select>
      </FormControl>

      {/* Show INSTRUMENTS if mainUser type is Musician */}
      {formData.userType === 'Musician' && (
        <>
          <Typography variant="h6" sx={{ marginTop: 1, marginBottom: 1 }}>
            Instruments
          </Typography>
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel id="instruments-select-label">Instruments</InputLabel>
          <Select
            labelId="instruments-select-label"
            id="instruments-select"
            multiple
            value={formData.musicianInfo.instruments}
            onChange={(event) => handleAddArray(event.target.value, 'musicianInfo.instruments')}
            renderValue={(selected) => selected.join(', ')}
            size="small"
          >
            {allInstruments.map((instrument) => (
              <MenuItem key={instrument} value={instrument}>
                <Checkbox checked={formData.musicianInfo.instruments.includes(instrument)} />
                <ListItemText primary={instrument} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        </>
      )}

      {/* Show GROUPS if mainUser type is Group */}
      {formData.userType === 'Group' && (
        <>
          <Typography variant="h6" sx={{ marginTop: 1, marginBottom: 1 }}>
            Group
          </Typography>
          <Box>
            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <InputLabel id="group-label">Group</InputLabel>
              <Select
                labelId="group-label"
                value={formData.groupInfo.groupType}
                onChange={(event) => handleAddArray(event.target.value, 'groupInfo.groupType')}
                size="small"
              >
                {allGroups.map((group) => (
                  <MenuItem key={group} value={group}>
                    {group}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </>
      )}

      {/* Show SERVICES if mainUser type is Service */}
      {formData.userType === 'Service' && (
        <>
          <Typography variant="h6" sx={{ marginTop: 1, marginBottom: 1 }}>
            Services
          </Typography>
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel id="services-select-label">Services</InputLabel>
          <Select
            labelId="services-select-label"
            id="services-select"
            multiple
            value={formData.serviceInfo.serviceType}
            onChange={(event) => handleAddArray(event.target.value, 'serviceInfo.serviceType', )}
            renderValue={(selected) => selected.join(', ')}
            size="small"
          >
            {allServices.map((service) => (
              <MenuItem key={service} value={service}>
                <Checkbox checked={formData.serviceInfo.serviceType.includes(service)} />
                <ListItemText primary={service} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        </>
      )}

      {/* MUSIC STYLES */}
      <Typography variant="h6" sx={{ marginTop: 2, marginBottom: 1 }}>
        Music Styles
      </Typography>
      <FormControl fullWidth sx={{ marginBottom: 0 }}>
        <InputLabel id="music-styles-select-label">Music Styles</InputLabel>
        <Select
          labelId="music-styles-select-label"
          id="music-styles-select"
          multiple
          value={formData.musicStyles}
          onChange={(event) => handleChange('musicStyles', event.target.value)}
          renderValue={(selected) => selected.join(', ')}
          size="small"
        >
          {allMusicStyles.map((style) => (
            <MenuItem key={style} value={style}>
              <Checkbox checked={formData.musicStyles.includes(style)} />
              <ListItemText primary={style} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* LANGUAGES */}
      <Typography variant="h6" sx={{ marginTop: 1, marginBottom: 1 }}>
        Languages
      </Typography>
      <FormControl fullWidth sx={{ marginBottom: 2 }}>
      <InputLabel id="languages-select-label">Languages</InputLabel>
      <Select
        labelId="languages-select-label"
        id="languages-select"
        multiple
        value={formData.languages}
        onChange={(event) => handleChange('languages', event.target.value)}
        renderValue={(selected) => selected.join(', ')}
        size="small"
      >
        {allLanguages.map((language) => (
          <MenuItem key={language} value={language}>
            <Checkbox checked={formData.languages.includes(language)} />
            <ListItemText primary={language} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>

      {/* SOCIAL LINKS */}
      <Typography variant="h6" sx={{ marginTop: 1, marginBottom: 1 }}>Social Links</Typography>
      {formData.links.map((link, index) => (
        <Box key={index} display="flex" alignItems="center" sx={{ marginBottom: 1 }}>
          <TextField value={link.url} fullWidth sx={{ marginRight: 1 }} disabled size="small"/>
          <IconButton onClick={() => handleDeleteLink(index)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      ))}

      <Box display="flex" alignItems="center">
        <TextField
          label="Enter URL for New Link"
          value={currentLink}
          onChange={(e) => setCurrentLink(e.target.value)}
          fullWidth
          placeholder="https://example.com"
          size="small"
        />
        <IconButton onClick={handleAddLink} disabled={!currentLink.trim()}>
          <AddIcon />
        </IconButton>
      </Box>

      {/* PROFILE PICTURE */}
      <Typography variant="h6" sx={{ marginTop: 3, marginBottom: 2 }}>
        Profile Picture
      </Typography>
      <Box display="flex" flexDirection="column" alignItems="center" sx={{ marginBottom: 2 }}>
        <Avatar
          src={formData.profilePicture}
          alt="Profile Preview"
          sx={{
            width: { xs: 90, md: 120 },
            height: { xs: 90, md: 120 },
            border: '2px solid white',
            marginBottom: 0,
            boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
          }}
        />
        <Button
          variant="contained"
          component="label"
          disabled={uploadingProfileImage}
          sx={{
            marginTop: '25px',
          }}
        >
          {uploadingProfileImage ? 'Processing...' : 'Upload New Picture'}
          <input type="file" hidden accept="image/*" onChange={(e) => handleImageUpload(e, 'profilePicture')} />
        </Button>
      </Box>

      {/* BACKGROUND IMAGE */}
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        Background Image
      </Typography>
      <Box display="flex" flexDirection="column" alignItems="center" sx={{ marginBottom: 2 }}>
        <img
          src={formData.backgroundImage}
          alt="Background"
          style={{
            width: '100%',
            height: '200px',
            objectFit: 'cover',
            borderRadius: '10px',
          }}
        />
        <Button
          variant="contained"
          component="label"
          disabled={uploadingBackgroundImage}
          sx={{
            marginTop: '25px',
          }}
        >
          {uploadingBackgroundImage ? 'Processing...' : 'Upload New Picture'}
          <input type="file" hidden accept="image/*" onChange={(e) => handleImageUpload(e, 'backgroundImage')} />
        </Button>
      </Box>

      {/* SAVE OR CANCEL */}
      <Button variant="contained" color="primary" onClick={handleSave} sx={{ marginTop: 3 }}>
        Save Changes
      </Button>
      <Button onClick={onClose} sx={{ marginTop: 1, marginLeft: 2 }}>
        Cancel
      </Button>

      <Snackbar
        open={alertOpen}
        autoHideDuration={4000}
        onClose={() => setAlertOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setAlertOpen(false)} severity={alertSeverity} sx={{ width: '100%' }}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default EditProfileForm;
