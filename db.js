let mongoose = require('mongoose');
require('dotenv').config({ path: 'keys.env' })

mongoose.connect(process.env.DATABASE_URL);
mongoose.Promise = global.Promise;

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.on('connecting', function(){
    console.log("trying to establish a connection to mongo");
});

db.on('connected', function() {
    console.log("connection established successfully");
});
