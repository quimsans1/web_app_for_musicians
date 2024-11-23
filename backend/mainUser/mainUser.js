const express = require('express');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');  // Import multer for handling file uploads

const router = express.Router();

// Path to the mainUser file
const filePath = path.join(__dirname, 'mainUser.json');

// Multer setup for handling images
const upload = multer({
  dest: path.join(__dirname, 'uploads'), // Folder where uploaded images will be stored
  limits: { fileSize: 5 * 1024 * 1024 }, // Max file size of 5MB per image
}).single('profilePicture'); // Field name for the profile picture

// Function to read the main user data from the file
const readMainUser = () => {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);  // Return the parsed JSON object
  } catch (error) {
    console.error('Error reading the mainUser file:', error);
    return null;
  }
};

// Function to write the updated main user data to the file
const writeMainUser = (data) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));  // Save as a formatted JSON string
  } catch (error) {
    console.error('Error writing to the mainUser file:', error);
  }
};

// Always initialize the mainUser with default values
const initializeMainUser = () => {
  const newMainUser = {
    id: uuidv4(),
    nickname: 'GuitarPlayer99',
    name: 'Marc Vernis',
    description: "I'm a guitarist from Barcelona and I like to play guitar so much!",
    profilePicture: 'https://randomuser.me/api/portraits/men/40.jpg',
    backgroundImage: 'https://img2-azrcdn.newser.com/image/1460855-17-20230305192226-remember-90s-band-live-things-took-nasty-turn.jpeg',
    photos: ['https://example.com/photo1.jpg', 'https://example.com/photo2.jpg'],
    musicStyles: ['Blues', 'Funk'],
    languages: ['English', 'Spanish'],
    location: 'Barcelona, Spain',
    links: [
      { url: 'https://youtube.com/user1' },
      { url: 'https://instagram.com/user1' },
    ],
    userType: 'Musician',
    musicianInfo: { instruments: ['Drums', 'Bass'] },
    groupInfo: {
      groupType: [''],
    },
    serviceInfo: {
      serviceType: [''],
    }
  };

  writeMainUser(newMainUser);
  console.log('Main user data initialized with default values.');
};

// Initialize the main user at server start
initializeMainUser();

// Get Main User
router.get('/', (req, res) => {
  const mainUser = readMainUser();
  if (mainUser) {
    res.json(mainUser);
  } else {
    res.status(404).json({ message: 'Main user not found' });
  }
});

// Edit Main User
router.put('/', upload, (req, res) => {
  const updatedUser = req.body;
  console.log('UPDATED USER', updatedUser);

  // Handle profile picture upload
  if (req.file) {
    updatedUser.profilePicture = `/uploads/${req.file.filename}`;  // Update profile picture URL
  }

  // Parse arrays and objects from FormData
  if (updatedUser.musicStyles && typeof updatedUser.musicStyles === 'string') {
    updatedUser.musicStyles = updatedUser.musicStyles.split(','); // Convert string to array
  }

  if (updatedUser.languages && typeof updatedUser.languages === 'string') {
    updatedUser.languages = updatedUser.languages.split(','); // Convert string to array
  }

  if (updatedUser.photos && typeof updatedUser.photos === 'string') {
    updatedUser.photos = updatedUser.photos.split(','); // Convert string to array
  }

  // Handle `links` field and parse into array of objects
  if (updatedUser.links && typeof updatedUser.links === 'string') {
    console.log('Parsing links:', updatedUser.links);  // Log for debugging
    updatedUser.links = JSON.parse(updatedUser.links); // Parse JSON string into array of objects
  }

  // Correctly handle `musicianInfo`, `groupInfo`, `serviceInfo` as objects with a single key containing an array
  if (updatedUser.musicianInfo && typeof updatedUser.musicianInfo === 'string') {
    updatedUser.musicianInfo = JSON.parse(updatedUser.musicianInfo); // Parse into object
  }
  if (updatedUser.groupInfo && typeof updatedUser.groupInfo === 'string') {
    updatedUser.groupInfo = JSON.parse(updatedUser.groupInfo); // Parse into object
  }
  if (updatedUser.serviceInfo && typeof updatedUser.serviceInfo === 'string') {
    updatedUser.serviceInfo = JSON.parse(updatedUser.serviceInfo); // Parse into object
  }

  // After parsing, ensure the structure has the correct format
  if (updatedUser.musicianInfo && typeof updatedUser.musicianInfo === 'object') {
    const instruments = updatedUser.musicianInfo.instruments || [];
    updatedUser.musicianInfo = { instruments };
  }

  if (updatedUser.groupInfo && typeof updatedUser.groupInfo === 'object') {
    const groupType = updatedUser.groupInfo.groupType || [];
    updatedUser.groupInfo = { groupType };
  }

  if (updatedUser.serviceInfo && typeof updatedUser.serviceInfo === 'object') {
    const serviceType = updatedUser.serviceInfo.serviceType || [];
    updatedUser.serviceInfo = { serviceType };
  }

  console.log('FORMATTED UPDATED USER', updatedUser);  // Log the final formatted user data for debugging

  try {
    const currentUser = readMainUser();
    if (currentUser) {
      // Combine the old user data with the new data
      const finalUser = { ...currentUser, ...updatedUser };
      // Save the updated data to the file
      writeMainUser(finalUser);

      res.status(200).json({ message: 'User updated successfully', user: finalUser });
    } else {
      res.status(404).json({ message: 'Main user not found' });
    }
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Error updating user' });
  }
});

module.exports = { router, readMainUser };
