// SearchUserFilters.js
import React from 'react';
import { TextField, InputAdornment, Select, MenuItem, Typography } from '@mui/material';

const instrumentsList = [
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

const groupTypeList = [
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
  "Wind Quintet"
].sort();

const serviceTypeList = [
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
].sort();

const languagesList = [
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
].sort();

const countriesList = [
  'USA',
  'UK',
  'France',
  'Japan',
  'Spain',
  'Germany',
  'Australia',
  'Canada',
  'China',
  'Brazil',
  'South Africa',
  'Russia',
  'India',
  'South Korea',
  'UAE',
  'Italy',
  'Mexico',
  'Thailand',
  'Turkey',
  'Argentina',
  'Singapore',
  'Malaysia',
  'Indonesia',
  'Egypt',
  'Greece',
  'Vietnam',
  'Portugal',
  'Sweden',
  'Norway',
  'Denmark',
  'Ireland',
  'Austria',
  'Netherlands',
  'Belgium',
  'Poland',
  'Finland',
  'Switzerland',
  'Czech Republic'
];

const musicStylesList = [
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

const SearchUserFilters = ({
  searchTerm,
  setSearchTerm,
  userTypeFilter,
  setUserTypeFilter,
  instrumentFilter,
  setInstrumentFilter,
  groupTypeFilter,
  setGroupTypeFilter,
  serviceTypeFilter,
  setServiceTypeFilter,
  languageFilter,
  setLanguageFilter,
  countryFilter,
  setCountryFilter,
  musicStyleFilter,
  setMusicStyleFilter
}) => {
  return (
    <>
      <TextField
        variant="outlined"
        size="small"
        placeholder="Search User"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Typography sx={{ marginRight: 1 }}>@</Typography>
            </InputAdornment>
          ),
        }}
        sx={{
          backgroundColor: 'white',
          borderRadius: '4px',
          width: '200px',
          '& .MuiOutlinedInput-root': {
            '& fieldset': { borderColor: 'grey.400' },
            '&:hover fieldset': { borderColor: 'primary.main' },
            '&.Mui-focused fieldset': { borderColor: 'primary.main' },
          },
        }}
      />

      <Select
        value={userTypeFilter}
        onChange={(e) => {
          setUserTypeFilter(e.target.value);
          setInstrumentFilter('');
          setGroupTypeFilter('');
          setServiceTypeFilter('');
        }}
        displayEmpty
        variant="outlined"
        size="small"
        sx={{ marginLeft: 2, backgroundColor: 'white', height: '36px', width: '170px' }}
      >
        <MenuItem value=""><em>Select User Type</em></MenuItem>
        <MenuItem value="Musician">Musician</MenuItem>
        <MenuItem value="Group">Group</MenuItem>
        <MenuItem value="Service">Service</MenuItem>
      </Select>

      {userTypeFilter === 'Musician' && (
        <Select
          value={instrumentFilter}
          onChange={(e) => setInstrumentFilter(e.target.value)}
          displayEmpty
          variant="outlined"
          size="small"
          sx={{ marginLeft: 2, backgroundColor: 'white', height: '36px', width: '170px' }}
        >
          <MenuItem value=""><em>Select Instrument</em></MenuItem>
          {instrumentsList.map((instrument) => (
            <MenuItem key={instrument} value={instrument}>{instrument}</MenuItem>
          ))}
        </Select>
      )}

      {userTypeFilter === 'Group' && (
        <Select
          value={groupTypeFilter}
          onChange={(e) => setGroupTypeFilter(e.target.value)}
          displayEmpty
          variant="outlined"
          size="small"
          sx={{ marginLeft: 2, backgroundColor: 'white', height: '36px', width: '170px' }}
        >
          <MenuItem value=""><em>Select Group Type</em></MenuItem>
          {groupTypeList.map((groupType) => (
            <MenuItem key={groupType} value={groupType}>{groupType}</MenuItem>
          ))}
        </Select>
      )}

      {userTypeFilter === 'Service' && (
        <Select
          value={serviceTypeFilter}
          onChange={(e) => setServiceTypeFilter(e.target.value)}
          displayEmpty
          variant="outlined"
          size="small"
          sx={{ marginLeft: 2, backgroundColor: 'white', height: '36px', width: '170px' }}
        >
          <MenuItem value=""><em>Select Service Type</em></MenuItem>
          {serviceTypeList.map((serviceType) => (
            <MenuItem key={serviceType} value={serviceType}>{serviceType}</MenuItem>
          ))}
        </Select>
      )}

      {/* Language Filter */}
      <Select
        value={languageFilter}
        onChange={(e) => setLanguageFilter(e.target.value)}
        displayEmpty
        variant="outlined"
        size="small"
        sx={{ marginLeft: 2, backgroundColor: 'white', height: '36px', width: '170px' }}
      >
        <MenuItem value=""><em>Select Language</em></MenuItem>
        {languagesList.map((language) => (
          <MenuItem key={language} value={language}>{language}</MenuItem>
        ))}
      </Select>

      {/* Country Filter */}
      <Select
        value={countryFilter}
        onChange={(e) => setCountryFilter(e.target.value)}
        displayEmpty
        variant="outlined"
        size="small"
        sx={{ marginLeft: 2, backgroundColor: 'white', height: '36px', width: '170px' }}
      >
        <MenuItem value=""><em>Select Country</em></MenuItem>
        {countriesList.map((country) => (
          <MenuItem key={country} value={country}>{country}</MenuItem>
        ))}
      </Select>

      {/* Music Style Filter */}
      <Select
        value={musicStyleFilter}
        onChange={(e) => setMusicStyleFilter(e.target.value)}
        displayEmpty
        variant="outlined"
        size="small"
        sx={{ marginLeft: 2, backgroundColor: 'white', height: '36px', width: '170px' }}
      >
        <MenuItem value=""><em>Select Style</em></MenuItem>
        {musicStylesList.map((style) => (
          <MenuItem key={style} value={style}>{style}</MenuItem>
        ))}
      </Select>
    </>
  );
};

export default SearchUserFilters;
