const express = require('express');
const { mangaHandler, chapterHandler } = require('../Services/mongooseHandler');

const router = express.Router();

router.get('/', async (req, res) => {
  const chapters = await chapterHandler.getMany({});
  res.status(200).send(chapters);
});

router.post('/', async (req, res) => {
  const chapter = await chapterHandler.add(req.body);
  res.status(200).send(chapter);
});

router.get('/:id', async (req, res) => {
  const chapters = await chapterHandler.getOne({ _id: req.params.id });
  res.status(200).send(chapters);
});

router.post('/:id', (req, res) => {
  res.status(403).send('cannot POST to this route');
});

router.put('/:id', async (req, res) => {
  console.log(req.body);
  const chapter = await chapterHandler.edit(req.params.id, req.body);
  res.status(200).send(chapter);
});

router.delete('/:id', async (req, res) => {
  const chapter = await chapterHandler.delete({ _id: req.params.id });
  res.status(200).send(chapter);
});

module.exports = router;
