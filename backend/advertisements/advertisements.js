const express = require('express');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');
const { users } = require('../users/users');
const { readMainUser } = require('../mainUser/mainUser');

const router = express.Router();
const mainUser = readMainUser();

// Contenido inicial (amb UUIDs generats dinàmicament per cada reinici)
const initialAdvertisements = [
  { 
    id: uuidv4(),
    userId: users[0].id,
    title: 'Clases de Guitarra para Principiantes',
    description: 'bla bla bla bla bla bla.',
    location: 'Barcelona, España',
    type: 'Offer',
    image: 'https://www.adkguitar.com/cdn/shop/articles/Teaching_Guitar_7f53df60-944c-4301-b385-b0aa119a126f_800x.jpg?v=1574362730',
    link: 'https://es.wikipedia.org/wiki/Wikipedia:Portada'
  },
  { 
    id: uuidv4(),
    userId: users[0].id,
    title: 'Concierto de Jazz',
    description: 'bla bla bla bla bla bla.',
    location: 'Madrid, España',
    type: 'Event',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMwdpraULk0SNrTx46cjJ5ikNXKdrRBdP4aA&s',
    link: 'https://es.wikipedia.org/wiki/Wikipedia:Portada'
  },
  { 
    id: uuidv4(),
    userId: users[1].id,
    title: 'Busco Vocalista para Banda de Rock',
    description: 'bla bla bla bla bla bla.',
    location: 'Valencia, España',
    type: 'Offer',
    image: 'https://i.ytimg.com/vi/qFD2wDUGH2A/maxresdefault.jpg',
    link: 'https://es.wikipedia.org/wiki/Wikipedia:Portada'
  },
  // Agrega más advertisements aquí según sea necesario
];

// Ruta del archivo JSON
const filePath = path.join(__dirname, 'advertisements.json');

// Funció per inicialitzar el fitxer JSON amb les dades per defecte
const initializeAdvertisements = () => {
  console.log('Inicializando el archivo de advertisements...');
  
  // Esborra el contingut actual del fitxer
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath); // Esborra l'arxiu
  }

  // Genera les dades per defecte amb nous UUIDs
  const advertisements = initialAdvertisements.map(ad => ({
    ...ad,
    id: uuidv4(), // Genera un nou UUID per cada publicitat
  }));

  // Guarda el contingut per defecte al fitxer JSON
  fs.writeFileSync(filePath, JSON.stringify(advertisements, null, 2));

  console.log('El archivo de advertisements ha sido inicializado con los datos por defecto.');
};

// Inicialitza el fitxer d'advertisements quan el servidor s'inicia
initializeAdvertisements();

// Funció per llegir dades del fitxer JSON
const readAdvertisements = () => {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error leyendo el archivo:', error);
    return [];
  }
};

// Funció per escriure dades al fitxer JSON
const writeAdvertisements = (data) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error escribiendo el archivo:', error);
  }
};

// Ruta per obtenir tots els advertisements
router.get('/', (req, res) => {
  const advertisements = readAdvertisements();
  res.json(advertisements);
});

// Ruta per obtenir un advertisement per ID
router.get('/:id', (req, res) => {
  const advertisements = readAdvertisements();
  const advertisement = advertisements.find(a => a.id === req.params.id);
  if (advertisement) {
    res.json(advertisement);
  } else {
    res.status(404).json({ message: 'Advertisement no encontrado' });
  }
});

// Ruta per crear un nou advertisement
router.post('/', (req, res) => {
  console.log('REQ.BODY', req.body);

  const mainUser = readMainUser(); 

  const { title, description, location, type, image, link } = req.body;

  // Verifica si faltan campos obligatorios
  if (!title || !description || !location || !type || !image || !link) {
    return res.status(400).json({ message: 'Required fields are missing' });
  }

  // Verifica si el mainUser es válido
  if (!mainUser || Object.keys(mainUser).length === 0) {
    return res.status(404).json({ message: 'Main user not found in Advertisements.js' });
  }

  // Crea el nuevo anuncio
  const newAdvertisement = {
    id: uuidv4(),
    userId: mainUser.id, // Cambia a `mainUser.id` porque es un objeto
    title,
    description,
    location,
    type,
    image,
    link,
  };

  // Save Advertisement
  const advertisements = readAdvertisements();
  advertisements.push(newAdvertisement);
  writeAdvertisements(advertisements);

  // Devuelve el nuevo anuncio como respuesta
  res.status(201).json(newAdvertisement);
});


module.exports = router;
