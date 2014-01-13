var Idea = require('./Idea');
var fs = require('fs');
var MongoClient = require('mongodb').MongoClient;



var dev = 'mongodb://127.0.0.1:27017/test';
var live = 'mongodb://heroku_app21097990:password@ds061278.mongolab.com:61278/heroku_app21097990';

MongoClient.connect(live, function(err, db) {

  if(err) throw err;

  var collection = db.collection('pebble_ideas');
  var ideas = [];

  fs.readFile('config/az-ideas.txt', 'utf8', function(err, data) {
    if (err) {
      throw err;
    }

    data = '' + data;
    console.log(data);

    data.split('\n').forEach(function(line) {
      var idea = new Idea({
        submittedFrom: 'Seed Data',
        submittedBy: 'AstraZeneca',
        text: line
      });

      ideas.push(idea);
    });

    collection.insert(ideas, function(err, docs) {
      if (err) {
        throw err;
      };

      console.log(docs.length + ' ideas added from seed data');
    });

  });

});