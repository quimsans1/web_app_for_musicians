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
        languages: ['English', 'Spanish'],
        location: 'New York, USA',
        links: [
            { platform: 'YouTube', url: 'https://youtube.com/user1' },
            { platform: 'Instagram', url: 'https://instagram.com/user1' },
            { platform: 'Unkown', url: 'https://es.wikipedia.org/wiki/Iron_Maiden' }
        ],
        userType: 'Musician',
        musicianInfo: {
            instruments: ['Guitar', 'Piano'],
        },
        groupInfo: {
            groupType: [''],
        },
        serviceInfo: {
            serviceType: [''],
        }
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
        languages: ['English'],
        location: 'Los Angeles, USA',
        links: [
            { platform: 'YouTube', url: 'https://youtube.com/user1' },
            { platform: 'Instagram', url: 'https://instagram.com/user1' }
        ],
        userType: 'Group',
        musicianInfo: {
            instruments: [''],
        },
        groupInfo: {
            groupType: ['Band'],
        },
        serviceInfo: {
            serviceType: [''],
        }
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
        languages: ['French', 'English'],
        location: 'Paris, France',
        links: [
            { platform: 'YouTube', url: 'https://youtube.com/user1' },
            { platform: 'Instagram', url: 'https://instagram.com/user1' }
        ],
        userType: 'Service',
        musicianInfo: {
            instruments: [''],
        },
        groupInfo: {
            groupType: [''],
        },
        serviceInfo: {
            serviceType: ['Music Production'],
        }
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
        languages: ['French', 'English'],
        location: 'Paris, France',
        links: [
            { platform: 'YouTube', url: 'https://youtube.com/user1' },
            { platform: 'Instagram', url: 'https://instagram.com/user1' }
        ],
        userType: 'Musician',
        musicianInfo: {
            instruments: ['Guitar', 'Piano'],
        },
        groupInfo: {
            groupType: [''],
        },
        serviceInfo: {
            serviceType: [''],
        }
    },
    {
        id: uuidv4(),
        nickname: 'Pepe',
        name: 'Albert Scofield',
        description: 'blablabla',
        profilePicture: 'https://randomuser.me/api/portraits/women/52.jpg',
        backgroundImage: 'https://img2-azrcdn.newser.com/image/1460855-17-20230305192226-remember-90s-band-live-things-took-nasty-turn.jpeg',
        photos: [
        'https://img2-azrcdn.newser.com/image/1460855-17-20230305192226-remember-90s-band-live-things-took-nasty-turn.jpeg',
        'https://c8.alamy.com/comp/D4WWFJ/rock-band-vintage-playing-live-on-stage-poland-D4WWFJ.jpg'
        ],
        musicStyles: ['Classical', 'Folk'],
        languages: ['French', 'English'],
        location: 'Paris, France',
        links: [
            { platform: 'YouTube', url: 'https://youtube.com/user1' },
            { platform: 'Instagram', url: 'https://instagram.com/user1' }
        ],
        userType: 'Musician',
        musicianInfo: {
            instruments: ['Guitar', 'Piano'],
        },
        groupInfo: {
            groupType: [''],
        },
        serviceInfo: {
            serviceType: [''],
        }
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
        languages: ['French', 'English'],
        location: 'Paris, France',
        links: [
            { platform: 'YouTube', url: 'https://youtube.com/user1' },
            { platform: 'Instagram', url: 'https://instagram.com/user1' }
        ],
        userType: 'Musician',
        musicianInfo: {
            instruments: ['Guitar', 'Piano'],
        },
        groupInfo: {
            groupType: [''],
        },
        serviceInfo: {
            serviceType: [''],
        }
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
        languages: ['French', 'English'],
        location: 'Paris, France',
        links: [
            { platform: 'YouTube', url: 'https://youtube.com/user1' },
            { platform: 'Instagram', url: 'https://instagram.com/user1' }
        ],
        userType: 'Musician',
        musicianInfo: {
            instruments: ['Guitar', 'Piano'],
        },
        groupInfo: {
            groupType: [''],
        },
        serviceInfo: {
            serviceType: [''],
        }
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
        languages: ['French', 'English'],
        location: 'Paris, France',
        links: [
            { platform: 'YouTube', url: 'https://youtube.com/user1' },
            { platform: 'Instagram', url: 'https://instagram.com/user1' }
        ],
        userType: 'Musician',
        musicianInfo: {
            instruments: ['Guitar', 'Piano'],
        },
        groupInfo: {
            groupType: [''],
        },
        serviceInfo: {
            serviceType: [''],
        }
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
        languages: ['French', 'English'],
        location: 'Paris, France',
        links: [
            { platform: 'YouTube', url: 'https://youtube.com/user1' },
            { platform: 'Instagram', url: 'https://instagram.com/user1' }
        ],
        userType: 'Musician',
        musicianInfo: {
            instruments: ['Guitar', 'Piano'],
        },
        groupInfo: {
            groupType: [''],
        },
        serviceInfo: {
            serviceType: [''],
        }
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
        languages: ['French', 'English'],
        location: 'Paris, France',
        links: [
            { platform: 'YouTube', url: 'https://youtube.com/user1' },
            { platform: 'Instagram', url: 'https://instagram.com/user1' }
        ],
        userType: 'Musician',
        musicianInfo: {
            instruments: ['Guitar', 'Piano'],
        },
        groupInfo: {
            groupType: [''],
        },
        serviceInfo: {
            serviceType: [''],
        }
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
        languages: ['French', 'English'],
        location: 'Paris, France',
        links: [
            { platform: 'YouTube', url: 'https://youtube.com/user1' },
            { platform: 'Instagram', url: 'https://instagram.com/user1' }
        ],
        userType: 'Musician',
        musicianInfo: {
            instruments: ['Guitar', 'Piano'],
        },
        groupInfo: {
            groupType: [''],
        },
        serviceInfo: {
            serviceType: [''],
        }
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
        languages: ['French', 'English'],
        location: 'Paris, France',
        links: [
            { platform: 'YouTube', url: 'https://youtube.com/user1' },
            { platform: 'Instagram', url: 'https://instagram.com/user1' }
        ],
        userType: 'Musician',
        musicianInfo: {
            instruments: ['Guitar', 'Piano'],
        },
        groupInfo: {
            groupType: [''],
        },
        serviceInfo: {
            serviceType: [''],
        }
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
        languages: ['French', 'English'],
        location: 'Paris, France',
        links: [
            { platform: 'YouTube', url: 'https://youtube.com/user1' },
            { platform: 'Instagram', url: 'https://instagram.com/user1' }
        ],
        userType: 'Musician',
        musicianInfo: {
            instruments: ['Guitar', 'Piano'],
        },
        groupInfo: {
            groupType: [''],
        },
        serviceInfo: {
            serviceType: [''],
        }
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
        languages: ['French', 'English'],
        location: 'Paris, France',
        links: [
            { platform: 'YouTube', url: 'https://youtube.com/user1' },
            { platform: 'Instagram', url: 'https://instagram.com/user1' }
        ],
        userType: 'Musician',
        musicianInfo: {
            instruments: ['Guitar', 'Piano'],
        },
        groupInfo: {
            groupType: [''],
        },
        serviceInfo: {
            serviceType: [''],
        }
    }
];

