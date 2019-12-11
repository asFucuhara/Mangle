const mongoose = require('mongoose');
const Schema = mongoose.Schema;

require('./manga');

const volumeSchema = new Schema({
  chapter: Number,
  type: String,
  status: String,
  dateSentKindle: String,
  dateDownloaded: String,
  dateReleased: String,
  manga: { type: Schema.Types.ObjectId, ref: 'Manga' }
});

mongoose.model('Volume', volumeSchema);
