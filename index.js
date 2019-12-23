const express = require('express');
const mongooseHandler = require('./Services/mongooseHandler');
const bodyParser = require('body-parser');
const path = require('path');

//mongoose setup
mongooseHandler.connect();

//express setup
const app = express();
const mangaRoute = require('./Routes/manga');
app.use(bodyParser.json());

//express routes
app.use('/api/manga', mangaRoute);

if (process.env.NODE_ENV === 'production') {
  console.log('Running in production!');
  app.use(express.static(path.join(__dirname, 'client', 'build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
} else {
  console.log('Running in Dev!');
  app.use('/', (req, res) => {
    res.send('ok....');
  });
}

const port = 5000;
app.listen(port, () => console.log(`Listen on port ${port}`));
