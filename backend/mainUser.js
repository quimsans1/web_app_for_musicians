// mainUser.js
const express = require('express');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

// Datos ficticios de usuarios
const mainUser = [
    {
        id: uuidv4(),
        nickname: 'GuitarPlayer99',
        name: 'Marc Vernis',
        description: "I'm a guitarist from Barcelona and I like to play guitar so much! I started studying at the age of 5 years old.",
        profilePicture: 'https://randomuser.me/api/portraits/men/40.jpg',
        backgroundImage: 'https://img2-azrcdn.newser.com/image/1460855-17-20230305192226-remember-90s-band-live-things-took-nasty-turn.jpeg',
        photos: [
            'https://img2-azrcdn.newser.com/image/1460855-17-20230305192226-remember-90s-band-live-things-took-nasty-turn.jpeg',
            'https://c8.alamy.com/comp/D4WWFJ/rock-band-vintage-playing-live-on-stage-poland-D4WWFJ.jpg',
            'https://c8.alamy.com/comp/D4WWFJ/rock-band-vintage-playing-live-on-stage-poland-D4WWFJ.jpg',
            'https://c8.alamy.com/comp/D4WWFJ/rock-band-vintage-playing-live-on-stage-poland-D4WWFJ.jpg',
            'https://c8.alamy.com/comp/D4WWFJ/rock-band-vintage-playing-live-on-stage-poland-D4WWFJ.jpg',
            'https://c8.alamy.com/comp/D4WWFJ/rock-band-vintage-playing-live-on-stage-poland-D4WWFJ.jpg'
        ],
        musicStyles: ['Blues', 'Funk'],
        instrument: ['Guitar'],
        languages: ['English', 'Spanish'],
        location: 'Barcelona, Spain',
        links: [
            { platform: 'YouTube', url: 'https://youtube.com/user1' },
            { platform: 'Instagram', url: 'https://instagram.com/user1' },
            { platform: 'Unkown', url: 'https://es.wikipedia.org/wiki/Iron_Maiden' }
        ]
    },
];

// Get Main User
router.get('/', (req, res) => {
  res.json(mainUser);
});

module.exports = { mainUser, router };
