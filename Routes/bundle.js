const express = require('express');
const {
  bundleHandler,
  chapterHandler
} = require('../Services/mongooseHandler');
const { bundler } = require('../Services/PDFManager');

const router = express.Router();

router.get('/', async (req, res) => {
  const bundles = await bundleHandler.getMany({});
  res.status(200).send(bundles);
});

router.post('/', async (req, res) => {
  const { bundled } = req.body || [];
  //get path for each entry in bundle
  const chaptersArray = await chapterHandler.getMany({ _id: bundled });
  const filePathArray = chaptersArray.map(x => x.title);
  console.log(filePathArray);
  
  //TODO: Add PDF handler for file path
  const bundle = await bundleHandler.add(req.body);
  res.status(200).send(bundle);
});

router.get('/:id', async (req, res) => {
  const bundle = await bundleHandler.getOne({ _id: req.params.id });
  res.status(200).send(bundle);
});

router.post('/:id', (req, res) => {
  res.status(403).send('cannot POST to this route');
});

router.put('/:id', async (req, res) => {
  const bundle = await bundleHandler.edit(req.params.id, req.body);
  res.status(200).send(bundle);
});

router.delete('/:id', async (req, res) => {
  const bundle = await bundleHandler.delete({ _id: req.params.id });
  res.status(200).send(bundle);
});

module.exports = router;
