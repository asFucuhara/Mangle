const chokidar = require('chokidar');
const fs = require('fs');

const { toProcessFolder, minifiedFolder } = require('../config');
const mail = require('./mail');

//This service listen to new files on the toProcess Folder, minifiyng when necessarie and add a entry on the database

chokidar
  .watch(toProcessFolder, {
    awaitWriteFinish: true,
    ignored: /(^|[\/\\])\../
  })
  .on('add', (path, stats) => {
    if (path.indexOf(' ') !== -1 || path.indexOf("'") !== -1) {
      //change to process paths with white spaces
      //trim string and wait for another call of add on chokidar to execute
      fs.rename(`./${path}`, `./${path.replace(/ |\'/g, '')}`, err => {
        if (err) throw err;
        console.log('Rename complete!');
      });
      return;
    }

    //if trimmed execute the flow
    const file = path.substring(toProcessFolder.length + 1);
    console.log(`Chiokidar: new file ${file}`);

    //see if file exist in minified folder
    fs.access(`${minifiedFolder}/${file}`, fs.constants.F_OK, err => {
      if (err) {
      }
    });
  });
