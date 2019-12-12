const shelljs = require('shelljs');

const PDFManager = {
  bundler: async (arrayChaptersPath = [], outputPath) => {
    if (!outputPath) {
      console.log('Error output path not valid');
      return;
    }

    if (!arrayChaptersPath) {
      console.log('Error arrayChapterPath not valid');
      return;
    } else {
      if (typeof arrayChaptersPath === 'string') {
        //transform single entries into array to hnadle later
        arrayChaptersPath = [arrayChaptersPath];
      } else if (!Array.isArray(arrayChaptersPath)) {
        console.log('Error arrayChaptePath not valid');
        return;
      }
    }

    //generating string of paths to use in script

    const reducer = (acc, cur) => `${acc} ${cur}`;
    const inputString = arrayChaptersPath.reduce(reducer, '');

    const script = `gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.4  -dPDFSETTINGS=/ebook -dNOPAUSE -dQUIET -dBATCH -sOutputFile=${outputPath} ${inputString}`;
    //console.log(`minifying: ${file}`);

    shelljs.exec(script, errorCode => {
      if (!errorCode) {
        //console.log(`Minified succeed: ${file}`);
      } else {
        console.log('Error Bundling your PDF: ', errorCode);
      }
      return errorCode;
    });
  }
};

module.exports = PDFManager;
