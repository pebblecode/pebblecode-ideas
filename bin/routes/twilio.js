module.exports = function(db, collection, clients) {

  return function(req, res, next) {

    console.log(req.body);

    var body = req.body.Body;
    var from = req.body.From;

     var newIdea = {
      submittedBy: from,
      text: body,
      votesYes: 0,
      votesNo: 0
    };

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