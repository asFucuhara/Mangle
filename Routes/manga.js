const express = require('express');
const { mangaHandler } = require('../Services/mongooseHandler');

const router = express.Router();

router.get('/', async (req, res) => {
  const mangas = await mangaHandler.getMany({});
  res.status(200).send(mangas);
});

router.post('/', async (req, res) => {
  const manga = await mangaHandler.add(req.body);
  res.status(200).send(manga);
});

router.get('/:id', async (req, res) => {
  const manga = await mangaHandler.getOne({ _id: req.params.id });
  res.status(200).send(manga);
});

router.post('/:id', (req, res) => {
  res.status(403).send('cannot POST to this route');
});

router.put('/:id', async (req, res) => {
  const manga = await mangaHandler.edit(req.params.id, req.body);
  res.status(200).send(manga);
});

router.delete('/:id', async (req, res) => {
  const manga = await mangaHandler.delete({ _id: req.params.id });
  res.status(200).send(manga);
});

module.exports = router;
