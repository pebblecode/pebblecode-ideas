var fs = require('fs');
var MongoClient = require('mongodb').MongoClient;

var live = 'mongodb://heroku_app21097990:password@ds061278.mongolab.com:61278/heroku_app21097990';

function arrayContains(arr, val, equals) {
    var i = arr.length;
    while (i--) {
        if ( equals(arr[i], val) ) {
            return true;
        }
    }
    return false;
}

function removeDuplicates(arr, equals) {
    var originalArr = arr.slice(0);
    var i, len, j, val;
    arr.length = 0;

    for (i = 0, len = originalArr.length; i < len; ++i) {
        val = originalArr[i];
        if (!arrayContains(arr, val, equals)) {
            arr.push(val);
        }
    }
}

function thingsEqual(thing1, thing2) {
    return thing1.name.toLowerCase() === thing2.name.toLowerCase()
        && thing1.number === thing2.number;
}

MongoClient.connect(live, function(err, db) {

  if(err) throw err;

  var collection = db.collection('pebble_ideas');
  var name_and_numbers = [];

  collection.find().toArray(function(err, docs) {
    docs.forEach(function(idea) {
      if (idea.submittedFrom.length > 3 && idea.submittedFrom !== 'Seed Data') {
        name_and_numbers.push({
          name: idea.submittedDisplay,
          number: idea.submittedFrom
        });
      }
    });
    
    removeDuplicates(name_and_numbers, thingsEqual);

    console.log(name_and_numbers);

    fs.writeFile('./name_and_numbers.json', JSON.stringify(name_and_numbers, null, 2), function(err) {
      if (err) {
        console.error(err);
        return;
      }
      console.log('File written')
    })
  });
});