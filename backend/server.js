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

// Serve static files from "uploads" folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Start the server on the specified port
console.log('.ENV:', process.env.REACT_APP_PORT)
const PORT = process.env.REACT_APP_PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
