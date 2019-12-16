const chokidar = require('chokidar');
const mongoose = require('mongoose');
const fs = require('fs');

const { toProcessFolder, minifiedFolder } = require('../config');
const { bundler } = require('./PDFManager');

//This service listen to new files on the toProcess Folder, minifiyng when necessarie and add a entry on the database

//Mongoose setup
require('../Models/manga');
require('../Models/volume');
mongoose.Promise = global.Promise;

const fileWatcher = async () => {
  try {
    //Connecting Database
    await mongoose.connect('mongodb://localhost:27017/Mangle-Dev');
    console.log('fileWatcher connected to db');

    //Adding listeners on files
    chokidar
      .watch(toProcessFolder, {
        awaitWriteFinish: true,
        ignored: /(^|[\/\\])\../
      })
      .on('add', (path, stats) => {
        //todo: get info for database
        const file = path.substring(toProcessFolder.length + 1);
        console.log(`Chiokidar: new file ${file}`);

        //see if file exist in minified folder
        fs.access(`${minifiedFolder}/${file}`, fs.constants.F_OK, async err => {
          if (err) {
            //file doesn´t exist
            //run minifier
            const exitCode = await bundler(
              `${toProcessFolder}/${file}`,
              `${minifiedFolder}/${file}`
            );
            console.log(exitCode);
            //Todo: mongoose witho okay from bundler
          } else {
            //file exists
            //does nothing
            console.log(`FileWatcher: alredy minified ${file}`);
          }
        });
      });
  } catch (Error) {
    console.log('erro: ', Error);
  }
};

//Runre
fileWatcher();
