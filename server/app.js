const express = require('express');
const cors = require('cors');

const { router } = require('./routes/numbers');

const PORT = 8888;

const app = express();

app.use(cors());

app.use( express.json() );

app.use( '/api', router );

const server = app.listen( PORT, () => console.log(`Server is running on port : ${PORT}`) );

const stop = () => {
    server.close();
}
  

module.exports = { app, stop };