const chokidar = require('chokidar');
const fs = require('fs');

const { toProcessFolder, minifiedFolder } = require('../config');
const { bundler } = require('./PDFManager');
const mongooseHandler = require('./mongooseHandler');
//This service listen to new files on the toProcess Folder, minifiyng when necessarie and add a entry on the database

const fileWatcher = (async () => {
  try {
    //Connecting Database
    await mongooseHandler.connect();
    console.log('fileWatcher connected to db');

    //Adding listeners on files
    chokidar
      .watch(toProcessFolder, {
        awaitWriteFinish: true,
        ignored: /(^|[\/\\])\../
      })
      .on('add', (path, stats) => {
        const file = path.substring(toProcessFolder.length + 1);

        if (path.indexOf('\"') !== -1 || path.indexOf('\'') !== -1) {
          //Removing all ' and " from file name, ghost script cannot handle quotes and double quotes
          //trim string and wait for another call of add on chokidar to execute
          fs.rename(`${toProcessFolder}/${file}`, `${toProcessFolder}/${file.replace(/\'|\"/g, '')}`, err => {
            if (err) throw err;
            console.log('Rename complete!');
          });
          return;
        }    

        const minifiedFile = file
          .replace(/^\w| \w|\"/g, x => x.toUpperCase()) //CamelCase
          .replace(/ |\'|\"/g, ''); //RemoveWhiteSpacesAndDoubleQuotes(")
        console.log(`Chiokidar: new file ${file}`);

        //see if file exist in minified folder
        fs.access(`${minifiedFolder}/${file}`, fs.constants.F_OK, async err => {
          if (err) {
            //file doesn´t exist
            //run minifier
            try {
              const exitCode = await bundler(
                `${toProcessFolder}/${file}`,
                `${minifiedFolder}/${minifiedFile}`
              );
              const chapter = await mongooseHandler.chapterHandler.extractInfoAndAdd(
                minifiedFile, `${minifiedFolder}/${minifiedFile}`
              );
              console.log('FileWatcher: added to db', chapter);
            } catch (error) {
              console.log(error);
            }
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
})();