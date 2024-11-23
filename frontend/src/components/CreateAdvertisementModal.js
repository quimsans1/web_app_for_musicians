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
        <Typography variant="h6" component="h2" gutterBottom>
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
            <MenuItem value="Barcelona, Spain">Barcelona, Spain</MenuItem>
            <MenuItem value="Madrid, Spain">Madrid, Spain</MenuItem>
            <MenuItem value="Valencia, Spain">Valencia, Spain</MenuItem>
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
