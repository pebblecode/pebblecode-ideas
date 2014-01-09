var MongoClient = require('mongodb').MongoClient;

module.exports = function(done) {
  
  var dev = 'mongodb://127.0.0.1:27017/test';
  var live = 'mongodb://heroku_app21097990:password@ds061278.mongolab.com:61278/heroku_app21097990';

  MongoClient.connect(live, function(err, db) {

    if(err) throw err;

    var collection = db.collection('pebble_ideas');

    done(db, collection);

  });
};