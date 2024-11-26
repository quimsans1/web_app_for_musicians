const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

// Path to the favorties file
const filePath = path.join(__dirname, 'favorites.json');

const readFavorites = () => {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);  // Return the parsed JSON object
  } catch (error) {
    console.error('Error reading the favorites file:', error);
    return null;
  }
};

// Function to write the updated favorites data to the file
const writeFavorites = (data) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));  // Save as a formatted JSON string
  } catch (error) {
    console.error('Error writing to the favorites file:', error);
  }
};

// Always initialize the favorites with default values
const initializeFavorites = () => {
  const newFavorites = []
  writeFavorites(newFavorites);
  console.log('Favorites data initialized with default Array.');
};
initializeFavorites();
// Initialize the favorites at server start
/*if (!fs.existsSync(filePath)) {
    
}*/
  

// Get Favorites
router.get('/', (req, res) => {
    const favorites = readFavorites();
    res.json(favorites);
  });

router.post('/', (req, res) => {
    const obj = req.body;
    const userId = Object.keys(obj)[0]
    console.log('FAVORITE ID FORMATTED', userId);

    const favorites = readFavorites();
    favorites.push(userId);
    writeFavorites(favorites);

    res.status(201).json(userId);
});

router.delete('/', (req, res) => {
    const obj = req.body; // Se espera que el cuerpo de la solicitud contenga el userId
    const userId = Object.keys(obj)[0]; // Obtener la clave del objeto enviado
    console.log('FAVORITE ID DELETED', userId);

    const favorites = readFavorites(); // Leer el array de favoritos

    // Comprobar si el userId existe en el array
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
