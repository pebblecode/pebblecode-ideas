var Idea = require('./../../lib/Idea');

module.exports = function(db, collection, clients) {

  return function(req, res, next) {

    console.log(req.body);

    var rawbody = req.body.Body;
    var submittedFrom = req.body.From;

    var re = /(\w.+)@?.(\w.+)/gi

    var matches = re.exec(rawbody);

    if (matches.length === 0) {
      console.log(matches);
      return false;
    }

    var newIdea = new Idea({
      submittedFrom: submittedFrom,
      submittedDisplay: matches.length === 3 ? matches[2] : false,
      text: matches[1]
    })

    collection.insert(newIdea, function(err, docs) {

      if (err) {
        // socket.send('error', err, function(data) {
        //   console.log('error ack', data)
        // });
        // return;
      }

      clients.forEach(function(socket) {
        socket.send('insert', docs, function(data) {
          console.log('insert ack', data);
        });  
      });
      
      res.set('Content-type', 'text/xml');
      res.send('<?xml version="1.0" encoding="UTF-8"?><Response><Message>Thank you for submitting your question to pebblecode</Message></Response>');
      res.end();
    });

  }
}