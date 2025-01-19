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
    title: 'Guitar classes for beginners',
    description: 'Learn piano with professional musician Emily Jones. Tailored lessons for all skill levels, beginners welcome! First session free.',
    location: 'Barcelona, España',
    type: 'Offer',
    image: 'https://www.adkguitar.com/cdn/shop/articles/Teaching_Guitar_7f53df60-944c-4301-b385-b0aa119a126f_800x.jpg?v=1574362730',
    link: 'https://es.wikipedia.org/wiki/Wikipedia:Portada'
  },
  { 
    id: uuidv4(),
    userId: users[1].id,
    title: 'Jazz Concert',
    description: 'Join us for an evening of smooth jazz featuring the legendary Marcus Green Quartet. Free entry, bring your friends!',
    location: 'Madrid, España',
    type: 'Event',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMwdpraULk0SNrTx46cjJ5ikNXKdrRBdP4aA&s',
    link: 'https://es.wikipedia.org/wiki/Wikipedia:Portada'
  },
  { 
    id: uuidv4(),
    userId: users[12].id,
    title: 'Discover Your Voice',
    description: 'Unlock the full potential of your voice with Grammy-nominated vocal coach Anna Marie. Classes for kids and adults. Book today and get a free consultation!',
    location: 'Valencia, España',
    type: 'Offer',
    image: 'https://umaine.edu/news/wp-content/uploads/sites/3/2018/05/Vocal-fold-news-feature.jpg',
    link: 'https://es.wikipedia.org/wiki/Wikipedia:Portada'
  },
  { 
    id: uuidv4(),
    userId: users[3].id,
    title: 'Master the Piano in 30 Days!',
    description: 'Learn piano with professional musician Emily Jones. Tailored lessons for all skill levels, beginners welcome! First session free.',
    location: 'Valencia, España',
    type: 'Offer',
    image: 'https://hinves.com/wp-content/uploads/2023/06/como-mantener-tu-piano-en-perfectas-condiciones.jpg',
    link: 'https://es.wikipedia.org/wiki/Wikipedia:Portada'
  },
  { 
    id: uuidv4(),
    userId: users[5].id,
    title: 'DJ Masterclass',
    description: 'Become the DJ everyone talks about! Learn mixing, scratching, and beat-matching with industry pro DJ Flex. Limited slots, enroll now.',
    location: 'Valencia, España',
    type: 'Offer',
    image: 'https://dnamusic.edu.co/wp-content/uploads/2023/07/unnamed-3.jpg',
    link: 'https://es.wikipedia.org/wiki/Wikipedia:Portada'
  },
  { 
    id: uuidv4(),
    userId: users[5].id,
    title: 'Online Music Production Course',
    description: 'Dive into the world of music production with this beginner-friendly online course. Learn DAWs, mixing, and mastering from your home. Sign up for an early bird discount!',
    location: 'Valencia, España',
    type: 'Offer',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7keqPHatBgyOE0lzkd0GcH1PmByrMDQJmyg&s',
    link: 'https://es.wikipedia.org/wiki/Wikipedia:Portada'
  },
  { 
    id: uuidv4(),
    userId: users[6].id,
    title: 'Classical Symphony Gala',
    description: 'Experience an unforgettable evening of classical masterpieces performed by the Royal Philharmonic Orchestra. March 5th at the Grand Opera Hall.',
    location: 'Valencia, España',
    type: 'Event',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjHzx_NrRs2kgG2g1ZxsAXYyDYhjLIToNjCg&s',
    link: 'https://es.wikipedia.org/wiki/Wikipedia:Portada'
  },
  { 
    id: uuidv4(),
    userId: users[12].id,
    title: 'Sing Your Heart Out: Open Mic Night',
    description: 'Calling all singers and performers! Join us for a fun and supportive open mic night at The Harmony Café. March 12th, free registration!',
    location: 'Valencia, España',
    type: 'Event',
    image: 'https://cdn.prod.website-files.com/655e0fa544c67c1ee5ce01c7/655e0fa544c67c1ee5ce0f4f_playing-open-mic-nights.webp',
    link: 'https://es.wikipedia.org/wiki/Wikipedia:Portada'
  },
  { 
    id: uuidv4(),
    userId: users[14].id,
    title: 'Electronic Pulse',
    description: 'Get ready to dance to electrifying beats by DJ Echo in an immersive light-and-sound experience.',
    location: 'Valencia, España',
    type: 'Event',
    image: 'https://images.xceed.me/clubs/covers/jamboree-dance-club-club-barcelona-xceed-0aca.jpg',
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
