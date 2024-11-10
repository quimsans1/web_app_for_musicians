// users.js
const express = require('express');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

// Datos ficticios de usuarios
const users = [
    {
        id: uuidv4(),
        nickname: 'MusicLover123',
        name: 'Albert Scofield',
        description: 'blablabla',
        profilePicture: 'https://randomuser.me/api/portraits/men/32.jpg',
        backgroundImage: 'https://img2-azrcdn.newser.com/image/1460855-17-20230305192226-remember-90s-band-live-things-took-nasty-turn.jpeg',
        photos: [
        'https://img2-azrcdn.newser.com/image/1460855-17-20230305192226-remember-90s-band-live-things-took-nasty-turn.jpeg',
        'https://c8.alamy.com/comp/D4WWFJ/rock-band-vintage-playing-live-on-stage-poland-D4WWFJ.jpg',
        'https://c8.alamy.com/comp/D4WWFJ/rock-band-vintage-playing-live-on-stage-poland-D4WWFJ.jpg',
        'https://c8.alamy.com/comp/D4WWFJ/rock-band-vintage-playing-live-on-stage-poland-D4WWFJ.jpg',
        'https://c8.alamy.com/comp/D4WWFJ/rock-band-vintage-playing-live-on-stage-poland-D4WWFJ.jpg',
        'https://c8.alamy.com/comp/D4WWFJ/rock-band-vintage-playing-live-on-stage-poland-D4WWFJ.jpg'
        ],
        musicStyles: ['Rock', 'Jazz'],
        instrument: ['Guitar'],
        languages: ['English', 'Spanish'],
        location: 'New York, USA',
        links: [
        { platform: 'YouTube', url: 'https://youtube.com/user1' },
        { platform: 'Instagram', url: 'https://instagram.com/user1' },
        { platform: 'Unkown', url: 'https://es.wikipedia.org/wiki/Iron_Maiden' }

        ]
    },
    {
        id: uuidv4(),
        nickname: 'DrumMaster',
        name: 'John Smith',
        description: 'blablabla',
        profilePicture: 'https://randomuser.me/api/portraits/men/45.jpg',
        backgroundImage: 'https://media.vsstatic.com/image/upload/if_fc_gte_1/g_auto,q_auto,c_fill,w_1680,h_720/if_else/g_center,q_auto,c_fill,w_1680,h_720/if_end/dpr_auto,f_auto/hero/category/17-pop/pop-tickets-1.jpg',
        photos: [
        'https://img2-azrcdn.newser.com/image/1460855-17-20230305192226-remember-90s-band-live-things-took-nasty-turn.jpeg',
        'https://c8.alamy.com/comp/D4WWFJ/rock-band-vintage-playing-live-on-stage-poland-D4WWFJ.jpg'
        ],
        musicStyles: ['Pop', 'Electronic'],
        instrument: ['Drums'],
        languages: ['English'],
        location: 'Los Angeles, USA',
        links: [
        { platform: 'YouTube', url: 'https://youtube.com/user1' },
        { platform: 'Instagram', url: 'https://instagram.com/user1' }
        ]
    },
    {
        id: uuidv4(),
        nickname: 'ViolinVirtuoso',
        name: 'Albert Scofield',
        description: 'blablabla',
        profilePicture: 'https://randomuser.me/api/portraits/women/50.jpg',
        backgroundImage: 'https://img2-azrcdn.newser.com/image/1460855-17-20230305192226-remember-90s-band-live-things-took-nasty-turn.jpeg',
        photos: [
        'https://img2-azrcdn.newser.com/image/1460855-17-20230305192226-remember-90s-band-live-things-took-nasty-turn.jpeg',
        'https://c8.alamy.com/comp/D4WWFJ/rock-band-vintage-playing-live-on-stage-poland-D4WWFJ.jpg'
        ],
        musicStyles: ['Classical', 'Folk'],
        instrument: ['Violin'],
        languages: ['French', 'English'],
        location: 'Paris, France',
        links: [
        { platform: 'YouTube', url: 'https://youtube.com/user1' },
        { platform: 'Instagram', url: 'https://instagram.com/user1' }
        ]
    },
    {
        id: uuidv4(),
        nickname: 'ViolinVirtuoso',
        name: 'Albert Scofield',
        description: 'blablabla',
        profilePicture: 'https://randomuser.me/api/portraits/women/51.jpg',
        backgroundImage: 'https://img2-azrcdn.newser.com/image/1460855-17-20230305192226-remember-90s-band-live-things-took-nasty-turn.jpeg',
        photos: [
        'https://img2-azrcdn.newser.com/image/1460855-17-20230305192226-remember-90s-band-live-things-took-nasty-turn.jpeg',
        'https://c8.alamy.com/comp/D4WWFJ/rock-band-vintage-playing-live-on-stage-poland-D4WWFJ.jpg'
        ],
        musicStyles: ['Classical', 'Folk'],
        instrument: ['Violin'],
        languages: ['French', 'English'],
        location: 'Paris, France',
        links: [
        { platform: 'YouTube', url: 'https://youtube.com/user1' },
        { platform: 'Instagram', url: 'https://instagram.com/user1' }
        ]
    },
    {
        id: uuidv4(),
        nickname: 'ViolinVirtuoso',
        name: 'Albert Scofield',
        description: 'blablabla',
        profilePicture: 'https://randomuser.me/api/portraits/women/52.jpg',
        backgroundImage: 'https://img2-azrcdn.newser.com/image/1460855-17-20230305192226-remember-90s-band-live-things-took-nasty-turn.jpeg',
        photos: [
        'https://img2-azrcdn.newser.com/image/1460855-17-20230305192226-remember-90s-band-live-things-took-nasty-turn.jpeg',
        'https://c8.alamy.com/comp/D4WWFJ/rock-band-vintage-playing-live-on-stage-poland-D4WWFJ.jpg'
        ],
        musicStyles: ['Classical', 'Folk'],
        instrument: ['Violin'],
        languages: ['French', 'English'],
        location: 'Paris, France',
        links: [
        { platform: 'YouTube', url: 'https://youtube.com/user1' },
        { platform: 'Instagram', url: 'https://instagram.com/user1' }
        ]
    },
    {
        id: uuidv4(),
        nickname: 'ViolinVirtuoso',
        name: 'Albert Scofield',
        description: 'blablabla',
        profilePicture: 'https://randomuser.me/api/portraits/women/52.jpg',
        backgroundImage: 'https://img2-azrcdn.newser.com/image/1460855-17-20230305192226-remember-90s-band-live-things-took-nasty-turn.jpeg',
        photos: [
        'https://img2-azrcdn.newser.com/image/1460855-17-20230305192226-remember-90s-band-live-things-took-nasty-turn.jpeg',
        'https://c8.alamy.com/comp/D4WWFJ/rock-band-vintage-playing-live-on-stage-poland-D4WWFJ.jpg'
        ],
        musicStyles: ['Classical', 'Folk'],
        instrument: ['Violin'],
        languages: ['French', 'English'],
        location: 'Paris, France',
        links: [
        { platform: 'YouTube', url: 'https://youtube.com/user1' },
        { platform: 'Instagram', url: 'https://instagram.com/user1' }
        ]
    },
    {
        id: uuidv4(),
        nickname: 'ViolinVirtuoso',
        name: 'Albert Scofield',
        description: 'blablabla',
        profilePicture: 'https://randomuser.me/api/portraits/women/52.jpg',
        backgroundImage: 'https://img2-azrcdn.newser.com/image/1460855-17-20230305192226-remember-90s-band-live-things-took-nasty-turn.jpeg',
        photos: [
        'https://img2-azrcdn.newser.com/image/1460855-17-20230305192226-remember-90s-band-live-things-took-nasty-turn.jpeg',
        'https://c8.alamy.com/comp/D4WWFJ/rock-band-vintage-playing-live-on-stage-poland-D4WWFJ.jpg'
        ],
        musicStyles: ['Classical', 'Folk'],
        instrument: ['Violin'],
        languages: ['French', 'English'],
        location: 'Paris, France',
        links: [
        { platform: 'YouTube', url: 'https://youtube.com/user1' },
        { platform: 'Instagram', url: 'https://instagram.com/user1' }
        ]
    },{
        id: uuidv4(),
        nickname: 'ViolinVirtuoso',
        name: 'Albert Scofield',
        description: 'blablabla',
        profilePicture: 'https://randomuser.me/api/portraits/women/52.jpg',
        backgroundImage: 'https://img2-azrcdn.newser.com/image/1460855-17-20230305192226-remember-90s-band-live-things-took-nasty-turn.jpeg',
        photos: [
        'https://img2-azrcdn.newser.com/image/1460855-17-20230305192226-remember-90s-band-live-things-took-nasty-turn.jpeg',
        'https://c8.alamy.com/comp/D4WWFJ/rock-band-vintage-playing-live-on-stage-poland-D4WWFJ.jpg'
        ],
        musicStyles: ['Classical', 'Folk'],
        instrument: ['Violin'],
        languages: ['French', 'English'],
        location: 'Paris, France',
        links: [
        { platform: 'YouTube', url: 'https://youtube.com/user1' },
        { platform: 'Instagram', url: 'https://instagram.com/user1' }
        ]
    }
    ,{
        id: uuidv4(),
        nickname: 'ViolinVirtuoso',
        name: 'Albert Scofield',
        description: 'blablabla',
        profilePicture: 'https://randomuser.me/api/portraits/women/52.jpg',
        backgroundImage: 'https://img2-azrcdn.newser.com/image/1460855-17-20230305192226-remember-90s-band-live-things-took-nasty-turn.jpeg',
        photos: [
        'https://img2-azrcdn.newser.com/image/1460855-17-20230305192226-remember-90s-band-live-things-took-nasty-turn.jpeg',
        'https://c8.alamy.com/comp/D4WWFJ/rock-band-vintage-playing-live-on-stage-poland-D4WWFJ.jpg'
        ],
        musicStyles: ['Classical', 'Folk'],
        instrument: ['Violin'],
        languages: ['French', 'English'],
        location: 'Paris, France',
        links: [
        { platform: 'YouTube', url: 'https://youtube.com/user1' },
        { platform: 'Instagram', url: 'https://instagram.com/user1' }
        ]
    }
    ,{
        id: uuidv4(),
        nickname: 'ViolinVirtuoso',
        name: 'Albert Scofield',
        description: 'blablabla',
        profilePicture: 'https://randomuser.me/api/portraits/women/52.jpg',
        backgroundImage: 'https://img2-azrcdn.newser.com/image/1460855-17-20230305192226-remember-90s-band-live-things-took-nasty-turn.jpeg',
        photos: [
        'https://img2-azrcdn.newser.com/image/1460855-17-20230305192226-remember-90s-band-live-things-took-nasty-turn.jpeg',
        'https://c8.alamy.com/comp/D4WWFJ/rock-band-vintage-playing-live-on-stage-poland-D4WWFJ.jpg'
        ],
        musicStyles: ['Classical', 'Folk'],
        instrument: ['Violin'],
        languages: ['French', 'English'],
        location: 'Paris, France',
        links: [
        { platform: 'YouTube', url: 'https://youtube.com/user1' },
        { platform: 'Instagram', url: 'https://instagram.com/user1' }
        ]
    }
    ,{
        id: uuidv4(),
        nickname: 'ViolinVirtuoso',
        name: 'Albert Scofield',
        description: 'blablabla',
        profilePicture: 'https://randomuser.me/api/portraits/women/52.jpg',
        backgroundImage: 'https://img2-azrcdn.newser.com/image/1460855-17-20230305192226-remember-90s-band-live-things-took-nasty-turn.jpeg',
        photos: [
        'https://img2-azrcdn.newser.com/image/1460855-17-20230305192226-remember-90s-band-live-things-took-nasty-turn.jpeg',
        'https://c8.alamy.com/comp/D4WWFJ/rock-band-vintage-playing-live-on-stage-poland-D4WWFJ.jpg'
        ],
        musicStyles: ['Classical', 'Folk'],
        instrument: ['Violin'],
        languages: ['French', 'English'],
        location: 'Paris, France',
        links: [
        { platform: 'YouTube', url: 'https://youtube.com/user1' },
        { platform: 'Instagram', url: 'https://instagram.com/user1' }
        ]
    }
    ,{
        id: uuidv4(),
        nickname: 'ViolinVirtuoso',
        name: 'Albert Scofield',
        description: 'blablabla',
        profilePicture: 'https://randomuser.me/api/portraits/women/52.jpg',
        backgroundImage: 'https://img2-azrcdn.newser.com/image/1460855-17-20230305192226-remember-90s-band-live-things-took-nasty-turn.jpeg',
        photos: [
        'https://img2-azrcdn.newser.com/image/1460855-17-20230305192226-remember-90s-band-live-things-took-nasty-turn.jpeg',
        'https://c8.alamy.com/comp/D4WWFJ/rock-band-vintage-playing-live-on-stage-poland-D4WWFJ.jpg'
        ],
        musicStyles: ['Classical', 'Folk'],
        instrument: ['Violin'],
        languages: ['French', 'English'],
        location: 'Paris, France',
        links: [
        { platform: 'YouTube', url: 'https://youtube.com/user1' },
        { platform: 'Instagram', url: 'https://instagram.com/user1' }
        ]
    }
    ,{
        id: uuidv4(),
        nickname: 'ViolinVirtuoso',
        name: 'Albert Scofield',
        description: 'blablabla',
        profilePicture: 'https://randomuser.me/api/portraits/women/52.jpg',
        backgroundImage: 'https://img2-azrcdn.newser.com/image/1460855-17-20230305192226-remember-90s-band-live-things-took-nasty-turn.jpeg',
        photos: [
        'https://img2-azrcdn.newser.com/image/1460855-17-20230305192226-remember-90s-band-live-things-took-nasty-turn.jpeg',
        'https://c8.alamy.com/comp/D4WWFJ/rock-band-vintage-playing-live-on-stage-poland-D4WWFJ.jpg'
        ],
        musicStyles: ['Classical', 'Folk'],
        instrument: ['Violin'],
        languages: ['French', 'English'],
        location: 'Paris, France',
        links: [
        { platform: 'YouTube', url: 'https://youtube.com/user1' },
        { platform: 'Instagram', url: 'https://instagram.com/user1' }
        ]
    }
    ,{
        id: uuidv4(),
        nickname: 'ViolinVirtuoso',
        name: 'Albert Scofield',
        description: 'blablabla',
        profilePicture: 'https://randomuser.me/api/portraits/women/52.jpg',
        backgroundImage: 'https://img2-azrcdn.newser.com/image/1460855-17-20230305192226-remember-90s-band-live-things-took-nasty-turn.jpeg',
        photos: [
        'https://img2-azrcdn.newser.com/image/1460855-17-20230305192226-remember-90s-band-live-things-took-nasty-turn.jpeg',
        'https://c8.alamy.com/comp/D4WWFJ/rock-band-vintage-playing-live-on-stage-poland-D4WWFJ.jpg'
        ],
        musicStyles: ['Rock', 'Folk'],
        instrument: ['Violin'],
        languages: ['French', 'English'],
        location: 'Paris, France',
        links: [
        { platform: 'YouTube', url: 'https://youtube.com/user1' },
        { platform: 'Instagram', url: 'https://instagram.com/user1' }
        ]
    }
];

// Ruta para obtener todos los usuarios
router.get('/', (req, res) => {
  res.json(users);
});

// Ruta para obtener un usuario por ID
router.get('/:id', (req, res) => {
  const userId = req.params.id;
  const user = users.find(u => u.id === userId);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'Usuario no encontrado' });
  }
});

module.exports = { users, router };

