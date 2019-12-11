const chokidar = require('chokidar');
const fs = require('fs');
const shelljs = require('shelljs');

const mail = require('./mail');

const folder = '/Users/asFucu/Documents/Projects/Node/EmailSender/Files';

chokidar
  .watch('./ToProcess/', { awaitWriteFinish: true, ignored: /(^|[\/\\])\../ })
  .on('add', (path, stats) => {
    if (path.indexOf(' ') !== -1 || path.indexOf('\'') !== -1 ) {
      //trim string and wait for another call of add on chokidar to execute
      fs.rename(`./${path}`, `./${path.replace(/ |\'/g, '')}`, err => {
        if (err) throw err;
        console.log('Rename complete!');
      });
      return;
    }

    //if trimmed execute the flow
    const file = path.substring(10);
    console.log(`Chiokidar: new file at ${path}`);

    //see if file exist in minified folder
    fs.access(`./Minified/${file}`, fs.constants.F_OK, err => {
      if (err) {
        const script = `gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.4  -dPDFSETTINGS=/ebook -dNOPAUSE -dQUIET -dBATCH -sOutputFile=${folder}/Minified/${file} ${folder}/ToProcess/${file}`;
        console.log('exec:', script);
        console.log(`minifying: ${path}`);
        shelljs.exec(script, code => {
          if (!code) {
            console.log(`Minified succeed: ${path}`);
            console.log(`Sending ${file} to Amazon Kindle`);
            
            //send Mail to amazon storage
            mail(`${folder}/Minified/${file}`)
          }
        });
      } else {
        console.log(`Already minified: ${path}`);
      }
    });
    //console.log(path, stats);
  });
