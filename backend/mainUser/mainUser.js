const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

// Ruta del archivo JSON que contiene al mainUser
const filePath = path.join(__dirname, 'mainUser.json');

// Función para leer el archivo de mainUser
const readMainUser = () => {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error leyendo el archivo de mainUser:', error);
    return null;
  }
};

// Función para escribir los datos del mainUser en el archivo JSON
const writeMainUser = (data) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error escribiendo el archivo de mainUser:', error);
  }
};

// Siempre inicializa el mainUser con los datos por defecto, sobrescribiendo cualquier dato previo
const initializeMainUser = () => {
    const mainUser = readMainUser();
    // Si no existe o está vacío, inicializamos con datos predeterminados
    if (!mainUser || mainUser.length === 0) {
      const newMainUser = {
        id: '38290880',  // ID fijo
        nickname: 'GuitarPlayer99',
        name: 'Marc Vernis',
        description: "I'm a guitarist from Barcelona and I like to play guitar so much! I started studying at the age of 5 years old.",
        profilePicture: 'https://randomuser.me/api/portraits/men/40.jpg',
        backgroundImage: 'https://img2-azrcdn.newser.com/image/1460855-17-20230305192226-remember-90s-band-live-things-took-nasty-turn.jpeg',
        photos: [
          'https://img2-azrcdn.newser.com/image/1460855-17-20230305192226-remember-90s-band-live-things-took-nasty-turn.jpeg',
          'https://c8.alamy.com/comp/D4WWFJ/rock-band-vintage-playing-live-on-stage-poland-D4WWFJ.jpg'
        ],
        musicStyles: ['Blues', 'Funk'],
        languages: ['English', 'Spanish'],
        location: 'Barcelona, Spain',
        links: [
          { platform: 'YouTube', url: 'https://youtube.com/user1' },
          { platform: 'Instagram', url: 'https://instagram.com/user1' },
          { platform: 'Unknown', url: 'https://es.wikipedia.org/wiki/Iron_Maiden' }
        ],
        userType: 'Musician',
        musicianInfo: { instruments: ['Drums', 'Bass'] },
        groupInfo: { groupType: '' },
        serviceInfo: { serviceType: '' }
      };
      writeMainUser([newMainUser]);  // Escribe los datos predeterminados solo si el archivo está vacío
    }
  };

// Inicializa el mainUser con los datos por defecto al arrancar el servidor
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

module.exports = { router, readMainUser };
