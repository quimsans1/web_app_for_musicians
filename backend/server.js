const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const multer = require('multer'); // Import multer for file handling
const path = require('path'); // To handle file paths and extensions
const fs = require('fs'); // To interact with the filesystem
const usersRouter = require('./users/users').router;
const advertisementRouter = require('./advertisements/advertisements');
const mainUserRouter = require('./mainUser/mainUser').router;

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*", // Change "*" to your frontend URL if it's on a separate domain
        methods: ["GET", "POST"]
    }
});

// Multer configuration to store files in the "uploads" folder
const upload = multer({
    dest: 'uploads/', // Folder where files will be uploaded
    limits: { fileSize: 5 * 1024 * 1024 }, // Max file size: 5MB
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png/;
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = fileTypes.test(file.mimetype);
        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Invalid file type. Only JPEG, JPG, and PNG are allowed.'));
        }
    }
});

app.use(cors());
app.use(express.json());

// Increase the payload size limit for JSON requests
app.use(express.json({ limit: '10mb' })); // For JSON bodies
app.use(express.urlencoded({ limit: '10mb', extended: true })); // For URL-encoded forms

// API routes
app.use('/api/users', usersRouter);
app.use('/api/advertisements', advertisementRouter);
app.use('/api/mainUser', mainUserRouter);

// Endpoint to update the main user (including profile picture upload)
app.put('/api/mainUser', upload.single('profilePicture'), (req, res) => {
    try {
        // Read the existing user data (this should be replaced with your actual data storage)
        let updatedUser = req.body;

        // If a new profile picture file was uploaded, update the profile picture URL
        if (req.file) {
            const filePath = path.join(__dirname, 'uploads', req.file.filename);
            updatedUser.profilePicture = `/uploads/${req.file.filename}`; // You might want to store the full URL in the database
        }

        // Here you would save the updated user data to your database or storage
        // For now, let's log the updated user object
        console.log('Updated User:', updatedUser);

        // Example: Assuming you write to a file or database here
        // writeMainUser(updatedUser); // Replace with actual update logic

        // Send a success response
        res.status(200).json({ message: 'User updated successfully.', user: updatedUser });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Error updating user profile.' });
    }
});

// Serve static files from "uploads" folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// In-memory chat rooms object
const rooms = {}; // Store messages by room

// Socket.IO setup
io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('joinRoom', (roomId) => {
        socket.join(roomId);
        console.log(`User joined room: ${roomId}`);

        // Initialize the room if it doesn't exist
        if (!rooms[roomId]) {
            rooms[roomId] = [];
        }

        // Send previous messages to the new user
        socket.emit('previousMessages', rooms[roomId]);
    });

    socket.on('sendMessage', (message) => {
        const { roomId, text } = message;
        const msg = { text, isSender: true }; // Message sent by the user

        // Store the message in the room
        rooms[roomId].push(msg);

        // Emit the message to other users in the room
        socket.to(roomId).emit('message', { text, isSender: false });
    });

    socket.on('leaveRoom', (roomId) => {
        socket.leave(roomId);
        console.log(`User left room: ${roomId}`);
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

// Start the server on the specified port
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
