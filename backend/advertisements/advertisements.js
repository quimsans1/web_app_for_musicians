const express = require('express');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');
const { users } = require('../users/users');
const { readMainUser } = require('../mainUser/mainUser');

const router = express.Router();
const mainUser = readMainUser();

const initialAdvertisements = [
  { 
    id: uuidv4(),
    userId: users[4].id,
    title: 'Clases de Guitarra para Principiantes',
    description: 'bla bla bla bla bla bla.',
    location: 'Barcelona, España',
    type: 'Offer',
    image: 'https://www.adkguitar.com/cdn/shop/articles/Teaching_Guitar_7f53df60-944c-4301-b385-b0aa119a126f_800x.jpg?v=1574362730',
    link: 'https://es.wikipedia.org/wiki/Wikipedia:Portada'
  },
  { 
    id: uuidv4(),
    userId: users[1].id,
    title: 'Jazz Concert',
    description: 'bla bla bla bla bla bla.',
    location: 'Madrid, España',
    type: 'Event',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMwdpraULk0SNrTx46cjJ5ikNXKdrRBdP4aA&s',
    link: 'https://es.wikipedia.org/wiki/Wikipedia:Portada'
  },
  { 
    id: uuidv4(),
    userId: users[2].id,
    title: 'Searching a Vocalist for our Rock Band',
    description: 'bla bla bla bla bla bla.',
    location: 'Valencia, España',
    type: 'Offer',
    image: 'https://i.ytimg.com/vi/qFD2wDUGH2A/maxresdefault.jpg',
    link: 'https://es.wikipedia.org/wiki/Wikipedia:Portada'
  },
  { 
    id: uuidv4(),
    userId: users[1].id,
    title: 'Title',
    description: 'bla bla bla bla bla bla.',
    location: 'Valencia, España',
    type: 'Offer',
    image: 'https://i.ytimg.com/vi/qFD2wDUGH2A/maxresdefault.jpg',
    link: 'https://es.wikipedia.org/wiki/Wikipedia:Portada'
  },
  { 
    id: uuidv4(),
    userId: users[2].id,
    title: 'Title',
    description: 'bla bla bla bla bla bla.',
    location: 'Valencia, España',
    type: 'Offer',
    image: 'https://i.ytimg.com/vi/qFD2wDUGH2A/maxresdefault.jpg',
    link: 'https://es.wikipedia.org/wiki/Wikipedia:Portada'
  },
  { 
    id: uuidv4(),
    userId: users[3].id,
    title: 'Title',
    description: 'bla bla bla bla bla bla.',
    location: 'Valencia, España',
    type: 'Offer',
    image: 'https://i.ytimg.com/vi/qFD2wDUGH2A/maxresdefault.jpg',
    link: 'https://es.wikipedia.org/wiki/Wikipedia:Portada'
  },
  { 
    id: uuidv4(),
    userId: users[4].id,
    title: 'Title',
    description: 'bla bla bla bla bla bla.',
    location: 'Valencia, España',
    type: 'Offer',
    image: 'https://i.ytimg.com/vi/qFD2wDUGH2A/maxresdefault.jpg',
    link: 'https://es.wikipedia.org/wiki/Wikipedia:Portada'
  },
  { 
    id: uuidv4(),
    userId: users[5].id,
    title: 'Title',
    description: 'bla bla bla bla bla bla.',
    location: 'Valencia, España',
    type: 'Offer',
    image: 'https://i.ytimg.com/vi/qFD2wDUGH2A/maxresdefault.jpg',
    link: 'https://es.wikipedia.org/wiki/Wikipedia:Portada'
  },
  { 
    id: uuidv4(),
    userId: users[6].id,
    title: 'Title',
    description: 'bla bla bla bla bla bla.',
    location: 'Valencia, España',
    type: 'Offer',
    image: 'https://i.ytimg.com/vi/qFD2wDUGH2A/maxresdefault.jpg',
    link: 'https://es.wikipedia.org/wiki/Wikipedia:Portada'
  },
];

const filePath = path.join(__dirname, 'advertisements.json');

const initializeAdvertisements = () => {
  
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath); // Esborra l'arxiu
  }

  const advertisements = initialAdvertisements.map(ad => ({
    ...ad,
    id: uuidv4(),
  }));

  fs.writeFileSync(filePath, JSON.stringify(advertisements, null, 2));
};

initializeAdvertisements();

const readAdvertisements = () => {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error leyendo el archivo:', error);
    return [];
  }
};

const writeAdvertisements = (data) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error writing the file:', error);
  }
};

// Get all advertisements
router.get('/', (req, res) => {
  const advertisements = readAdvertisements();
  res.json(advertisements);
});

// Get by ID
router.get('/:id', (req, res) => {
  const advertisements = readAdvertisements();
  const advertisement = advertisements.find(a => a.id === req.params.id);
  if (advertisement) {
    res.json(advertisement);
  } else {
    res.status(404).json({ message: 'Advertisement not found' });
  }
});

router.post('/', (req, res) => {

  const mainUser = readMainUser();

  const { title, description, location, type, image, link } = req.body;

  if (!title || !description || !location || !type || !image || !link) {
    return res.status(400).json({ message: 'Required fields are missing' });
  }

  if (!mainUser || Object.keys(mainUser).length === 0) {
    return res.status(404).json({ message: 'Main user not found in Advertisements.js' });
  }

  const newAdvertisement = {
    id: uuidv4(),
    userId: mainUser.id,
    title,
    description,
    location,
    type,
    image,
    link,
  };

  const advertisements = readAdvertisements();
  advertisements.push(newAdvertisement);
  writeAdvertisements(advertisements);

  res.status(201).json(newAdvertisement);
});

router.delete('/', (req, res) => {
  const obj = req.body;
  const id = Object.keys(obj)[0];

  const advertisements = readAdvertisements();

  const index = advertisements.findIndex((ad) => ad.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Advertisement not found' });
  }
  advertisements.splice(index, 1);
  writeAdvertisements(advertisements);
  res.status(200).json({ message: 'Advertisement deleted successfully' });
});


module.exports = router;
