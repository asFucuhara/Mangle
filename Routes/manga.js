const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).send([
    {
      id: '123',
      title: 'test1',
      status: '11/12',
      cover:
        'https://vignette.wikia.nocookie.net/futurediary/images/0/0e/Volume_1.png/revision/latest/scale-to-width-down/200?cb=20151019201802'
    },
    {
      id: '123',
      title: 'test12',
      status: '11/12',
      cover:
        'https://vignette.wikia.nocookie.net/futurediary/images/0/0e/Volume_1.png/revision/latest/scale-to-width-down/200?cb=20151019201802'
    },
    {
      id: '123',
      title: 'test3',
      status: '11/12',
      cover:
        'https://vignette.wikia.nocookie.net/futurediary/images/0/0e/Volume_1.png/revision/latest/scale-to-width-down/200?cb=20151019201802'
    },
    {
      id: '123',
      title: 'test3',
      status: '11/12',
      cover:
        'https://vignette.wikia.nocookie.net/futurediary/images/0/0e/Volume_1.png/revision/latest/scale-to-width-down/200?cb=20151019201802'
    },
    {
      id: '123',
      title: 'test3',
      status: '11/12',
      cover:
        'https://vignette.wikia.nocookie.net/futurediary/images/0/0e/Volume_1.png/revision/latest/scale-to-width-down/200?cb=20151019201802'
    },
    {
      id: '123',
      title: 'test3',
      status: '11/12',
      cover:
        'https://vignette.wikia.nocookie.net/futurediary/images/0/0e/Volume_1.png/revision/latest/scale-to-width-down/200?cb=20151019201802'
    },
    {
      id: '123',
      title: 'test3',
      status: '11/12',
      cover:
        'https://vignette.wikia.nocookie.net/futurediary/images/0/0e/Volume_1.png/revision/latest/scale-to-width-down/200?cb=20151019201802'
    },
    {
      id: '123',
      title: 'test3',
      status: '11/12',
      cover:
        'https://vignette.wikia.nocookie.net/futurediary/images/0/0e/Volume_1.png/revision/latest/scale-to-width-down/200?cb=20151019201802'
    },
    {
      id: '123',
      title: 'test3',
      status: '11/12',
      cover:
        'https://vignette.wikia.nocookie.net/futurediary/images/0/0e/Volume_1.png/revision/latest/scale-to-width-down/200?cb=20151019201802'
    },
    {
      id: '123',
      title: 'test3',
      status: '11/12',
      cover:
        'https://vignette.wikia.nocookie.net/futurediary/images/0/0e/Volume_1.png/revision/latest/scale-to-width-down/200?cb=20151019201802'
    },
    {
      id: '123',
      title: 'test3',
      status: '11/12',
      cover:
        'https://vignette.wikia.nocookie.net/futurediary/images/0/0e/Volume_1.png/revision/latest/scale-to-width-down/200?cb=20151019201802'
    },
    {
      id: '123',
      title: 'test3',
      status: '11/12',
      cover:
        'https://vignette.wikia.nocookie.net/futurediary/images/0/0e/Volume_1.png/revision/latest/scale-to-width-down/200?cb=20151019201802'
    },
    {
      id: '123',
      title: 'test3',
      status: '11/12',
      cover:
        'https://vignette.wikia.nocookie.net/futurediary/images/0/0e/Volume_1.png/revision/latest/scale-to-width-down/200?cb=20151019201802'
    },
    {
      id: '123',
      title: 'test3',
      status: '11/12',
      cover:
        'https://vignette.wikia.nocookie.net/futurediary/images/0/0e/Volume_1.png/revision/latest/scale-to-width-down/200?cb=20151019201802'
    },
    {
      id: '123',
      title: 'test3',
      status: '11/12',
      cover:
        'https://vignette.wikia.nocookie.net/futurediary/images/0/0e/Volume_1.png/revision/latest/scale-to-width-down/200?cb=20151019201802'
    },
    {
      id: '123',
      title: 'test3',
      status: '11/12',
      cover:
        'https://vignette.wikia.nocookie.net/futurediary/images/0/0e/Volume_1.png/revision/latest/scale-to-width-down/200?cb=20151019201802'
    },
    {
      id: '123',
      title: 'test3',
      status: '11/12',
      cover:
        'https://vignette.wikia.nocookie.net/futurediary/images/0/0e/Volume_1.png/revision/latest/scale-to-width-down/200?cb=20151019201802'
    },
    {
      id: '123',
      title: 'test3',
      status: '11/12',
      cover:
        'https://vignette.wikia.nocookie.net/futurediary/images/0/0e/Volume_1.png/revision/latest/scale-to-width-down/200?cb=20151019201802'
    }
  ]);
});

router.get('/:id', (req, res) => {
  res.status(200).send([
    {
      chapterNumber: 123,
      title: 'teste1titulo',
      dateSentKindle: '19/03/18',
      dateDownloaded: '19/03/18',
      dateReleased: '19/03/18'
    },
    {
      chapterNumber: 123,
      title: 'teste1titulo',
      dateSentKindle: '19/03/18',
      dateDownloaded: '19/03/18',
      dateReleased: '19/03/18'
    },
    {
      chapterNumber: 123,
      title: 'teste1titulo',
      dateSentKindle: '19/03/18',
      dateDownloaded: '19/03/18',
      dateReleased: '19/03/18'
    },
    {
      chapterNumber: 123,
      title: 'teste1titulo',
      dateSentKindle: '19/03/18',
      dateDownloaded: '19/03/18',
      dateReleased: '19/03/18'
    },
    {
      chapterNumber: 123,
      title: 'teste1titulo',
      dateSentKindle: '19/03/18',
      dateDownloaded: '19/03/18',
      dateReleased: '19/03/18'
    }
  ]);
});

module.exports = router;
