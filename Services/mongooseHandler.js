const mongoose = require('mongoose');

const { mongooseURL } = require('../config');

//Mongoose setup
mongoose.Promise = global.Promise;

require('../Models/manga');
require('../Models/chapter');
const mangaModel = mongoose.model('Manga');
const chapterModel = mongoose.model('Chapter');

//mangaAddQueue = {
//  'mangaTitle': [ promises,
//                  () => resolve()
//                ]
//  'anotherOne' : [promises]
//  'resolvedOne' : {Object with all property}
//}

const mangaAddQueue = {};

const connect = async () => {
  await mongoose.connect(mongooseURL).then(console.log('connected to db'));
};

const mangaHandler = {
  add: async inputObject => {
    //   title: 'teste1',
    //   cover: 'teste1',
    //   chaptersDownloaded: 123,
    //   chaptersSentToKindle: 1,
    //   chaptersReleased: 300
    const { title } = inputObject;

    const addFunction = async (resolve, reject) => {
      if (mangaAddQueue[title]) {
        //adding the resolve function for a reacuring entry while mongo does not finish creation querry
        mangaAddQueue[title].push(mangaObject => resolve(mangaObject));
      } else {
        //starting mangaAddQueue for specific manga
        mangaAddQueue[title] = [mangaObject => resolve(mangaObject)];
        //saving manga on db
        const manga = new mangaModel(inputObject);
        const newManga = await manga.save();
        //while waiting for mongo to finalize the creatino querry more entryes for the specific manga can ocuur
        //resolveing all promises of a manga
        mangaAddQueue[title].forEach((element) => element(newManga));

        //resolving promise of first entry that didn´t enter the list array
      }
    };
    const promise = new Promise(addFunction);

    return promise;
  },
  get: async inputObject => {
    const mangaObject = await mangaModel.findOne(inputObject);
    return mangaObject;
  }
};

const chapterHandler = {
  add: async inputObject => {
    //   chapter: 0,
    //   title: 'TEste1',
    //   status: '',
    //   dateSentKindle: null,
    //   dateDownloaded: null,
    //   dateReleased: null,
    //   manga: '5df8dffd5845d85c0c6d4788' || ref
    const mangaRef = mongoose.Types.ObjectId.isValid(inputObject.manga);
    if (!mangaRef) {
      //if manga is not a ref get ref from db
      let mangaObject = await mangaHandler.get({ title: inputObject.manga });
      debugger;
      if (mangaObject === null) {
        mangaObject = await mangaHandler.add({ title: inputObject.manga });
      }
      inputObject.manga = mangaObject.ObjectId;
    }
    const chapter = chapterModel(inputObject);
    return chapter.save();
  },
  extractInfo: filePath => {
    //extract information(chapter, volume, title) from files saved by hakuneko with chapter file format option
    //extract only the file name with extension(Ex: outterFolder\ChapterFileName.extension)
    debugger;
    const chapterFileName = filePath.replace(/^.*\//, '');

    //%M%-Vol.%VOL%Ch.%CH%-%T%
    //regex with named groups: /(?<manga>^[\w \d \s]*)-Vol.(?<Volume>[\d]*)Ch.(?<Chapter>[\d]*)-(?<Title>.*(?=\.)).(?<extension>\w)/g
    const regex = new RegExp(
      /(^[\w \d \s]*)-Vol.([\d]*)Ch.([\d]*)-(.*(?=\.)).(\w*)/,
      'gi'
    );
    const infoArray = regex.exec(chapterFileName);
    const infoObject = {
      manga: infoArray[1],
      volume: infoArray[2],
      chapter: infoArray[3],
      title: infoArray[4],
      extension: infoArray[5]
    };
    return infoObject;
  },
  extractInfoAndAdd: chapterFileName => {
    const extractedInfo = chapterHandler.extractInfo(chapterFileName);
    return chapterHandler.add(extractedInfo);
  }
};

module.exports = { connect, chapterHandler, mangaHandler };
