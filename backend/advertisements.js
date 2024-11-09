// advertisements.js
const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { users } = require('./users'); 

const router = express.Router();

// Datos ficticios de advertisements
const advertisements = [
  { 
    id: uuidv4(),
    userId: users[0].id,
    title: 'Clases de Guitarra para Principiantes',
    location: 'Barcelona, España',
    type: 'Offer',
    image: 'https://www.adkguitar.com/cdn/shop/articles/Teaching_Guitar_7f53df60-944c-4301-b385-b0aa119a126f_800x.jpg?v=1574362730' 
  },
  { 
    id: uuidv4(),
    userId: users[0].id,
    title: 'Concierto de Jazz',
    location: 'Madrid, España',
    type: 'Event',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMwdpraULk0SNrTx46cjJ5ikNXKdrRBdP4aA&s' 
  },
  { 
    id: uuidv4(),
    userId: users[1].id,
    title: 'Busco Vocalista para Banda de Rock',
    location: 'Valencia, España',
    type: 'Offer',
    image: 'https://i.ytimg.com/vi/qFD2wDUGH2A/maxresdefault.jpg' 
  },
  // Agrega más advertisements aquí según sea necesario
];

// Ruta para obtener todos los advertisements
router.get('/', (req, res) => {
  res.json(advertisements);
});

// Ruta para obtener un advertisement por ID
router.get('/:id', (req, res) => {
  const advertisementId = req.params.id;
  const advertisement = advertisements.find(a => a.id === advertisementId);
  if (advertisement) {
    res.json(advertisement);
  } else {
    res.status(404).json({ message: 'Advertisement no encontrado' });
  }
});

module.exports = router;
