// SearchUserFilters.js
import React from 'react';
import { TextField, InputAdornment, Select, MenuItem, Typography } from '@mui/material';

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
          <MenuItem value="Guitar">Guitar</MenuItem>
          <MenuItem value="Piano">Piano</MenuItem>
          <MenuItem value="Drums">Drums</MenuItem>
          <MenuItem value="Violin">Violin</MenuItem>
          <MenuItem value="Bass">Bass</MenuItem>
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
          <MenuItem value="Band">Band</MenuItem>
          <MenuItem value="Orchestra">Orchestra</MenuItem>
          <MenuItem value="Choir">Choir</MenuItem>
          <MenuItem value="Quartet">Quartet</MenuItem>
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
          <MenuItem value="Production">Production</MenuItem>
          <MenuItem value="Music Coaching">Music Coaching</MenuItem>
          <MenuItem value="Sound Engineering">Sound Engineering</MenuItem>
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
        <MenuItem value="English">English</MenuItem>
        <MenuItem value="Spanish">Spanish</MenuItem>
        <MenuItem value="French">French</MenuItem>
        <MenuItem value="German">German</MenuItem>
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
        <MenuItem value="USA">USA</MenuItem>
        <MenuItem value="Spain">Spain</MenuItem>
        <MenuItem value="France">France</MenuItem>
        <MenuItem value="Germany">Germany</MenuItem>
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
        <MenuItem value=""><em>Select Music Style</em></MenuItem>
        <MenuItem value="Rock">Rock</MenuItem>
        <MenuItem value="Jazz">Jazz</MenuItem>
        <MenuItem value="Classical">Classical</MenuItem>
        <MenuItem value="Pop">Pop</MenuItem>
      </Select>
    </>
  );
};

export default SearchUserFilters;