/*// Ruta para obtener todos los usuarios
router.get('/', (req, res) => {
  res.json(users);
});*/
// Ruta para obtener todos los usuarios, o filtrados por tipo (Musician, Group, Service), instrumento, tipo de grupo y tipo de servicio
router.get('/', (req, res) => {
    const { searchTerm, userType, instrument, groupType, serviceType, language, country, musicStyle } = req.query;

    let filteredUsers = users;

    // Filtering by userType, instrument, groupType, and serviceType
    if (userType) {
        filteredUsers = filteredUsers.filter(user => user.userType === userType);
    }
    if (instrument) {
        filteredUsers = filteredUsers.filter(user => 
            user.userType === 'Musician' && user.musicianInfo?.instruments?.includes(instrument)
        );
    }
    if (groupType) {
        filteredUsers = filteredUsers.filter(user => 
            user.userType === 'Group' && user.groupInfo?.groupType === groupType
        );
    }
    if (serviceType) {
        filteredUsers = filteredUsers.filter(user => 
            user.userType === 'Service' && user.serviceInfo?.serviceType === serviceType
        );
    }

    // Filtering by languages
    if (language) {
        filteredUsers = filteredUsers.filter(user => 
            user.languages && user.languages.includes(language)
        );
    }

    // Filtering by music styles
    if (musicStyle) {
        filteredUsers = filteredUsers.filter(user => 
            user.musicStyles && user.musicStyles.includes(musicStyle)
        );
    }

    // Filtering by country (checking if location contains the country name)
    if (country) {
        filteredUsers = filteredUsers.filter(user => 
            user.location && user.location.toLowerCase().includes(country.toLowerCase())
        );
    }

    // Search Term
    if (searchTerm) {
        filteredUsers = filteredUsers.filter(user => 
            user.nickname.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }

    // Respond with the filtered users
    res.json(filteredUsers);
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

