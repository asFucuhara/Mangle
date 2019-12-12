const chokidar = require('chokidar');
const fs = require('fs');
const shelljs = require('shelljs');

const { toProcessFolder, minifiedFolder } = require('../config');
const mail = require('./mail');

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
    const file = path.substring(toProcessFolder.length + 1); //todo get file name{get everything afee last /}
    console.log(`Chiokidar: new file ${file}`);


    //see if file exist in minified folder
    fs.access(`${minifiedFolder}/${file}`, fs.constants.F_OK, err => {
      if (err) {
        //todo Bundle Chapters in Volume too
        const script = `gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.4  -dPDFSETTINGS=/ebook -dNOPAUSE -dQUIET -dBATCH -sOutputFile=${minifiedFolder}/${file} ${toProcessFolder}/${file}`;
        console.log('exec:', script);
        console.log(`minifying: ${file}`);
        shelljs.exec(script, code => {
          if (!code) {
            console.log(`Minified succeed: ${file}`);
            console.log(`Sending ${file} to Amazon Kindle`);

            //send Mail to amazon storage
            mail(`${minifiedFolder}/${file}`);
          }
        });
        đ;
      } else {
        console.log(`Already minified: ${file}`);
      }
    });
    //console.log(path, stats);
  });
