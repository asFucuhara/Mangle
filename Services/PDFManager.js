const shelljs = require('shelljs');

const PDFManager = {
  bundler: (arrayChaptersPath = [], outputPath) => {
    //todo change to cast error
    if (!outputPath) {
      console.log('Error output path not valid');
      return 1;
    }

    if (!arrayChaptersPath) {
      console.log('Error arrayChapterPath not valid');
      return 1;
    } else {
      if (typeof arrayChaptersPath === 'string') {
        //transform single entries into array for handling
        arrayChaptersPath = [arrayChaptersPath];
      } else if (!Array.isArray(arrayChaptersPath)) {
        console.log('Error arrayChaptePath not valid');
        return 1;
      }
    }

    //generating string of paths to use in script

    const reducer = (acc, cur) => `${acc} \"${cur}\"`;
    const inputString = arrayChaptersPath.reduce(reducer, '');
    const script = `gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.4  -dPDFSETTINGS=/ebook -dNOPAUSE -dQUIET -dBATCH -sOutputFile="${outputPath}" ${inputString}`;

    const promise = new Promise((resolve, reject) => {
      shelljs.exec(script, errorCode => {
        if (!errorCode) {
          //console.log(`Minified succeed: ${file}`);
          resolve(outputPath);
        } else {
          console.log('Error Bundling your PDF: ', errorCode);
          reject(errorCode);
        }
      });
    });

    return promise;
  }
};

module.exports = PDFManager;
