var Idea = require('./../../lib/Idea');

module.exports = function(db, collection, clients) {

  return function(req, res, next) {

    var rawbody = req.body.Body;
    var submittedFrom = req.body.From;

    var splitterTokenIndex = rawbody.indexOf('@');

    var text = '';
    var submittedDisplay = false;

    if (splitterTokenIndex === -1) {
      text = rawbody;
    } else {
      var text = rawbody.slice(0, splitterTokenIndex).trim();
      var submittedDisplay = rawbody.slice(splitterTokenIndex + 1, rawbody.length).trim();
    }

    var newIdea = new Idea({
      submittedFrom: submittedFrom,
      submittedDisplay: submittedDisplay,
      text: text
    });

    collection.insert(newIdea, function(err, docs) {

      if (err) {
        // socket.send('error', err, function(data) {
        //   console.log('error ack', data)
        // });
        // return;
      }

      clients.forEach(function(socket) {
        socket.send('insert', docs);  
      });
      
      res.set('Content-type', 'text/xml');
      res.send('<?xml version="1.0" encoding="UTF-8"?><Response><Message>Thank you for submitting your question to pebblecode</Message></Response>');
      res.end();
    });

  }
}