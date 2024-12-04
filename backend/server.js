const express = require('express');
const cors = require('cors');
const http = require('http');
const path = require('path');
const usersRouter = require('./users/users').router;
const advertisementRouter = require('./advertisements/advertisements');
const mainUserRouter = require('./mainUser/mainUser').router;
const favoritesRouter = require('./favorites/favorites').router;

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

// Increase the payload size limit for JSON requests
app.use(express.json({ limit: '10mb' })); // For JSON
app.use(express.urlencoded({ limit: '10mb', extended: true })); // For URL-encoded forms

// API routes
app.use('/api/users', usersRouter);
app.use('/api/advertisements', advertisementRouter);
app.use('/api/mainUser', mainUserRouter);
app.use('/api/favorites', favoritesRouter);

// Serve static files from "uploads" folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Start the server on the specified port
const PORT = process.env.REACT_APP_PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
