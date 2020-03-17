const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mailSchema = new Schema({
  to: String,
  dateSent: Date,
  attached: {
    type: Object,
    kind: String,
    _id: mongoose.model._id,
    path: String
  }
});

mongoose.model('Mail', mailSchema);
