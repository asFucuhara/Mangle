const mongoose = require('mongoose');
const Schema = mongoose.Schema;

require('./manga');

const chapterSchema = new Schema({
  chapter: Number,
  title: String,
  status: String,
  dateSentKindle: String,
  dateDownloaded: String,
  dateReleased: String,
  manga: { type: Schema.Types.ObjectId, ref: 'Manga' }
});

mongoose.model('Chapter', chapterSchema);
