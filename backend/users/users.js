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
        'https://img2-azrcdn.newser.com/image/1460855-17-20230305192226-remember-90s-band-live-things-took-nasty-turn.jpeg',
        'https://c8.alamy.com/comp/D4WWFJ/rock-band-vintage-playing-live-on-stage-poland-D4WWFJ.jpg',
        'https://img2-azrcdn.newser.com/image/1460855-17-20230305192226-remember-90s-band-live-things-took-nasty-turn.jpeg',
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
        backgroundImage: 'https://sac.usal.es/wp-content/uploads/2018/04/usal_sac_musica_161218_big_band_04.jpg',
        photos: [
        'https://sac.usal.es/wp-content/uploads/2018/04/usal_sac_musica_161218_big_band_04.jpg',
        'https://enriquesimonpiano.com/wp-content/uploads/2024/05/La-Big-Band-Orquesta-Lincoln-Center.jpg'
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
        backgroundImage: 'https://grafiasmusic.com/wp-content/uploads/2024/05/38020.webp',
        photos: [
        'https://www.ifema.es/img/xl/grupo-rock-roll/grupo-rock-and-roll.jpeg',
        'https://grafiasmusic.com/wp-content/uploads/2024/05/38020.webp'
        ],
        musicStyles: ['Rock', 'Metal'],
        languages: ['French', 'English', 'Spanish'],
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
        description: 'I am a passionate violinist, dedicated to bringing music to life with heartfelt performances and a deep connection to every note I play, whether interpreting timeless classics or exploring modern compositions.',
        profilePicture: 'https://randomuser.me/api/portraits/women/51.jpg',
        backgroundImage: 'https://www.connollymusic.com/hs-fs/hubfs/What-Are-The-Benefits-Of-Playing-The-Violin-Blog.jpg?width=760&name=What-Are-The-Benefits-Of-Playing-The-Violin-Blog.jpg',
        photos: [
        'https://www.connollymusic.com/hs-fs/hubfs/What-Are-The-Benefits-Of-Playing-The-Violin-Blog.jpg?width=760&name=What-Are-The-Benefits-Of-Playing-The-Violin-Blog.jpg',
        'https://m.media-amazon.com/images/I/619MZsHqR4L.jpg'
        ],
        musicStyles: ['Classical', 'Folk'],
        languages: ['French', 'English', 'Arabic'],
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
        backgroundImage: 'https://i0.wp.com/breakthroughguitar.com/wp-content/uploads/2023/08/Is-guitar-hardest-1-2.png?ssl=1',
        photos: [
        'https://i0.wp.com/breakthroughguitar.com/wp-content/uploads/2023/08/Is-guitar-hardest-1-2.png?ssl=1',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTefae3m_CmsTnL36GrteCAFVNx6WYw8Kdm-Q&s'
        ],
        musicStyles: ['Blues', 'Rock'],
        languages: ['Russian', 'English', 'Portuguese'],
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
        description: 'I am a DJ and beat producer with a passion for hip-hop and EDM. Often collaborates with vocalists and rappers.',
        profilePicture: 'https://randomuser.me/api/portraits/men/53.jpg',
        backgroundImage: 'https://cdn.shopify.com/s/files/1/0465/5549/6598/files/The-Right-Home-Music.jpg?v=1623318672',
        photos: [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtoNELyhostMhSMFKMOJ2H_5RARbKL49I1ZQ&s',
        'https://cdn.shopify.com/s/files/1/0465/5549/6598/files/The-Right-Home-Music.jpg?v=1623318672'
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
        backgroundImage: 'https://c02.purpledshub.com/uploads/sites/43/2022/01/string-quartet-ensembles-ever-8af3ef3.jpg',
        photos: [
        'https://c02.purpledshub.com/uploads/sites/43/2022/01/string-quartet-ensembles-ever-8af3ef3.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/4/42/Fitzwilliam_Quartet.jpg'
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
        nickname: 'VideoLife',
        name: 'Mia Carter',
        description: 'I am a Photographer/Videographer, and I will help you make your music brand become a reality.',
        profilePicture: 'https://randomuser.me/api/portraits/women/54.jpg',
        backgroundImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbgnDMNgubwAvUxTbfm9KdfzZB1QXpJkuQnw&s',
        photos: [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbgnDMNgubwAvUxTbfm9KdfzZB1QXpJkuQnw&s',
        'https://www.avisualshop.es/wp-content/uploads/2022/07/set-de-rodaje.jpg'
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
        description: 'I am a bassist with a deep love for jazz and Latin rhythms. Known for his groovy, improvisational playing style.',
        profilePicture: 'https://randomuser.me/api/portraits/men/55.jpg',
        backgroundImage: 'https://cdn.britannica.com/97/237297-004-874869DA/Fender-P-Bass-electric-guitar.jpg',
        photos: [
        'https://www.native-instruments.com/typo3temp/pics/img-ce-seamless-crop-right-session-bassist-icon-bass-product-page-04-dcf8a8da9b28e3aeaa01f400e6a6bd9b-m@2x.jpg',
        'https://cdn.britannica.com/97/237297-004-874869DA/Fender-P-Bass-electric-guitar.jpg'
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
        backgroundImage: 'https://audioacademy.in/wp-content/uploads/2023/03/istockphoto-531462743-612x612-1.jpg',
        photos: [
        'https://audioacademy.in/wp-content/uploads/2023/03/istockphoto-531462743-612x612-1.jpg',
        'https://blog.reverbnation.com/wp-content/uploads/2019/09/live-sound-engineer-life-easier.jpg'
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
        backgroundImage: 'https://img.freepik.com/premium-photo/business-man-making-phone-call-with-smartphone-near-window_497171-535.jpg',
        photos: [
            'https://img.freepik.com/premium-photo/business-man-making-phone-call-with-smartphone-near-window_497171-535.jpg'
        ],
        musicStyles: [],
        languages: ['French', 'English', 'Chinese'],
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
        description: 'I am a jazz saxophonist with experience in soul, funk, and experimental music. Offers jam sessions through the app.',
        profilePicture: 'https://randomuser.me/api/portraits/men/58.jpg',
        backgroundImage: 'https://www.sanganxa.com/43544-medium_default/saxo-tenor-yamaha-yts-62ul-sin-laca.jpg',
        photos: [
        'https://cdn.openart.ai/published/jjbwAh53xkYm61vk4ysw/IistOMwJ_6ibX_1024.webp',
        'https://www.sanganxa.com/43544-medium_default/saxo-tenor-yamaha-yts-62ul-sin-laca.jpg'
        ],
        musicStyles: ['Funk', 'Jazz', 'Soul', 'Experimental'],
        languages: ['English', 'Danish', 'German'],
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
        description: 'I am a R&B and pop singer with a knack for vocal harmonies. Always looking for lyricists and producers to collaborate with.',
        profilePicture: 'https://randomuser.me/api/portraits/women/59.jpg',
        backgroundImage: 'https://www.thomann.de/blog/wp-content/uploads/2023/12/singerheader-770x425.jpg',
        photos: [
        'https://www.thomann.de/blog/wp-content/uploads/2023/12/singerheader-770x425.jpg',
        'https://www.dpamicrophones.com/media/ureetbkx/proper-hand-placement-on-a-vocal-mic-header.jpg?rxy=0.6132404181184669,0.48185328185328186&width=1140&height=624&v=1dad6847ec2be50&'
        ],
        musicStyles: ['R&B', 'Pop'],
        languages: ['Italian', 'English'],
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
        description: 'I am a multi-instrumentalist who plays violin and experiments with electronic loops. Focused on blending classical and modern genres.',
        profilePicture: 'https://randomuser.me/api/portraits/men/60.jpg',
        backgroundImage: 'https://i.pinimg.com/originals/4f/52/c0/4f52c0c165477024653993595ae1a801.jpg',
        photos: [
            'https://i.pinimg.com/originals/4f/52/c0/4f52c0c165477024653993595ae1a801.jpg'
        ],
        musicStyles: ['Classical', 'Folk'],
        languages: ['French', 'English', 'Italian'],
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
        backgroundImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/12in-Vinyl-LP-Record-Angle.jpg/800px-12in-Vinyl-LP-Record-Angle.jpg',
        photos: [
        'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/12in-Vinyl-LP-Record-Angle.jpg/800px-12in-Vinyl-LP-Record-Angle.jpg'
        ],
        musicStyles: ['Electronic'],
        languages: ['English', 'Dutch'],
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
        backgroundImage: 'https://diario.aw/images/Trio%20musical%20297%20STRINGS%20a%20haci%20nan%20debut/TRIO.jpg',
        photos: [
        'https://diario.aw/images/Trio%20musical%20297%20STRINGS%20a%20haci%20nan%20debut/TRIO.jpg'
        ],
        musicStyles: ['Funk', 'Soul', 'R&B'],
        languages: ['French', 'English', 'Dutch', 'German'],
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

