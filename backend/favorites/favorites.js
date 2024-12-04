const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

const filePath = path.join(__dirname, 'favorites.json');

const readFavorites = () => {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading the favorites file:', error);
    return null;
  }
};

// Function to write the updated favorites data to the file
const writeFavorites = (data) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error writing to the favorites file:', error);
  }
};

// Always initialize the favorites with default values
const initializeFavorites = () => {
  const newFavorites = []
  writeFavorites(newFavorites);
};
initializeFavorites();
  

// Get Favorites
router.get('/', (req, res) => {
    const favorites = readFavorites();
    res.json(favorites);
  });

router.post('/', (req, res) => {
    const obj = req.body;
    const userId = Object.keys(obj)[0]

    const favorites = readFavorites();
    favorites.push(userId);
    writeFavorites(favorites);

    res.status(201).json(userId);
});

router.delete('/', (req, res) => {
    const obj = req.body;
    const userId = Object.keys(obj)[0];

    const favorites = readFavorites();
    const index = favorites.indexOf(userId);
    if (index !== -1) {
        favorites.splice(index, 1);
        writeFavorites(favorites);
        res.status(200).json({ message: `User ID ${userId} removed from favorites.` });
    } else {
        res.status(404).json({ error: `User ID ${userId} not found in favorites.` });
    }
});

module.exports = { router, readFavorites };
