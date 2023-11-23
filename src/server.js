import http from 'http';
import app from './app.js';
// import { init as initSocket } from './socket.js'; // Cambia el nombre de la función a initSocket
import { init as initMongoDB } from './db/mongodb.js'; // Cambia el nombre de la función a initMongoDB

// Inicializa la conexión con MongoDB
await initMongoDB();

// Inicializa el servidor HTTP
const server = http.createServer(app);
const PORT = 8080;

server.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT}/`);
});

// // Inicializa el socket pasando el servidor HTTP
// initSocket(server);
