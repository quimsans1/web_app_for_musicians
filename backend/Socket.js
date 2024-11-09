const http = require("http");
const { Server } = require("socket.io");

const server = http.createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
    console.log("Usuari connectat");

    socket.on("missatge", (msg) => {
        io.emit("missatge", msg);
    });

    socket.on("disconnect", () => {
        console.log("Usuari desconnectat");
    });
});

server.listen(5000, () => console.log("Servidor en marxa"));
