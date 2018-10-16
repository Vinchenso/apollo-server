let mongoose = require('mongoose');
mongoose.Promise = global.Promise

const Schema = mongoose.Schema; 
let ResolutionsModel = new Schema({
  name: String
});

// Compile model from schema
module.exports =  mongoose.model('Resolutions', ResolutionsModel); 
