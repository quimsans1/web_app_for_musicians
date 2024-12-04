const express = require('express');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

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
        musicStyles: ['Rock', 'Metal'],
        languages: ['English', 'Spanish', 'Danish'],
        location: 'New York, USA',
        links: [
            { platform: 'YouTube', url: 'https://youtube.com/user1' },
            { platform: 'Instagram', url: 'https://instagram.com/user1' },
            { platform: 'Unkown', url: 'https://es.wikipedia.org/wiki/Iron_Maiden' }
        ],
        userType: 'Musician',
        musicianInfo: {
            instruments: ['Alto saxophone', 'Acoustic guitar', 'Drums', 'Bassoon'],
        },
        groupInfo: {
            groupType: [],
        },
        serviceInfo: {
            serviceType: [],
        }
    },
    {
        id: uuidv4(),
        nickname: 'DrumMaster',
        name: 'John Smith',
        description: 'We are a Big Band blending jazz, swing, and soulful rhythms to create unforgettable, high-energy performances.',
        profilePicture: 'https://randomuser.me/api/portraits/men/45.jpg',
        backgroundImage: 'https://media.vsstatic.com/image/upload/if_fc_gte_1/g_auto,q_auto,c_fill,w_1680,h_720/if_else/g_center,q_auto,c_fill,w_1680,h_720/if_end/dpr_auto,f_auto/hero/category/17-pop/pop-tickets-1.jpg',
        photos: [
        'https://img2-azrcdn.newser.com/image/1460855-17-20230305192226-remember-90s-band-live-things-took-nasty-turn.jpeg',
        'https://c8.alamy.com/comp/D4WWFJ/rock-band-vintage-playing-live-on-stage-poland-D4WWFJ.jpg'
        ],
        musicStyles: ['Jazz', 'Bossa Nova', 'Blues', 'Funk'],
        languages: ['English'],
        location: 'Los Angeles, USA',
        links: [
            { platform: 'YouTube', url: 'https://youtube.com/user1' },
            { platform: 'Instagram', url: 'https://instagram.com/user1' }
        ],
        userType: 'Group',
        musicianInfo: {
            instruments: [],
        },
        groupInfo: {
            groupType: ['Big Band'],
        },
        serviceInfo: {
            serviceType: [],
        }
    },
    {
        id: uuidv4(),
        nickname: 'WeRock',
        name: 'Andrea Marston',
        description: 'I am the lead guitarrist of a Rock Band. We go by the name We Rock!',
        profilePicture: 'https://randomuser.me/api/portraits/women/50.jpg',
        backgroundImage: 'https://img2-azrcdn.newser.com/image/1460855-17-20230305192226-remember-90s-band-live-things-took-nasty-turn.jpeg',
        photos: [
        'https://img2-azrcdn.newser.com/image/1460855-17-20230305192226-remember-90s-band-live-things-took-nasty-turn.jpeg',
        'https://c8.alamy.com/comp/D4WWFJ/rock-band-vintage-playing-live-on-stage-poland-D4WWFJ.jpg'
        ],
        musicStyles: ['Rock', 'Metal'],
        languages: ['French', 'English'],
        location: 'Paris, France',
        links: [
            { platform: 'YouTube', url: 'https://youtube.com/user1' },
            { platform: 'Instagram', url: 'https://instagram.com/user1' }
        ],
        userType: 'Group',
        musicianInfo: {
            instruments: [],
        },
        groupInfo: {
            groupType: ['Band'],
        },
        serviceInfo: {
            serviceType: [],
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
            groupType: [],
        },
        serviceInfo: {
            serviceType: [],
        }
    },
    {
        id: uuidv4(),
        nickname: 'GuitarGuru',
        name: 'Alex Ramirez',
        description: 'A 28-year-old session guitarist specializing in blues and rock. Known for his intricate solos and offering online guitar lessons through the app.',
        profilePicture: 'https://randomuser.me/api/portraits/men/52.jpg',
        backgroundImage: 'https://img2-azrcdn.newser.com/image/1460855-17-20230305192226-remember-90s-band-live-things-took-nasty-turn.jpeg',
        photos: [
        'https://img2-azrcdn.newser.com/image/1460855-17-20230305192226-remember-90s-band-live-things-took-nasty-turn.jpeg',
        'https://c8.alamy.com/comp/D4WWFJ/rock-band-vintage-playing-live-on-stage-poland-D4WWFJ.jpg'
        ],
        musicStyles: ['Blues', 'Rock'],
        languages: ['French', 'English'],
        location: 'Paris, France',
        links: [
            { platform: 'YouTube', url: 'https://youtube.com/user1' },
            { platform: 'Instagram', url: 'https://instagram.com/user1' }
        ],
        userType: 'Musician',
        musicianInfo: {
            instruments: ['Guitar'],
        },
        groupInfo: {
            groupType: [],
        },
        serviceInfo: {
            serviceType: [],
        }
    },
    {
        id: uuidv4(),
        nickname: 'BeatMasterJay',
        name: 'Jason Thompson',
        description: 'A 34-year-old DJ and beat producer with a passion for hip-hop and EDM. Often collaborates with vocalists and rappers.',
        profilePicture: 'https://randomuser.me/api/portraits/men/53.jpg',
        backgroundImage: 'https://img2-azrcdn.newser.com/image/1460855-17-20230305192226-remember-90s-band-live-things-took-nasty-turn.jpeg',
        photos: [
        'https://img2-azrcdn.newser.com/image/1460855-17-20230305192226-remember-90s-band-live-things-took-nasty-turn.jpeg',
        'https://c8.alamy.com/comp/D4WWFJ/rock-band-vintage-playing-live-on-stage-poland-D4WWFJ.jpg'
        ],
        musicStyles: ['Hip Hop', 'Electronic', 'Dubstep', 'House', 'Trance', 'Techno'],
        languages: ['French', 'English'],
        location: 'Paris, France',
        links: [
            { platform: 'YouTube', url: 'https://youtube.com/user1' },
            { platform: 'Instagram', url: 'https://instagram.com/user1' }
        ],
        userType: 'Service',
        musicianInfo: {
            instruments: [],
        },
        groupInfo: {
            groupType: [],
        },
        serviceInfo: {
            serviceType: ['Music Production', 'Music Composition'],
        }
    },
    {
        id: uuidv4(),
        nickname: 'BlueStrings',
        name: 'Jennifer Smith',
        description: "We are Blue Strings, a classical string quartet that performs everything from traditional compositions to modern cinematic scores. With a deep passion for precision and emotion, we work to bring timeless pieces to life, as well as collaborate on contemporary works. Our quartet has played at weddings, concerts, and recording sessions, and we are always seeking new opportunities to perform.",
        profilePicture: 'https://randomuser.me/api/portraits/men/12.jpg',
        backgroundImage: 'https://img2-azrcdn.newser.com/image/1460855-17-20230305192226-remember-90s-band-live-things-took-nasty-turn.jpeg',
        photos: [
        'https://img2-azrcdn.newser.com/image/1460855-17-20230305192226-remember-90s-band-live-things-took-nasty-turn.jpeg',
        'https://c8.alamy.com/comp/D4WWFJ/rock-band-vintage-playing-live-on-stage-poland-D4WWFJ.jpg'
        ],
        musicStyles: ['Classical', 'Baroque', 'Classical Crossover'],
        languages: ['French', 'English'],
        location: 'Los Angeles, USA',
        links: [
            { platform: 'YouTube', url: 'https://youtube.com/user1' },
            { platform: 'Instagram', url: 'https://instagram.com/user1' }
        ],
        userType: 'Group',
        musicianInfo: {
            instruments: [],
        },
        groupInfo: {
            groupType: ['Quartet'],
        },
        serviceInfo: {
            serviceType: [],
        }
    },
    {
        id: uuidv4(),
        nickname: 'DrummerDiva',
        name: 'Mia Carter',
        description: 'I am a Photographer/Videographer, and I will help you make your music brand become a reality.',
        profilePicture: 'https://randomuser.me/api/portraits/women/54.jpg',
        backgroundImage: 'https://img2-azrcdn.newser.com/image/1460855-17-20230305192226-remember-90s-band-live-things-took-nasty-turn.jpeg',
        photos: [
        'https://img2-azrcdn.newser.com/image/1460855-17-20230305192226-remember-90s-band-live-things-took-nasty-turn.jpeg',
        'https://c8.alamy.com/comp/D4WWFJ/rock-band-vintage-playing-live-on-stage-poland-D4WWFJ.jpg'
        ],
        musicStyles: [],
        languages: ['French', 'English'],
        location: 'Paris, France',
        links: [
            { platform: 'YouTube', url: 'https://youtube.com/user1' },
            { platform: 'Instagram', url: 'https://instagram.com/user1' }
        ],
        userType: 'Service',
        musicianInfo: {
            instruments: ['Guitar', 'Piano'],
        },
        groupInfo: {
            groupType: [],
        },
        serviceInfo: {
            serviceType: ['Music Video Production'],
        }
    },{
        id: uuidv4(),
        nickname: 'BassBoss',
        name: 'Marco Silva',
        description: 'A 30-year-old bassist with a deep love for jazz and Latin rhythms. Known for his groovy, improvisational playing style.',
        profilePicture: 'https://randomuser.me/api/portraits/men/55.jpg',
        backgroundImage: 'https://img2-azrcdn.newser.com/image/1460855-17-20230305192226-remember-90s-band-live-things-took-nasty-turn.jpeg',
        photos: [
        'https://img2-azrcdn.newser.com/image/1460855-17-20230305192226-remember-90s-band-live-things-took-nasty-turn.jpeg',
        'https://c8.alamy.com/comp/D4WWFJ/rock-band-vintage-playing-live-on-stage-poland-D4WWFJ.jpg'
        ],
        musicStyles: ['Funk', 'Jazz', 'Blues'],
        languages: ['French', 'English'],
        location: 'Paris, France',
        links: [
            { platform: 'YouTube', url: 'https://youtube.com/user1' },
            { platform: 'Instagram', url: 'https://instagram.com/user1' }
        ],
        userType: 'Musician',
        musicianInfo: {
            instruments: ['Bass'],
        },
        groupInfo: {
            groupType: [],
        },
        serviceInfo: {
            serviceType: [],
        }
    }
    ,{
        id: uuidv4(),
        nickname: 'SoundEnthusiast',
        name: 'Natalie Chang',
        description: "I'm a sound engineer who ensures your music sounds its best, whether in the studio or on stage. I have years of experience mixing live shows and handling post-production for recordings. Let's work together to create the perfect sound for your project or performance.",
        profilePicture: 'https://randomuser.me/api/portraits/women/56.jpg',
        backgroundImage: 'https://img2-azrcdn.newser.com/image/1460855-17-20230305192226-remember-90s-band-live-things-took-nasty-turn.jpeg',
        photos: [
        'https://img2-azrcdn.newser.com/image/1460855-17-20230305192226-remember-90s-band-live-things-took-nasty-turn.jpeg',
        'https://c8.alamy.com/comp/D4WWFJ/rock-band-vintage-playing-live-on-stage-poland-D4WWFJ.jpg'
        ],
        musicStyles: ['Experimental', 'Chillout', 'Techno'],
        languages: ['French', 'English'],
        location: 'Paris, France',
        links: [
            { platform: 'YouTube', url: 'https://youtube.com/user1' },
            { platform: 'Instagram', url: 'https://instagram.com/user1' }
        ],
        userType: 'Service',
        musicianInfo: {
            instruments: [],
        },
        groupInfo: {
            groupType: [],
        },
        serviceInfo: {
            serviceType: ['Live Sound', 'Sound Engineering', 'Audio Post-Production'],
        }
    }
    ,{
        id: uuidv4(),
        nickname: 'ManagerStar',
        name: "Michael Johnson",
        description: 'I provide artist management services, including career strategy, branding, and booking gigs. I work with emerging talents to establish a solid industry presence.',
        profilePicture: 'https://randomuser.me/api/portraits/men/57.jpg',
        backgroundImage: 'https://img2-azrcdn.newser.com/image/1460855-17-20230305192226-remember-90s-band-live-things-took-nasty-turn.jpeg',
        photos: [
        'https://img2-azrcdn.newser.com/image/1460855-17-20230305192226-remember-90s-band-live-things-took-nasty-turn.jpeg',
        'https://c8.alamy.com/comp/D4WWFJ/rock-band-vintage-playing-live-on-stage-poland-D4WWFJ.jpg'
        ],
        musicStyles: [],
        languages: ['French', 'English'],
        location: 'Paris, France',
        links: [
            { platform: 'YouTube', url: 'https://youtube.com/user1' },
            { platform: 'Instagram', url: 'https://instagram.com/user1' }
        ],
        userType: 'Service',
        musicianInfo: {
            instruments: [],
        },
        groupInfo: {
            groupType: [],
        },
        serviceInfo: {
            serviceType: ['Artist Management'],
        }
    }
    ,{
        id: uuidv4(),
        nickname: 'SaxSoul',
        name: 'Xavier Johnson',
        description: 'A 40-year-old jazz saxophonist with experience in soul, funk, and experimental music. Offers jam sessions through the app.',
        profilePicture: 'https://randomuser.me/api/portraits/men/58.jpg',
        backgroundImage: 'https://img2-azrcdn.newser.com/image/1460855-17-20230305192226-remember-90s-band-live-things-took-nasty-turn.jpeg',
        photos: [
        'https://img2-azrcdn.newser.com/image/1460855-17-20230305192226-remember-90s-band-live-things-took-nasty-turn.jpeg',
        'https://c8.alamy.com/comp/D4WWFJ/rock-band-vintage-playing-live-on-stage-poland-D4WWFJ.jpg'
        ],
        musicStyles: ['Funk', 'Jazz', 'Soul', 'Experimental'],
        languages: ['French', 'English'],
        location: 'Paris, France',
        links: [
            { platform: 'YouTube', url: 'https://youtube.com/user1' },
            { platform: 'Instagram', url: 'https://instagram.com/user1' }
        ],
        userType: 'Musician',
        musicianInfo: {
            instruments: ['Saxophone'],
        },
        groupInfo: {
            groupType: [],
        },
        serviceInfo: {
            serviceType: [],
        }
    }
    ,{
        id: uuidv4(),
        nickname: 'VocalVibes',
        name: 'Emily Rodriguez',
        description: 'A 27-year-old R&B and pop singer with a knack for vocal harmonies. Always looking for lyricists and producers to collaborate with.',
        profilePicture: 'https://randomuser.me/api/portraits/women/59.jpg',
        backgroundImage: 'https://img2-azrcdn.newser.com/image/1460855-17-20230305192226-remember-90s-band-live-things-took-nasty-turn.jpeg',
        photos: [
        'https://img2-azrcdn.newser.com/image/1460855-17-20230305192226-remember-90s-band-live-things-took-nasty-turn.jpeg',
        'https://c8.alamy.com/comp/D4WWFJ/rock-band-vintage-playing-live-on-stage-poland-D4WWFJ.jpg'
        ],
        musicStyles: ['R&B', 'Pop'],
        languages: ['French', 'English'],
        location: 'Paris, France',
        links: [
            { platform: 'YouTube', url: 'https://youtube.com/user1' },
            { platform: 'Instagram', url: 'https://instagram.com/user1' }
        ],
        userType: 'Musician',
        musicianInfo: {
            instruments: ['Singer'],
        },
        groupInfo: {
            groupType: [],
        },
        serviceInfo: {
            serviceType: [],
        }
    }
    ,{
        id: uuidv4(),
        nickname: 'FolkIsFun',
        name: 'Kevin Park',
        description: 'A 29-year-old multi-instrumentalist who plays violin and experiments with electronic loops. Focused on blending classical and modern genres.',
        profilePicture: 'https://randomuser.me/api/portraits/men/60.jpg',
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
            instruments: ['Violin'],
        },
        groupInfo: {
            groupType: [],
        },
        serviceInfo: {
            serviceType: [],
        }
    }
    ,{
        id: uuidv4(),
        nickname: 'ElectroRecords',
        name: 'Albert Scofield',
        description: 'I work for an electronic dance music record label, called Addicting Records, based in Los Angeles. We push your music to the next level!',
        profilePicture: 'https://randomuser.me/api/portraits/men/8.jpg',
        backgroundImage: 'https://img2-azrcdn.newser.com/image/1460855-17-20230305192226-remember-90s-band-live-things-took-nasty-turn.jpeg',
        photos: [
        'https://img2-azrcdn.newser.com/image/1460855-17-20230305192226-remember-90s-band-live-things-took-nasty-turn.jpeg',
        'https://c8.alamy.com/comp/D4WWFJ/rock-band-vintage-playing-live-on-stage-poland-D4WWFJ.jpg'
        ],
        musicStyles: ['Electronic'],
        languages: ['French', 'English'],
        location: 'Los Angeles, USA',
        links: [
            { platform: 'YouTube', url: 'https://youtube.com/user1' },
            { platform: 'Instagram', url: 'https://instagram.com/user1' }
        ],
        userType: 'Service',
        musicianInfo: {
            instruments: [],
        },
        groupInfo: {
            groupType: [],
        },
        serviceInfo: {
            serviceType: ['Record Label', 'Music Distribuition', 'Music Licencing'],
        }
    }
    ,{
        id: uuidv4(),
        nickname: 'MidnightGroove',
        name: 'Mike Travolta',
        description: "We're Midnight Groove, a funky soul trio that brings the heat with smooth grooves and contagious rhythms. We're all about creating a good time, whether it's in the studio or on stage. We love mixing traditional funk vibes with contemporary soul and we're always ready to lay down some serious bass, horns, and smooth vocals.",
        profilePicture: 'https://randomuser.me/api/portraits/men/16.jpg',
        backgroundImage: 'https://img2-azrcdn.newser.com/image/1460855-17-20230305192226-remember-90s-band-live-things-took-nasty-turn.jpeg',
        photos: [
        'https://img2-azrcdn.newser.com/image/1460855-17-20230305192226-remember-90s-band-live-things-took-nasty-turn.jpeg',
        'https://c8.alamy.com/comp/D4WWFJ/rock-band-vintage-playing-live-on-stage-poland-D4WWFJ.jpg'
        ],
        musicStyles: ['Funk', 'Soul', 'R&B'],
        languages: ['French', 'English'],
        location: 'Los Angeles, USA',
        links: [
            { platform: 'YouTube', url: 'https://youtube.com/user1' },
            { platform: 'Instagram', url: 'https://instagram.com/user1' }
        ],
        userType: 'Group',
        musicianInfo: {
            instruments: [],
        },
        groupInfo: {
            groupType: ['Trio'],
        },
        serviceInfo: {
            serviceType: [],
        }
    }
];


// Get All Users, or filtered by type (Musician, Group, Service)
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
            user.userType === 'Group' && user.groupInfo?.groupType.includes(groupType)
        );
    }
    if (serviceType) {
        filteredUsers = filteredUsers.filter(user => 
            user.userType === 'Service' && user.serviceInfo?.serviceType.includes(serviceType)
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

    res.json(filteredUsers);
});


// Get user by ID
router.get('/:id', (req, res) => {
  const userId = req.params.id;
  const user = users.find(u => u.id === userId);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

module.exports = { users, router };

