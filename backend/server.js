const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const usersRouter = require('./users/users').router;
const advertisementRouter = require('./advertisements/advertisements');
const mainUserRouter = require('./mainUser/mainUser').router;

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*", // Cambia "*" por la URL específica de tu frontend si está en un dominio separado
        methods: ["GET", "POST"]
    }
});

app.use(cors());
app.use(express.json());

// Configurar rutas de la API
app.use('/api/users', usersRouter);
app.use('/api/advertisements', advertisementRouter);
app.use('/api/mainUser', mainUserRouter);

// Almacenar los mensajes de los usuarios en memoria
const rooms = {}; // Objeto para almacenar los chats por sala

// Configuración de Socket.IO
io.on('connection', (socket) => {
    console.log('Un usuario se ha conectado');

    socket.on('joinRoom', (roomId) => {
        socket.join(roomId);
        console.log(`Usuario se ha unido a la sala: ${roomId}`);

        // Inicializar la sala si no existe
        if (!rooms[roomId]) {
            rooms[roomId] = [];
        }

        // Enviar los mensajes anteriores a los nuevos usuarios que se unen
        socket.emit('previousMessages', rooms[roomId]);
    });

    socket.on('sendMessage', (message) => {
        const { roomId, text } = message;
        const msg = { text, isSender: true }; // Mensaje que se va a enviar, marcando que es enviado por el usuario

        // Guardar el mensaje en la sala correspondiente
        rooms[roomId].push(msg);

        // Emitir el mensaje a todos los usuarios en la sala (excluyendo al que envió)
        socket.to(roomId).emit('message', { text, isSender: false });
    });

    socket.on('leaveRoom', (roomId) => {
        socket.leave(roomId);
        console.log(`Usuario ha salido de la sala: ${roomId}`);
    });

    socket.on('disconnect', () => {
        console.log('Un usuario se ha desconectado');
    });
});

// Iniciar el servidor en el puerto especificado
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
