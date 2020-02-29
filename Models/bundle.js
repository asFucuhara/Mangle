const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bundleSchema = new Schema({
  name: String,
  bundled: Array,
  path: String,
  dateBundled: Date
});

mongoose.model('Bundle', bundleSchema);  
