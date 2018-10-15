let mongoose = require('mongoose');
require('dotenv').config({ path: 'keys.env' })

mongoose.connect('mongodb://chenso:chenso1@ds233323.mlab.com:33323/apollo_dev');

mongoose.Promise = global.Promise;

require('./models/resolutions.js')

var db = mongoose.connection;
console.log(db)

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
