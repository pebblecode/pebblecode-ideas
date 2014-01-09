var MongoClient = require('mongodb').MongoClient;

module.exports = function(done) {
  
  var dev = 'mongodb://127.0.0.1:27017/test';
  var live = '';

  MongoClient.connect(dev, function(err, db) {

    if(err) throw err;

    var collection = db.collection('pebble_ideas');

    done(db, collection);

  });
};