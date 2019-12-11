const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mangaSchema = new Schema({
    title: String,
    cover: String,
    chaptersDownloaded: Number,
    chaptersSentToKindle: Number,
    chaptersReleased: Number
});

mongoose.model('Manga', mangaSchema);