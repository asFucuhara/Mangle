const express = require('express');
const mongooseHandler = require('./Services/mongooseHandler');
const bodyParser = require('body-parser');
const path = require('path');

//mongoose setup
mongooseHandler.connect();

//express setup
const app = express();
app.use(bodyParser.json());

//express routes
//todo: test all routes
const mangaRoute = require('./Routes/manga');
const chapterRoute = require('./Routes/chapter');
app.use('/api/manga', mangaRoute);
app.use('/api/chapter', chapterRoute);

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
