const express = require('express');
const {
  mailHandler,
  chapterHandler,
  bundleHandler
} = require('../Services/mongooseHandler');
const mailer = require('../Services/mailer');

const router = express.Router();

router.get('/', async (req, res) => {
  const mails = await mailHandler.getMany({});
  res.status(200).send(mails);
});

router.post('/', async (req, res) => {
  //   {
  //     "to": "toTest",
  //     "attached": {
  //         "kind": "bundle",
  //         "_id": "5e70598a231fb8c4d4b696d0"
  //     }
  //   }
  const mail = req.body;
  const { attached } = mail;
  let path = '';
  switch (mail.attached.kind) {
    case 'bundle':
      path = await bundleHandler
        .getOne({ _id: attached._id })
        .then(x => x.path);
      break;
    case 'chapter':
      path = await chapterHandler
        .getOne({ _id: attached._id })
        .then(x => x.path);
      break;
    default:
      res.status(500).send('kind must be chapter or bundle');
  }

  //adding path to mail object
  mail.attached.path = path;

  //sending mail
  try {
    await mailer(path);
    const mailObject = await mailHandler.add(mail);
    res.status(200).send(mailObject);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get('/:id', async (req, res) => {
  const mails = await mailHandler.getOne({ _id: req.params.id });
  res.status(200).send(mails);
});

router.post('/:id', (req, res) => {
  res.status(403).send('cannot POST to this route');
});

router.put('/:id', async (req, res) => {
  console.log(req.body);
  const mail = await mailHandler.edit(req.params.id, req.body);
  res.status(200).send(mail);
});

router.delete('/:id', async (req, res) => {
  const mail = await mailHandler.delete({ _id: req.params.id });
  res.status(200).send(mail);
});

module.exports = router;
