const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bundleSchema = new Schema({
  name: String,
  description: String,
  bundled: Array,
  path: String,
  dateBundled: Date,
  dateSentToKindle: Date,
});

mongoose.model('Bundle', bundleSchema);  
