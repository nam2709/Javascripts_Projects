const http = require('http');
const { mongoConnect } = require('./services/mongo');

const app = require('./app');

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

async function startServer() {
    await mongoConnect();
    server.listen(PORT, () => {
        console.log({PORT});
    });
}

startServer();