require('dotenv').config();
const Server = require('./models/server');


const server = new Server();
server.listen();
//const port = process.env.PORT


