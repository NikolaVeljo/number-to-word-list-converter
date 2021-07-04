const express = require('express');
const { router } = require('./routes/numbers');

const PORT = process.env.PORT || 8888;

const app = express();

app.use(express.json());

app.use('/api', router)

const server = app.listen(PORT, () => console.log(`Server is running on port : ${PORT}`));

const stop = () => {
    server.close();
}
  

module.exports = { app, stop}